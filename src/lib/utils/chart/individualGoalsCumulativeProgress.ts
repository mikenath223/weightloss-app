import {
	RED_SOLID,
	RED_TRANSPARENT,
	TEAL_SOLID,
	TEAL_TRANSPARENT
} from '$lib/constant/progressConstants';
import { getUniqueDieters } from '../dieters';

export const calculateCumulativeProgress = (
	data: Record<string, Record<string, number | undefined>>,
	targetPerWeek: number
) => {
	const weeks = Object.keys(data);
	const dieters = getUniqueDieters(data);

	/**
	 * Calculates and updates the cumulative weight loss and target loss for a given dieter.
	 *
	 * @param cumulativeLoss - Array to store cumulative weight loss values over weeks.
	 * @param targetLoss - Array to store cumulative target loss values over weeks.
	 * @param dieter - The name of the dieter for whom the calculation is performed.
	 * @param totalLoss - The total weight loss accumulated so far.
	 * @returns A function that computes the cumulative progress for each week.
	 *
	 * The returned function iterates over weeks, calculating the weight lost
	 * from the previous week to the current week, if data exists. The cumulative
	 * weight loss and target loss are updated and stored in the respective arrays.
	 */
	const calculateCumulativeTarget =
		(cumulativeLoss: number[], targetLoss: number[], dieter: string, totalLoss: number) =>
		(week: string | number, index: number) => {
			if (index === 0) {
				cumulativeLoss.push(0);
				targetLoss.push(0);
				return;
			}

			const currentWeight = data[week][dieter];
			const previousWeight = data[weeks[index - 1]][dieter];

			if (currentWeight !== undefined && previousWeight !== undefined) {
				totalLoss += previousWeight - currentWeight;
			}

			cumulativeLoss.push(totalLoss);
			targetLoss.push(index * targetPerWeek);
		};

	/**
	 * Calculates the cumulative progress for a dieter.
	 *
	 * @param dieter - The name of the dieter for whom the calculation is performed.
	 * @returns An object containing the dieter's name, cumulative weight loss, cumulative target loss, and the weeks.
	 *
	 * The returned object has the following properties:
	 * - name: The name of the dieter.
	 * - cumulativeLoss: An array of the cumulative weight loss values over weeks.
	 * - targetLoss: An array of the cumulative target loss values over weeks.
	 * - weeks: The same array of weeks as the data object.
	 */
	const calculateDietersProgress = (dieter: string) => {
		const cumulativeLoss: number[] = [];
		const targetLoss: number[] = [];

		let totalLoss = 0;

		const cumulativeTarget = calculateCumulativeTarget(
			cumulativeLoss,
			targetLoss,
			dieter,
			totalLoss
		);

		weeks.forEach(cumulativeTarget);

		return { name: dieter, cumulativeLoss, targetLoss, weeks };
	};

	const progress = dieters.map(calculateDietersProgress);

	return progress;
};

export const prepareCumulativeProgressChartData = (
	progressData: {
		name: string;
		cumulativeLoss: number[];
		targetLoss: number[];
		weeks: string[];
	}[],
	selectedDieter: string
) => {
	const dieterData = progressData.find((d) => d.name === selectedDieter);

	if (!dieterData) {
		throw new Error('Dieter not found');
	}

	return {
		labels: dieterData.weeks,
		datasets: [
			{
				label: 'Cumulative Progress',
				data: dieterData.cumulativeLoss,
				borderColor: TEAL_SOLID,
				backgroundColor: TEAL_TRANSPARENT,
				fill: true
			},
			{
				label: 'Target Progress',
				data: dieterData.targetLoss,
				borderColor: RED_SOLID,
				backgroundColor: RED_TRANSPARENT,
				fill: true,
				borderDash: [5, 5]
			}
		]
	};
};

export const prepareCumulativeProgressChartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			position: 'bottom',
			labels: {
				font: {
					size: 12
				}
			}
		},
		title: {
			display: true,
			text: 'Individual Cumulative Progress vs Target',
			font: {
				size: 16,
				weight: 'bold'
			}
		},
		tooltip: {
			callbacks: {
				label: (tooltipItem: { raw: any; dataset: { label: any } }) => {
					const value = tooltipItem.raw;
					return `${tooltipItem.dataset.label}: ${value.toFixed(2)} kg`;
				}
			}
		}
	},
	scales: {
		x: {
			title: {
				display: true,
				text: 'Weeks',
				font: {
					size: 14
				}
			},
			ticks: {
				autoSkip: true,
				maxRotation: 0
			}
		},
		y: {
			title: {
				display: true,
				text: 'Cumulative Weight Loss (kg)',
				font: {
					size: 14
				}
			},
			beginAtZero: false,
			ticks: {
				stepSize: 5
			}
		}
	},
	interaction: {
		mode: 'index',
		intersect: false
	}
};
