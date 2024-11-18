export const calculateWeeklySummary = (
	data: Record<string, Record<string, number | undefined>>
) => {
	const weeks = Object.keys(data);
	const currentWeek = weeks[weeks.length - 1];
	const previousWeek = weeks[weeks.length - 2];

	const dieters = Object.keys(data[currentWeek]);

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
					message: `Great effort, ${dieter}! You’re moving in the right direction. Keep it up! 💪`
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
		currentWeek,
		totalWeightLoss,
		topAchiever,
		messages
	};
};
