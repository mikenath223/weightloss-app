import { WEEKLY_WEIGHT_LOSS_TARGET } from '$lib/constant/progressConstants';

export const calculateWeeksAheadBehind = (
	data: Record<string, Record<string, number | undefined>>,
	targetPerWeek: number
) => {
	const weeks = Object.keys(data); // All weeks
	const numWeeks = weeks.length;

	const dieters = Object.keys(data[weeks[0]]); // Dieters' names

	// Aggregate total weight loss for each dieter
	const results = dieters.map((dieter) => {
		let totalWeightLost = 0;

		weeks.forEach((week, index) => {
			if (index === 0) return; // Skip Week 1
			const currentWeight = data[weeks[index]][dieter];
			const previousWeight = data[weeks[index - 1]][dieter];

			if (currentWeight !== undefined && previousWeight !== undefined) {
				totalWeightLost += previousWeight - currentWeight; // Accumulate weight lost
			}
		});

		// Calculate weeks ahead/behind
		const weeksAheadBehind = totalWeightLost / targetPerWeek - numWeeks;

		return { name: dieter, weeksAheadBehind: weeksAheadBehind || 0 }; // Default to 0 if no data
	});

	return results;
};

export const prepareWeeksAheadBehindChartData = (
	weeksAheadBehindData: { name: string; weeksAheadBehind: number }[]
) => {
	return {
		labels: weeksAheadBehindData.map((item) => item.name), // Dieters' names
		datasets: [
			{
				label: 'Weeks Ahead/Behind',
				data: weeksAheadBehindData.map((item) => item.weeksAheadBehind), // Weeks ahead/behind
				backgroundColor: weeksAheadBehindData.map(
					(item) =>
						item.weeksAheadBehind >= 0
							? 'rgba(75, 192, 75, 0.6)' // Green for ahead
							: 'rgba(192, 75, 75, 0.6)' // Red for behind
				),
				borderColor: weeksAheadBehindData.map(
					(item) =>
						item.weeksAheadBehind >= 0
							? 'rgba(75, 192, 75, 1)' // Dark green for ahead
							: 'rgba(192, 75, 75, 1)' // Dark red for behind
				),
				borderWidth: 1
			}
		]
	};
};

export const weeksAheadBehindChartOptions = {
	indexAxis: 'y', // Horizontal bars
	responsive: true,
	plugins: {
		legend: {
			display: false // No legend needed
		},
		title: {
			display: true,
			text: `Weeks Ahead or Behind Target of ${WEEKLY_WEIGHT_LOSS_TARGET} kg/week`
		},
		tooltip: {
			callbacks: {
				label: (tooltipItem: { raw: number }) =>
					`${tooltipItem.raw > 0 ? '+' : ''}${tooltipItem.raw.toFixed(2)} weeks` // Format tooltip
			}
		}
	},
	scales: {
		x: {
			beginAtZero: true,
			title: {
				display: true,
				text: 'Weeks Ahead/Behind'
			}
		},
		y: {
			title: {
				display: true,
				text: 'Dieters'
			}
		}
	}
};
