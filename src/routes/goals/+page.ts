import { data } from '$lib/constant/mockData';
import { WEEKLY_WEIGHT_LOSS_TARGET } from '$lib/constant/progressConstants';
import { calculateGroupCumulativeProgress } from '$lib/utils/chartUtils/groupGoalsCumulativeProgress';
import { calculateCumulativeProgress } from '$lib/utils/chartUtils/individualGoalsCumulativeProgress';

export const load = () => {
	const individualCumulativeProgress = calculateCumulativeProgress(data, WEEKLY_WEIGHT_LOSS_TARGET);
	const groupCumulativeProgress = calculateGroupCumulativeProgress(data, WEEKLY_WEIGHT_LOSS_TARGET);

	return {
		individualCumulativeProgress,
		groupCumulativeProgress
	};
};
