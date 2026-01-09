import { db } from '../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export const fetchAnalyticsData = async () => {
    try {
        // 1. Fetch Total Books
        const booksCol = collection(db, 'books');
        const booksSnapshot = await getDocs(booksCol);
        const totalBooks = booksSnapshot.size;

        // 2. Fetch Total Users
        const usersCol = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCol);
        const totalUsers = usersSnapshot.size;

        // 3. Fetch Visit Count
        const statsDocRef = doc(db, 'stats', 'general');
        const statsDoc = await getDoc(statsDocRef);
        const totalVisits = statsDoc.exists() ? statsDoc.data().visit_count || 0 : 0;

        // 4. Calculate Genre Distribution (Client-side aggregation)
        const genreCounts = {};
        booksSnapshot.docs.forEach(doc => {
            const book = doc.data();
            const genre = book.genre || book.category || 'Uncategorized'; // Adjust field name based on actual data
            genreCounts[genre] = (genreCounts[genre] || 0) + 1;
        });

        const genreData = Object.keys(genreCounts).map(genre => ({
            name: genre,
            value: genreCounts[genre]
        }));

        // 5. Generate Mock Traffic Data (Last 7 Days)
        // 5. Fetch Real Daily Traffic Data (Last 7 Days)
        const trafficData = [];
        const today = new Date();
        const daysToFetch = 7;

        for (let i = daysToFetch - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            // Format ID as YYYY-MM-DD to match storage (Local Time)
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const docId = `${year}-${month}-${day}`;

            console.log("Fetching stats for:", docId); // Debug log

            const dailyDocRef = doc(db, 'daily_stats', docId);

            // We fetch each day individually. For 7 days this is okay.
            // In a larger app, you'd query a range.
            try {
                const dailySnapshot = await getDoc(dailyDocRef);
                const visits = dailySnapshot.exists() ? dailySnapshot.data().visits : 0;

                trafficData.push({
                    name: dateStr,
                    visits: visits
                });
            } catch (err) {
                console.warn(`Could not fetch stats for ${docId}`, err);
                trafficData.push({ name: dateStr, visits: 0 });
            }
        }

        return {
            totalBooks,
            totalUsers,
            totalVisits,
            genreData,
            trafficData
        };
    } catch (error) {
        console.error("Error fetching analytics data:", error);
        return {
            totalBooks: 0,
            totalUsers: 0,
            totalVisits: 0,
            genreData: [],
            trafficData: []
        };
    }
};
