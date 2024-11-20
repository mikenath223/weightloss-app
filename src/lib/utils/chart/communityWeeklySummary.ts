import { getUniqueDieters } from '../dieters';

/**
 * Validates if the current week has data and if there is data from previous weeks.
 * If no data is present for the current week, returns a summary object with the
 * corresponding flags and default values for the other properties.
 *
 * @param data A record where keys are week dates and values are objects
 * containing dieter names as keys and weight data as values.
 * @param currentWeekStartDate The start date of the current week.
 * @param weeks The list of all weeks.
 * @returns A summary object with flags and default values if no data is present
 * for the current week, or null if data is present.
 */
const validateCurrentWeekData = (
	data: Record<string, Record<string, number | undefined>>,
	currentWeekStartDate: string,
	weeks: string[]
) => {
	const hasDataForCurrentWeek = !!data[currentWeekStartDate];
	const hasPreviousData = weeks.some((week) => week !== currentWeekStartDate && data[week]);

	if (!hasDataForCurrentWeek) {
		return {
			hasDataForCurrentWeek,
			currentWeek: currentWeekStartDate,
			hasNoUserWithPreviousData: false,
			hasPreviousData,
			totalWeightLoss: 0,
			topAchiever: { name: '', weightChange: 0 },
			messages: []
		};
	}

	return null;
};

/**
 * Format the date for consistent comparison with data keys.
 */
const formatDate = (date: Date): string => {
	return date
		.toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		})
		.split(' ')
		.join('-');
};

/**
 * Calculate the start date of the previous week.
 */
const calculatePreviousWeekStartDate = (currentWeekStartDate: string): string => {
	const previousWeekDate = new Date(currentWeekStartDate);
	previousWeekDate.setDate(previousWeekDate.getDate() - 7);
	return formatDate(previousWeekDate);
};

/**
 * Process weight changes and generate messages for a dieter.
 */
const processDieterProgress = (
	dieter: string,
	currentWeight: number | undefined,
	previousWeight: number | undefined
): { weightChange: number | null; message: string } => {
	if (currentWeight === undefined || previousWeight === undefined) {
		return { weightChange: null, message: `No data available for ${dieter} this week.` };
	}

	const weightChange = previousWeight - currentWeight;
	let message = '';

	if (weightChange > 0.5) {
		message = `Amazing work this week, ${dieter}! You lost ${weightChange.toFixed(
			2
		)} kg. Keep smashing those goals! 🎉`;
	} else if (weightChange > 0) {
		message = `Great effort, ${dieter}! You lost ${weightChange.toFixed(
			2
		)} kg. You’re moving in the right direction. Keep it up! 💪`;
	} else if (weightChange < 0) {
		message = `Don’t give up, ${dieter}! Although you gained ${Math.abs(weightChange).toFixed(
			2
		)} kg, every week is a fresh start, and we’re rooting for you! 🌟`;
	} else {
		message = `Don’t give up, ${dieter}! Every week is a fresh start, and we’re rooting for you! 🌟`;
	}

	return { weightChange, message };
};

/**
 * Calculates a summary of weight changes for the current week.
 *
 * This function processes each dieter's progress by comparing their current
 * week's weight with the previous week's weight. It generates motivational
 * messages based on the weight change and identifies the top achiever.
 *
 * @param data - A record where keys are week dates and values are objects
 * containing dieter names as keys and their weight data as values.
 * @param currentWeekStartDate - The start date of the current week.
 * @returns An object containing summary data for the current week:
 * - hasDataForCurrentWeek: A boolean indicating if there is data for the current week.
 * - currentWeek: The start date of the current week.
 * - hasNoUserWithPreviousData: A boolean indicating if there are users with no previous data.
 * - hasPreviousData: A boolean indicating if there are previous weeks with data.
 * - totalWeightLoss: The total weight loss for all dieters.
 * - topAchiever: An object containing the name and weight change of the top achiever.
 * - messages: An array of motivational messages for each dieter.
 */
export const calculateWeeklySummary = (
	data: Record<string, Record<string, number | undefined>>,
	currentWeekStartDate: string
) => {
	const weeks = Object.keys(data);

	const validation = validateCurrentWeekData(data, currentWeekStartDate, weeks);
	if (validation) return validation;

	const previousWeekStartDate = calculatePreviousWeekStartDate(currentWeekStartDate);
	const dieters = getUniqueDieters(data);

	let totalWeightLoss = 0;
	let topAchiever = { name: '', weightChange: -Infinity };
	let hasNoUserWithPreviousData = true;
	const messages: { name: string; message: string }[] = [];

	dieters.forEach((dieter) => {
		const currentWeight = data[currentWeekStartDate][dieter];
		const previousWeight = data[previousWeekStartDate]?.[dieter];
		const { weightChange, message } = processDieterProgress(dieter, currentWeight, previousWeight);

		if (weightChange !== null) {
			totalWeightLoss += weightChange;
			if (weightChange > topAchiever.weightChange) {
				topAchiever = { name: dieter, weightChange };
			}
			hasNoUserWithPreviousData = false;
		}

		messages.push({ name: dieter, message });
	});

	return {
		hasDataForCurrentWeek: true,
		currentWeek: currentWeekStartDate,
		hasNoUserWithPreviousData,
		hasPreviousData: weeks.some((week) => week !== currentWeekStartDate && data[week]),
		totalWeightLoss,
		topAchiever,
		messages
	};
};
