import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { data } from '$lib/constant/mockData';
import { db } from './config';

/**
 * Loads mock data from the $lib/constant/mockData constant into the
 * "weeklyData" collection in the Firestore database.
 *
 * This function is intended to be run as a script from the command line,
 * and will exit the process when complete.
 *
 * If the "weeklyData" collection already contains data, this function will
 * exit without doing anything.
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
