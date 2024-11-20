/**
 * Calculates the total weight loss for the group for each week.
 *
 * @param data - Record where keys are week dates and values are objects with dieter names as keys and weight data as values.
 * @returns An array of objects with week dates and the total weight loss for the group for that week.
 */
export const calculateGroupTotalWeightLoss = (
	data: Record<string, Record<string, number | undefined>>
) => {
	const weeks = Object.keys(data);
	const groupTotals: { week: string; totalLoss: number }[] = [];

	for (let i = 1; i < weeks.length; i++) {
		const currentWeek = data[weeks[i]];
		const previousWeek = data[weeks[i - 1]];

		let totalLoss = 0;

		Object.keys(currentWeek).forEach((dieter) => {
			const currentWeight = currentWeek[dieter];
			const previousWeight = previousWeek[dieter];

			if (currentWeight !== undefined && previousWeight !== undefined) {
				totalLoss += previousWeight - currentWeight;
			}
		});

		groupTotals.push({ week: weeks[i], totalLoss });
	}

	return groupTotals;
};
