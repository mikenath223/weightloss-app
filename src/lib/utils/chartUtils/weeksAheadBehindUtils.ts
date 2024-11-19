import {
	DARK_GREEN,
	DARK_RED,
	GREEN,
	RED_TRANSLUCENT,
	WEEKLY_WEIGHT_LOSS_TARGET
} from '$lib/constant/progressConstants';

/**
 * Calculates the number of weeks each dieter is ahead or behind their weight loss target.
 *
 * This function computes the total weight loss for each dieter across all weeks
 * and compares it to their cumulative target loss. The result is expressed in terms
 * of weeks ahead or behind the target.
 *
 * @param data - A record where keys are week dates and values are objects
 * containing dieter names as keys and their weight data as values.
 * @param targetPerWeek - The target weight loss per week for each dieter.
 * @returns An array of objects where each object contains the dieter's name
 * and the number of weeks they are ahead or behind their target.
 */
export const calculateWeeksAheadBehind = (
	data: Record<string, Record<string, number | undefined>>,
	targetPerWeek: number
) => {
	const weeks = Object.keys(data);
	const numWeeks = weeks.length;

	const dieters = Object.keys(data[weeks[0]]);

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
				backgroundColor: weeksAheadBehindData.map((item) =>
					item.weeksAheadBehind >= 0 ? GREEN : RED_TRANSLUCENT
				),
				borderColor: weeksAheadBehindData.map((item) =>
					item.weeksAheadBehind >= 0 ? DARK_GREEN : DARK_RED
				),
				borderWidth: 1
			}
		]
	};
};

export const weeksAheadBehindChartOptions = {
	indexAxis: 'y', // Horizontal bars
	responsive: true,
	maintainAspectRatio: false,
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
