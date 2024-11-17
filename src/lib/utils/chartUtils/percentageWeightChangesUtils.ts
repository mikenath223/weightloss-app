import { weekColors } from '$lib/constant/progressConstants';
import { calculateWeeklyChanges } from './weeklyWeightChangesUtils';

export const calculateWeeklyPercentageChange = (
	data: Record<string, Record<string, number | undefined>>
) => {
	return calculateWeeklyChanges(
		data,
		(currentWeight: number | undefined, previousWeight: number | undefined) => {
			if (
				currentWeight !== undefined &&
				previousWeight !== undefined &&
				previousWeight !== 0 // Avoid division by zero
			) {
				return ((currentWeight - previousWeight) / previousWeight) * 100; // Percentage difference
			}
			return undefined; // No change if data is missing
		}
	);
};

export const prepareWeeklyPercentageChartData = (
	dieters: string[],
	weeklyPercentageChanges: Record<string, number | undefined>[]
) => {
	const weekBorderColors = weekColors.map(
		(color) => color.replace('0.6', '1') // Make border colors fully opaque
	);

	const datasets = weeklyPercentageChanges.map((change, weekIndex) => ({
		label: `Week ${weekIndex + 2}`, // Start labeling from Week 2
		data: dieters.map((dieter) => change[dieter] ?? 0), // Use 0 for undefined values
		backgroundColor: weekColors[weekIndex % weekColors.length], // Cycle through colors
		borderColor: weekBorderColors[weekIndex % weekBorderColors.length],
		borderWidth: 1
	}));

	return {
		labels: dieters,
		datasets
	};
};

export const percentageChangesChartOptions = {
	indexAxis: 'y', // Horizontal bars
	responsive: true,
	maintainAspectRatio: true,
	plugins: {
		legend: {
			position: 'right'
		},
		title: {
			display: true,
			text: 'Weekly Percentage Weight Changes (%)'
		},
		tooltip: {
			callbacks: {
				label: (tooltipItem: { raw: number }) => `${tooltipItem.raw.toFixed(2)}%` // Format tooltip values
			}
		}
	},
	scales: {
		x: {
			beginAtZero: false, // Allow negative and positive values
			title: {
				display: true,
				text: 'Percentage Change (%)'
			}
		}
	}
};
