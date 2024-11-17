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
