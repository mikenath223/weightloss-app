import { data } from '$lib/constant/mockData';
import { calculateWeeklySummary } from '$lib/utils/chartUtils/communityWeeklySummary';
import { getCurrentWeekInfo } from '$lib/utils/dateUtils';

export const load = () => {
	const weekInfo = getCurrentWeekInfo(); // Get current week range
	const weeklySummary = calculateWeeklySummary(data, weekInfo.weekRange); // Check for data

	return {
		weeklySummary,
		weekInfo
	};
};
