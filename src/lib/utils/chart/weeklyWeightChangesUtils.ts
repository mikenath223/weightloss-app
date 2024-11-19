import type { ChartConfiguration } from 'chart.js';

type ChangeCalculator = (
	currentWeight: number | undefined,
	previousWeight: number | undefined
) => number | undefined;

/**
 * Calculates weekly changes in weight for each dieter.
 *
 * @param data - Record where keys are week dates and values are objects with dieter names as keys and weight data as values.
 * @param calculateChange - A function that takes the current and previous weights for a dieter and returns the weekly change.
 * @returns An object containing the dieters, weeks, and weekly changes.
 */
export const calculateWeeklyChanges = (
	data: Record<string, Record<string, number | undefined>>,
	calculateChange: ChangeCalculator
) => {
	const weeks = Object.keys(data);
	const dieters = Object.keys(data[weeks[0]]);

	const weeklyChanges: Record<string, number | undefined>[] = [];

	// Loop through each week starting from Week 2
	for (let i = 1; i < weeks.length; i++) {
		const currentWeek = data[weeks[i]];
		const previousWeek = data[weeks[i - 1]];

		const weeklyChange: Record<string, number | undefined> = {};
		dieters.forEach((dieter) => {
			const currentWeight = currentWeek[dieter];
			const previousWeight = previousWeek[dieter];

			weeklyChange[dieter] = calculateChange(currentWeight, previousWeight);
		});

		weeklyChanges.push(weeklyChange);
	}

	return { dieters, weeks, weeklyChanges };
};

/**
 * Calculates the weekly absolute weight change for each dieter.
 *
 * This function is a specialized wrapper around `calculateWeeklyChanges`
 * that calculates the absolute weight change between the current and previous
 * weeks for each dieter.
 *
 * @param data - Record where keys are week dates and values are objects with dieter names as keys and weight data as values.
 * @returns An object containing the dieters, weeks, and weekly absolute weight changes.
 */
export const calculateWeeklyWeightChange = (
	data: Record<string, Record<string, number | undefined>>
) => {
	return calculateWeeklyChanges(data, (currentWeight, previousWeight) => {
		if (currentWeight !== undefined && previousWeight !== undefined) {
			return currentWeight - previousWeight;
		}
		return undefined; // Return undefined if data is missing
	});
};

/**
 * Prepares chart data for displaying weekly weight changes for a selected dieter.
 *
 * The chart data includes labels for each week (starting from Week 2) and a dataset
 * representing the weekly weight changes for the selected dieter. The color of the
 * bars in the chart is determined by whether the change is negative or positive.
 *
 * @param weeklyChanges - An array of objects where keys are dieter names and values
 * are their weekly weight changes.
 * @param weeks - An array of week labels.
 * @param selectedDieter - The name of the dieter for whom the chart data is being
 * prepared.
 * @returns An object containing the chart data with formatted labels and datasets.
 */
export const prepareWeeklyChangesChartData = (
	weeklyChanges: Record<string, number | undefined>[],
	weeks: string[],
	selectedDieter: string
) => {
	const dieterChanges = weeklyChanges.map((weekChange) => weekChange[selectedDieter] ?? 0);

	return {
		labels: weeks.slice(1), // Start from Week 2 since Week 1 has no comparison
		datasets: [
			{
				label: `Weekly Weight Changes for ${selectedDieter}`,
				data: dieterChanges, // Changes for the selected dieter
				backgroundColor: dieterChanges.map((change) =>
					change < 0 ? 'rgba(75, 192, 192, 0.8)' : 'rgba(255, 99, 132, 0.8)'
				),
				borderColor: dieterChanges.map((change) =>
					change < 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)'
				),
				borderWidth: 1
			}
		]
	};
};

/**
 * Updates the chart configuration for displaying weekly weight changes for a selected dieter.
 *
 * The chart configuration is updated with the chart data prepared by
 * `prepareWeeklyChangesChartData` and includes options for a horizontal bar
 * chart with title, legend, and tooltip customizations.
 *
 * @param weeklyChanges - An array of objects where keys are dieter names and values are their weekly weight changes.
 * @param weeks - An array of week labels.
 * @param selectedDieter - The name of the dieter for whom the chart data is being prepared.
 * @returns A `ChartConfiguration<'bar'>` object that can be used to update a Chart.js chart instance.
 */
export const updateWeeklyChangesChartConfig = (
	weeklyChanges: Record<string, number | undefined>[],
	weeks: string[],
	selectedDieter: string
): ChartConfiguration<'bar'> => ({
	type: 'bar',
	data: prepareWeeklyChangesChartData(weeklyChanges, weeks, selectedDieter),
	options: {
		indexAxis: 'y', // Horizontal bar chart
		responsive: true,
		plugins: {
			legend: {
				display: false
			},
			title: {
				display: true,
				text: `Weekly Weight Changes for ${selectedDieter}`
			},
			tooltip: {
				callbacks: {
					label: (tooltipItem: { raw: any }) => {
						const value = tooltipItem.raw;
						return `${value > 0 ? '+' : ''}${value.toFixed(2)} kg`;
					}
				}
			}
		},
		scales: {
			x: {
				title: {
					display: true,
					text: 'Weight Change (kg)'
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
