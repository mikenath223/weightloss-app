import { fetchFormattedData } from '$lib/utils/firebase/fetchFormattedData';

export const load = async () => {
	const data = await fetchFormattedData();

	return {
		data
	};
};
