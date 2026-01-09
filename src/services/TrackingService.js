import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';

export const trackVisit = async () => {
    try {
        // 1. General Stats (Existing)
        const statsDocRef = doc(db, 'stats', 'general');
        const statsDoc = await getDoc(statsDocRef);

        if (!statsDoc.exists()) {
            await setDoc(statsDocRef, { visit_count: 1 });
        } else {
            await updateDoc(statsDocRef, {
                visit_count: increment(1)
            });
        }

        // 2. Daily Stats (New)
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const todayDocId = `${year}-${month}-${day}`;

        console.log("Tracking visit for:", todayDocId);

        const dailyDocRef = doc(db, 'daily_stats', todayDocId);
        const dailyDoc = await getDoc(dailyDocRef);

        if (!dailyDoc.exists()) {
            await setDoc(dailyDocRef, {
                date: todayDocId,
                visits: 1
            });
            console.log("Created new daily entry");
        } else {
            await updateDoc(dailyDocRef, {
                visits: increment(1)
            });
            console.log("Incremented daily entry");
        }

    } catch (error) {
        console.error("Error tracking visit:", error);
    }
};
