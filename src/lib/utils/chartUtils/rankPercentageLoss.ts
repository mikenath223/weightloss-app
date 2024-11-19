/**
 * Calculates the rank of dieters by their total percentage weight loss.
 *
 * @param percentageChanges - An array of objects with dieter names as keys and percentage weight loss as values, for each week.
 * @returns An array of objects with dieter names and total percentage weight loss, sorted by total percentage weight loss in descending order.
 */
export const calculateRankByPercentageLoss = (
	percentageChanges: Record<string, number | undefined>[]
) => {
	const aggregated = Object.keys(percentageChanges[0]) // Get dieters' names
		.map((dieter) => {
			const totalPercentageLoss = percentageChanges.reduce((sum, week) => {
				return sum + (week[dieter] ?? 0); // Sum up all percentage changes
			}, 0);

			return { name: dieter, totalPercentageLoss };
		});

	// Sort by totalPercentageLoss (descending)
	const sorted = aggregated.sort((a, b) => b.totalPercentageLoss - a.totalPercentageLoss);

	return sorted;
};

/**
 * Prepares chart data for the rank of dieters by their total percentage weight loss.
 *
 * @param rankedData - An array of objects with dieter names and total percentage weight loss, sorted by total percentage weight loss in descending order.
 * @returns A chart data object with the following properties:
 * - labels: An array of dieters' names.
 * - datasets: An array with a single dataset:
 *   - label: 'Percentage Loss'.
 *   - data: An array of total percentage weight loss values.
 *   - backgroundColor: An array of gradient colors.
 *   - borderColor: A string representing the border color.
 *   - borderWidth: The border width.
 */
export const prepareRankChartData = (
	rankedData: { name: string; totalPercentageLoss: number }[]
) => {
	return {
		labels: rankedData.map((item) => item.name), // Dieters' names
		datasets: [
			{
				label: 'Percentage Loss',
				data: rankedData.map((item) => item.totalPercentageLoss), // Loss values
				backgroundColor: rankedData.map(
					(_, index) => `hsl(${(index / rankedData.length) * 360}, 70%, 60%)` // Gradient colors
				),
				borderColor: 'rgba(0, 0, 0, 0.1)',
				borderWidth: 1
			}
		]
	};
};

export const rankPercentageLossChartOptions = {
	indexAxis: 'y', // Horizontal bars
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			display: false // No need for legend since rank is explicit
		},
		title: {
			display: true,
			text: 'Rank by Percentage Weight Loss'
		},
		tooltip: {
			callbacks: {
				label: (tooltipItem: { raw: number }) => `${tooltipItem.raw.toFixed(2)}% loss` // Format tooltip values
			}
		}
	},
	scales: {
		x: {
			beginAtZero: true, // Always start from 0
			title: {
				display: true,
				text: 'Percentage Loss (%)'
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
