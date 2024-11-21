import { db } from './config';
import { collection, getDocs } from 'firebase/firestore';

/**
 * Fetches weight data from Firebase and returns it in a formatted Record.
 * Sorted by date (earliest first and latest last).
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
		const querySnapshot = await getDocs(collection(db, 'weeklyData'));
		querySnapshot.forEach((doc) => {
			const data = doc.data() as Record<string, number>;
			const weekData: Record<string, number | undefined> = {};

			const dieters = Object.keys(data);
			dieters.forEach((dieter) => {
				weekData[dieter] = data[dieter] ?? undefined;
			});

			formattedData[doc.id] = weekData;
		});

		const sortedEntries = Object.entries(formattedData).sort(([dateA], [dateB]) => {
			return new Date(dateA).getTime() - new Date(dateB).getTime();
		});
		const updatedEntries = sortedEntries.reduce((acc, [date, data]) => {
			(acc as Record<string, any>)[date] = data;
			return acc;
		}, {});

		return updatedEntries;
	} catch (error) {
		console.error('Error fetching data from Firebase:', error);
		throw error;
	}
};
