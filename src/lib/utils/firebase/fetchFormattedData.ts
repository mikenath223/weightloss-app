import { db } from './config';
import { collection, getDocs } from 'firebase/firestore';

/**
 * Fetches weight data from Firebase and returns it in a formatted Record.
 *
 * @returns A Record where keys are week dates and values are objects with dieter names as keys and weight data as values.
 * The weight data will be `undefined` if the dieter is not in the document for a given week.
 * @throws Error - If there is an error fetching data from Firebase.
 */
export const fetchFormattedData = async (): Promise<
	Record<string, Record<string, number | undefined>>
> => {
	const formattedData: Record<string, Record<string, number | undefined>> = {};

	try {
		const querySnapshot = await getDocs(collection(db, 'weights'));
		querySnapshot.forEach((doc) => {
			const data = doc.data() as Record<string, number>;
			const weekData: Record<string, number | undefined> = {};

			// Include all dieters, defaulting to undefined if they are not in the document
			const dieters = Object.keys(data);
			dieters.forEach((dieter) => {
				weekData[dieter] = data[dieter] ?? undefined;
			});

			formattedData[doc.id] = weekData;
		});
	} catch (error) {
		console.error('Error fetching data from Firebase:', error);
		throw error;
	}

	return formattedData;
};
