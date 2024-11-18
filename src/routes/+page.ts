import { data } from '$lib/constant/mockData';
import { calculateWeeklySummary } from '$lib/utils/chartUtils/communityWeeklySummary';
import { getCurrentWeekInfo } from '$lib/utils/dateUtils';

export const load = () => {
	const weeklySummary = calculateWeeklySummary(data);
	let weekInfo = getCurrentWeekInfo();

	return {
		weeklySummary,
		weekInfo
	};
};
