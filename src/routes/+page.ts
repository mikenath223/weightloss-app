import { data } from '$lib/constant/mockData';
import { calculateWeeklySummary } from '$lib/utils/chart/communityWeeklySummary';
import { getCurrentWeekInfo } from '$lib/utils/date';

export const load = () => {
	const weekInfo = getCurrentWeekInfo();
	const weeklySummary = calculateWeeklySummary(data, weekInfo.weekRange.split(' to ')[0]);

	return {
		weeklySummary,
		weekInfo
	};
};
