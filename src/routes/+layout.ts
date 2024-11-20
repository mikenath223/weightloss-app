import { fetchFormattedData } from '$lib/utils/firebase/fetchFormattedData';
import { loadMockData } from '$lib/utils/firebase/loadMockData';
import { get } from 'svelte/store';
import { shouldRunMockData } from '$lib/stores/runMockData';
import { isLoading } from '$lib/stores/isLoadingData';

export const load = async () => {
	isLoading.set(true);

	try {
		if (get(shouldRunMockData)) {
			await loadMockData();
		}
		const data = await fetchFormattedData();

		return {
			data,
			seo: {
				title: 'Weight Loss Tracker',
				description: 'Join the Weight Loss Tracker app and reach your fitness goals.',
				keywords: 'fitness, weight loss, tracking, community',
				author: 'Michgolden Ukeje',
				ogTitle: 'Weight Loss Tracker',
				ogDescription: 'Track and achieve your fitness goals with the community.'
			}
		};
	} finally {
		isLoading.set(false);
	}
};
