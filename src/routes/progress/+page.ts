import { data } from '$lib/constant/mockData';
import type { PageLoad } from './$types';
import {
	calculateWeeklyWeightChange,
	prepareWeeklyChangesChartData
} from '$lib/utils/chartUtils/weeklyWeightChangesUtils';
import {
	calculateWeeklyPercentageChange,
	prepareWeeklyPercentageChartData
} from '$lib/utils/chartUtils/percentageWeightChangesUtils';
import {
	calculateRankByPercentageLoss,
	prepareRankChartData
} from '$lib/utils/chartUtils/rankPercentageLoss';

export const load: PageLoad = () => {
	const { dieters, weeklyChanges } = calculateWeeklyWeightChange(data);
	const weeklyChangesChartData = prepareWeeklyChangesChartData(dieters, weeklyChanges);

	const { weeklyChanges: weeklyPercentageChanges } = calculateWeeklyPercentageChange(data);
	const percentageChartData = prepareWeeklyPercentageChartData(dieters, weeklyPercentageChanges);

	const rankedData = calculateRankByPercentageLoss(weeklyPercentageChanges);
	const rankChartData = prepareRankChartData(rankedData);

	return {
		weeklyChangesChartData,
		percentageChartData,
		rankChartData
	};
};
