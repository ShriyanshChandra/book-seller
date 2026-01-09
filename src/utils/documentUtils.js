import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Use CDN for worker to avoid create-react-app webpack 5 configuration issues with pdfjs-dist
// Ensure the version matches the installed version
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export const extractTextFromPdf = async (file) => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let pItems = [];

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();

            // Map items to { str, x }
            const items = textContent.items.map(item => ({
                str: item.str,
                x: item.transform[4] // x-coordinate
            }));

            if (items.length === 0) continue;

            // Find min x to normalize indentation
            const minX = Math.min(...items.map(it => it.x));

            // Process items into lines with indentation
            items.forEach(item => {
                if (!item.str.trim()) return; // Skip empty/whitespace items

                // Calculate indentation level (approx every 25 units is a tab/level)
                // We clamp it to reasonable max to avoid crazy indents
                const indentLevel = Math.max(0, Math.floor((item.x - minX) / 25));
                pItems.push({
                    text: item.str,
                    indent: indentLevel
                });
            });
        }

        // Post-processing: Merge orphan bullets
        const mergedLines = [];
        const isBullet = (str) => {
            const s = str.trim();
            // Expanded bullet definitions based on user inputs
            return ['●', '•', 'o', '*', '-', '·'].includes(s) || (s.length < 2 && /[^a-zA-Z0-9]/.test(s));
        };

        for (let i = 0; i < pItems.length; i++) {
            const current = pItems[i];

            // If it's a bullet and not the last item
            if (isBullet(current.text) && i + 1 < pItems.length) {
                const next = pItems[i + 1];

                // Check if they are likely on the same visual line? 
                // For now, assume if it's a bullet, the very next non-empty structure is its content.
                mergedLines.push({
                    text: `${current.text.trim()} ${next.text.trim()}`,
                    indent: current.indent // Keep bullet's indentation
                });
                i++; // Skip the next item since we merged it
            } else {
                mergedLines.push(current);
            }
        }

        // Convert to HTML with ReactQuill classes
        const html = mergedLines.map(line => {
            const indentClass = line.indent > 0 ? ` class="ql-indent-${line.indent}"` : '';
            return `<p${indentClass}>${line.text}</p>`;
        }).join('');

        return html;

    } catch (error) {
        console.error('Error parsing PDF:', error);
        throw new Error('Failed to extract text from PDF');
    }
};

export const extractTextFromDocx = async (file) => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        return result.value; // Returns HTML which is great for the rich text editor
    } catch (error) {
        console.error('Error parsing DOCX:', error);
        throw new Error('Failed to extract text from DOCX');
    }
};

export const extractTextFromFile = async (file) => {
    const fileType = file.type;
    if (fileType === 'application/pdf') {
        return await extractTextFromPdf(file);
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        return await extractTextFromDocx(file);
    } else {
        throw new Error('Unsupported file type. Please upload PDF or DOCX.');
    }
};

export const formatToTopics = (text) => {
    // If it's HTML (from mammoth), return as is
    if (/<[a-z][\s\S]*>/i.test(text)) return text;

    const rawLines = text.split('\n').filter(line => line.trim().length > 0);
    const mergedLines = [];
    let pendingBullet = null;

    // definition of a standalone bullet line
    const isBullet = (str) => {
        const s = str.trim();
        // Check for common bullet chars or single non-alphanumeric chars (excluding digits)
        // Also strictly check 'o' as user uses it for bullets
        return ['●', '•', 'o', '*', '-', '·'].includes(s) || (s.length < 2 && /[^a-zA-Z0-9]/.test(s));
    };

    rawLines.forEach((line) => {
        const isLineBullet = isBullet(line);

        if (isLineBullet) {
            // It's a bullet, save it for the next line
            pendingBullet = line.trim();
        } else {
            // It's text
            if (pendingBullet) {
                mergedLines.push(`${pendingBullet} ${line.trim()}`);
                pendingBullet = null;
            } else {
                mergedLines.push(line);
            }
        }
    });

    // Valid HTML paragraph per line
    return mergedLines.map(line => `<p>${line}</p>`).join('');
};
