export const calculateGroupTotalWeightLoss = (
	data: Record<string, Record<string, number | undefined>>
) => {
	const weeks = Object.keys(data); // All weeks
	const groupTotals: { week: string; totalLoss: number }[] = [];

	for (let i = 1; i < weeks.length; i++) {
		const currentWeek = data[weeks[i]];
		const previousWeek = data[weeks[i - 1]];

		let totalLoss = 0;

		Object.keys(currentWeek).forEach((dieter) => {
			const currentWeight = currentWeek[dieter];
			const previousWeight = previousWeek[dieter];

			if (currentWeight !== undefined && previousWeight !== undefined) {
				totalLoss += previousWeight - currentWeight; // Accumulate weight loss
			}
		});

		groupTotals.push({ week: weeks[i], totalLoss });
	}

	return groupTotals;
};
