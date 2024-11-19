import { data } from '$lib/constant/mockData';
import type { PageLoad } from './$types';
import { calculateWeeklyWeightChange } from '$lib/utils/chart/weeklyWeightChangesUtils';
import { calculateWeeklyPercentageChange } from '$lib/utils/chart/percentageWeightChangesUtils';
import {
	calculateRankByPercentageLoss,
	prepareRankChartData
} from '$lib/utils/chart/rankPercentageLoss';
import {
	calculateWeeksAheadBehind,
	prepareWeeksAheadBehindChartData
} from '$lib/utils/chart/weeksAheadBehindUtils';
import { WEEKLY_WEIGHT_LOSS_TARGET } from '$lib/constant/progressConstants';
import { calculateGroupTotalWeightLoss } from '$lib/utils/chart/groupTotalWeightLoss';

export const load: PageLoad = () => {
	const { weeklyChanges, weeks } = calculateWeeklyWeightChange(data);
	const dieters = Object.keys(data[weeks[0]]);
	const weeklyChangesData = { weeklyChanges, weeks, dieters };

	const { weeklyChanges: weeklyPercentageChanges } = calculateWeeklyPercentageChange(data);
	const percentageChangesData = { weeklyPercentageChanges, weeks, dieters };

	const rankedData = calculateRankByPercentageLoss(weeklyPercentageChanges);
	const rankChartData = prepareRankChartData(rankedData);

	const weeksAheadBehindData = calculateWeeksAheadBehind(data, WEEKLY_WEIGHT_LOSS_TARGET); // Target: 0.5 kg/week
	const weeksAheadBehindChartData = prepareWeeksAheadBehindChartData(weeksAheadBehindData);

	const groupTotalWeightLoss = calculateGroupTotalWeightLoss(data);

	return {
		weeklyChangesData,
		percentageChangesData,
		rankChartData,
		weeksAheadBehindChartData,
		groupTotalWeightLoss
	};
};
