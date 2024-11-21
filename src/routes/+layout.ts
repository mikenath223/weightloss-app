import { fetchFormattedData } from '$lib/utils/firebase/fetchFormattedData';
import { loadMockData } from '$lib/utils/firebase/loadMockData';
import { get } from 'svelte/store';
import { shouldRunMockData } from '$lib/stores/runMockData';

export const load = async () => {
	let isLoading = true;

	if (get(shouldRunMockData)) {
		await loadMockData();
	}

	const data = await fetchFormattedData();
	isLoading = false;

	return {
		data,
		isLoading
	};
};
