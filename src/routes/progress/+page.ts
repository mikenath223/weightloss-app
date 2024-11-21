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
import { getUniqueDieters } from '$lib/utils/dieters';

export const load: PageLoad = async ({ parent }) => {
	const { data } = await parent();

	const { weeklyChanges, weeks } = calculateWeeklyWeightChange(data);
	const dieters = getUniqueDieters(data);
	const weeklyChangesData = { weeklyChanges, weeks, dieters };

	const { weeklyChanges: weeklyPercentageChanges } = calculateWeeklyPercentageChange(data);
	const percentageChangesData = { weeklyPercentageChanges, weeks, dieters };

	const rankedData = calculateRankByPercentageLoss(weeklyPercentageChanges, dieters);
	const rankChartData = prepareRankChartData(rankedData);

	const weeksAheadBehindData = calculateWeeksAheadBehind(data, WEEKLY_WEIGHT_LOSS_TARGET);
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
