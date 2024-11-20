import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { data } from '$lib/constant/mockData';
import { db } from './config';

/**
 * Loads mock data into the Firebase Firestore.
 *
 * @remarks
 * The `loadMockData` function loads the mock data defined in `mockData.ts` into the Firebase Firestore.
 * If the "weeklyData" collection already contains data, it will not overwrite it.
 * If there is an error while loading the mock data, it will log an error message.
 */
export const loadMockData = async () => {
	try {
		const weeklyDataCollection = collection(db, 'weeklyData');
		const snapshot = await getDocs(weeklyDataCollection);

		if (!snapshot.empty) {
			console.log('The "weeklyData" collection already contains data. Exiting...');
			return;
		}

		for (const [week, dieters] of Object.entries(data)) {
			const docRef = doc(db, 'weeklyData', week);
			const sanitizedData = Object.fromEntries(
				Object.entries(dieters).map(([key, value]) => [key, value ?? null])
			);
			await setDoc(docRef, sanitizedData);
			console.log(`Loaded data for ${week}`);
		}
		console.log('Mock data successfully loaded!');
	} catch (error) {
		console.error('Error loading mock data:', error);
	}
};
