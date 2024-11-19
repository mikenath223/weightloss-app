import { invalidate } from '$app/navigation';
import { getCurrentWeekInfo } from '../date';
import { db } from './config';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

/**
 * Adds a new weight entry for a given dieter to the database.
 *
 * @param {string} name - The name of the dieter.
 * @param {number} weight - The weight of the dieter in the current week.
 *
 * @throws Error - If there is an error adding data to the database.
 */
export const addDataToFirebase = async (name: string, weight?: number) => {
	try {
		const weekStartDate = getCurrentWeekInfo().weekRange.split(' to ')[0];

		const docRef = doc(db, 'weights', weekStartDate);
		const docSnapshot = await getDoc(docRef);

		if (docSnapshot.exists()) {
			await updateDoc(docRef, {
				[name]: weight
			});
		} else {
			await setDoc(docRef, {
				[name]: weight
			});
		}
	} catch (error) {
		console.error('Error adding data to Firebase:', error);
		throw error;
	}
};

/**
 * Handles the submission of a weight entry for a given dieter by adding it to the database
 * and reloading the root layout to update the data.
 *
 * @param {string} name - The name of the dieter.
 * @param {number | undefined} weight - The weight of the dieter in the current week. If undefined, the entry is removed.
 *
 * @throws Error - If there is an error adding data to the database or reloading the root layout.
 */
export const handleSubmit = async (name: string, weight?: number) => {
	try {
		await addDataToFirebase(name, weight);

		// Reload the root layout to update data
		await invalidate('layout');
	} catch (error) {
		console.error('Error submitting data:', error);
	}
};
