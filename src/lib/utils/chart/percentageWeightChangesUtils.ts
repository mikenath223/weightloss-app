import { PINK, PINK_SOLID, TEAL_OPAQUE, TEAL_SOLID } from '$lib/constant/progressConstants';
import { calculateWeeklyChanges } from './weeklyWeightChangesUtils';

/**
 * Calculates the weekly percentage change in weight for each dieter.
 *
 * Uses the `calculateWeeklyChanges` function to iterate over the provided data,
 * applying a percentage change calculation between the current and previous week's
 * weights for each dieter.
 *
 * The percentage change is calculated as:
 * ((currentWeight - previousWeight) / previousWeight) * 100
 *
 * Returns undefined for any week where the current or previous weight is missing,
 * or if the previous weight is zero to avoid division by zero.
 *
 * @param data - A record where keys are week dates and values are objects
 * containing dieter names as keys and their weight data as values.
 * @returns An object containing the dieters, weeks, and calculated weekly
 * percentage changes.
 */
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
				const percentageChange = ((currentWeight - previousWeight) / previousWeight) * 100;
				return percentageChange;
			}
			return undefined; // No change if data is missing
		}
	);
};

/**
 * Prepares chart data for displaying weekly percentage weight changes for a selected dieter.
 *
 * The chart data includes labels for each week (starting from Week 2) and a dataset
 * representing the percentage changes in weight for the selected dieter. The color
 * of the bars in the chart is determined by whether the change is negative or positive.
 *
 * @param weeklyPercentageChanges - An array of objects where keys are dieter names and values
 * are their weekly percentage weight changes.
 * @param weeks - An array of week labels.
 * @param selectedDieter - The name of the dieter for whom the chart data is being prepared.
 * @returns An object containing the chart data with formatted labels and datasets.
 */
export const prepareWeeklyPercentageChartData = (
	weeklyPercentageChanges: Record<string, number | undefined>[],
	weeks: string[],
	selectedDieter: string
) => {
	const selectedDieterChanges = weeklyPercentageChanges.map(
		(weekChange) => weekChange[selectedDieter] ?? 0
	);

	return {
		labels: weeks.slice(1), // Start from Week 2 since Week 1 has no comparison
		datasets: [
			{
				label: `Weekly Percentage Changes for ${selectedDieter}`,
				data: selectedDieterChanges,
				backgroundColor: selectedDieterChanges.map((change) => (change < 0 ? TEAL_OPAQUE : PINK)),
				borderColor: selectedDieterChanges.map((change) => (change < 0 ? TEAL_SOLID : PINK_SOLID)),
				borderWidth: 1
			}
		]
	};
};

import type { ChartConfiguration } from 'chart.js';

/**
 * Updates the chart configuration for displaying weekly percentage weight changes
 * for a selected dieter.
 *
 * The chart configuration is updated with the chart data prepared by
 * `prepareWeeklyPercentageChartData` and includes options for a horizontal bar
 * chart with title, legend, and tooltip customizations.
 *
 * @param weeklyPercentageChanges - An array of objects where keys are dieter names
 * and values are their weekly percentage weight changes.
 * @param weeks - An array of week labels.
 * @param selectedDieter - The name of the dieter for whom the chart data is being
 * prepared.
 * @returns A `ChartConfiguration<'bar'>` object that can be used to update a
 * Chart.js chart instance.
 */
export const updateWeeklyPercentageChartConfig = (
	weeklyPercentageChanges: Record<string, number | undefined>[],
	weeks: string[],
	selectedDieter: string
): ChartConfiguration<'bar'> => ({
	type: 'bar',
	data: prepareWeeklyPercentageChartData(weeklyPercentageChanges, weeks, selectedDieter),
	options: {
		indexAxis: 'y', // Horizontal bar chart
		responsive: true,
		plugins: {
			legend: {
				display: false
			},
			title: {
				display: true,
				text: `Weekly Percentage Weight Changes for ${selectedDieter} (%)`
			},
			tooltip: {
				callbacks: {
					label: (tooltipItem: { raw: any }) =>
						`${tooltipItem.raw > 0 ? '+' : ''}${tooltipItem.raw.toFixed(2)}%`
				}
			}
		},
		scales: {
			x: {
				beginAtZero: true,
				title: {
					display: true,
					text: 'Percentage Change (%)'
				}
			},
			y: {
				title: {
					display: true,
					text: 'Weeks'
				}
			}
		}
	}
});
