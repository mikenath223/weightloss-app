import { invalidate, invalidateAll } from '$app/navigation';
import { shouldRunMockData } from '$lib/stores/runMockData';
import { getToastStore, type ToastStore } from '@skeletonlabs/skeleton';
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
export const addDataToFirebase = async (name: string, toastStore: ToastStore, weight?: number) => {
	try {
		const weekStartDate = getCurrentWeekInfo().weekRange.split(' to ')[0];

		const docRef = doc(db, 'weeklyData', weekStartDate);
		const docSnapshot = await getDoc(docRef);

		if (docSnapshot.exists()) {
			await updateDoc(docRef, {
				[name]: weight ?? null
			});
		} else {
			await setDoc(docRef, {
				[name]: weight ?? null
			});
		}
		toastStore.trigger({
			message: 'Successfully added a new dieter weight',
			background: 'variant-filled-success'
		});
	} catch (error) {
		toastStore.trigger({
			message: 'Error adding data to Firebase',
			background: 'variant-filled-error'
		});
		console.error('Error adding data to Firebase:', error);
		throw error;
	}
};

/**
 * Submits a new weight entry for a given dieter to the database.
 *
 * @param {string} name - The name of the dieter.
 * @param {number} [weight] - The weight of the dieter in the current week.
 *
 * @throws Error - If there is an error submitting data to the database.
 */
export const handleSubmit = async (name: string, toastStore: ToastStore, weight?: number) => {
	try {
		await addDataToFirebase(name, toastStore, weight);

		shouldRunMockData.set(false);
		await invalidate('/');
		await invalidateAll();
		shouldRunMockData.set(true);
	} catch (error) {
		console.error('Error submitting data:', error);
	}
};
