import { weekColors } from '$lib/constant/progressConstants';

type ChangeCalculator = (
	currentWeight: number | undefined,
	previousWeight: number | undefined
) => number | undefined;

export const calculateWeeklyChanges = (
	data: Record<string, Record<string, number | undefined>>,
	calculateChange: ChangeCalculator
) => {
	const weeks = Object.keys(data); // Get all the dates (e.g., '2-Oct-2024', '9-Oct-2024')
	const dieters = Object.keys(data[weeks[0]]); // Get dieters' names (e.g., 'Michael', 'Paul')

	const weeklyChanges: Record<string, number | undefined>[] = [];

	// Loop through each week starting from Week 2
	for (let i = 1; i < weeks.length; i++) {
		const currentWeek = data[weeks[i]];
		const previousWeek = data[weeks[i - 1]];

		const weeklyChange: Record<string, number | undefined> = {};
		dieters.forEach((dieter) => {
			const currentWeight = currentWeek[dieter];
			const previousWeight = previousWeek[dieter];

			// Delegate the specific calculation logic to the passed function
			weeklyChange[dieter] = calculateChange(currentWeight, previousWeight);
		});

		weeklyChanges.push(weeklyChange);
	}

	return { dieters, weeklyChanges };
};

export const calculateWeeklyWeightChange = (
	data: Record<string, Record<string, number | undefined>>
) => {
	return calculateWeeklyChanges(data, (currentWeight, previousWeight) => {
		if (currentWeight !== undefined && previousWeight !== undefined) {
			return currentWeight - previousWeight; // Absolute difference
		}
		return undefined; // No change if data is missing
	});
};

export const prepareWeeklyChangesChartData = (
	dieters: string[],
	weeklyChanges: Record<string, number | undefined>[]
) => {
	const weekBorderColors = weekColors.map((color) => color.replace('0.6', '1'));

	const datasets = weeklyChanges.map((change, weekIndex) => ({
		label: `Week ${weekIndex + 2}`, // Start from Week 2
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

export const weeklyWeightChangesChartOptions = {
	indexAxis: 'y', // Horizontal bars
	responsive: true,
	maintainAspectRatio: true,
	plugins: {
		legend: {
			position: 'right'
		},
		title: {
			display: true,
			text: 'Weekly Weight Changes in Kg'
		}
	},
	scales: {
		x: {
			beginAtZero: false, // Allow negative and positive values
			title: {
				display: true,
				text: 'Weekly Change (Kg)'
			}
		}
	}
};
