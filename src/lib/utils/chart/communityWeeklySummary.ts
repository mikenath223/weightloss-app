import { getUniqueDieters } from '../dieters';

/**
 * Calculates a weekly summary of weight loss progress for a group of dieters.
 *
 * Returns an object with the following properties:
 * - hasDataForCurrentWeek: A boolean indicating whether there is data for the
 *   current week.
 * - currentWeek: The current week.
 * - totalWeightLoss: The total weight loss for the group this week.
 * - topAchiever: An object containing the name and weight change of the top
 *   achiever this week.
 * - messages: An array of objects with name and message properties containing
 *   motivational messages for each dieter.
 *
 * @param data - A Record<string, Record<string, number | undefined>> containing
 *   weight data for each week and dieter.
 * @param currentWeek - The current week.
 * @returns An object with the weekly summary data.
 */
export const calculateWeeklySummary = (
	data: Record<string, Record<string, number | undefined>>,
	currentWeek: string
) => {
	const weeks = Object.keys(data);
	const hasDataForCurrentWeek = weeks.includes(currentWeek);
	const previousWeek = weeks[weeks.length - 2];

	// Return an empty summary if no data for the current week
	if (!hasDataForCurrentWeek) {
		return {
			hasDataForCurrentWeek,
			currentWeek,
			totalWeightLoss: 0,
			topAchiever: { name: '', weightChange: 0 },
			messages: []
		};
	}

	const dieters = getUniqueDieters(data);

	let totalWeightLoss = 0;
	let topAchiever = { name: '', weightChange: -Infinity };
	const messages: { name: string; message: string }[] = [];

	dieters.forEach((dieter) => {
		const currentWeight = data[currentWeek][dieter];
		const previousWeight = data[previousWeek]?.[dieter];

		if (currentWeight !== undefined && previousWeight !== undefined) {
			const weightChange = previousWeight - currentWeight;
			totalWeightLoss += weightChange;

			if (weightChange > topAchiever.weightChange) {
				topAchiever = { name: dieter, weightChange };
			}

			if (weightChange > 0.5) {
				messages.push({
					name: dieter,
					message: `Amazing work this week, ${dieter}! You lost ${weightChange.toFixed(
						2
					)} kg. Keep smashing those goals! 🎉`
				});
			} else if (weightChange > 0) {
				messages.push({
					name: dieter,
					message: `Great effort, ${dieter}! You lost ${weightChange.toFixed(
						2
					)} kg. You’re moving in the right direction. Keep it up! 💪`
				});
			} else if (weightChange < 0) {
				messages.push({
					name: dieter,
					message: `Don’t give up, ${dieter}! Although you gained ${Math.abs(weightChange).toFixed(
						2
					)} kg but every week is a fresh start, and we’re rooting for you! 🌟`
				});
			} else {
				messages.push({
					name: dieter,
					message: `Don’t give up, ${dieter}! Every week is a fresh start, and we’re rooting for you! 🌟`
				});
			}
		}
	});

	return {
		hasDataForCurrentWeek,
		currentWeek,
		totalWeightLoss,
		topAchiever,
		messages
	};
};
