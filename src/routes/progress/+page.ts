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
import {
	calculateWeeksAheadBehind,
	prepareWeeksAheadBehindChartData
} from '$lib/utils/chartUtils/weeksAheadBehindUtils';
import { WEEKLY_WEIGHT_LOSS_TARGET } from '$lib/constant/progressConstants';
import { calculateGroupTotalWeightLoss } from '$lib/utils/chartUtils/groupTotalWeightLoss';

export const load: PageLoad = () => {
	const { dieters, weeklyChanges } = calculateWeeklyWeightChange(data);
	const weeklyChangesChartData = prepareWeeklyChangesChartData(dieters, weeklyChanges);

	const { weeklyChanges: weeklyPercentageChanges } = calculateWeeklyPercentageChange(data);
	const percentageChartData = prepareWeeklyPercentageChartData(dieters, weeklyPercentageChanges);

	const rankedData = calculateRankByPercentageLoss(weeklyPercentageChanges);
	const rankChartData = prepareRankChartData(rankedData);

	const weeksAheadBehindData = calculateWeeksAheadBehind(data, WEEKLY_WEIGHT_LOSS_TARGET); // Target: 0.5 kg/week
	const weeksAheadBehindChartData = prepareWeeksAheadBehindChartData(weeksAheadBehindData);

	const groupTotalWeightLoss = calculateGroupTotalWeightLoss(data);

	return {
		weeklyChangesChartData,
		percentageChartData,
		rankChartData,
		weeksAheadBehindChartData,
		groupTotalWeightLoss
	};
};
