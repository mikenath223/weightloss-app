import { RED, RED_TRANSPARENT, TEAL, TEAL_TRANSPARENT } from '$lib/constant/progressConstants';
import { getUniqueDieters } from '../dieters';

/**
 * Calculates the cumulative progress for all dieters combined.
 *
 * @param data - Object with dieter names as keys and weight loss data as values.
 * @param targetPerWeek - The target weight loss per week for each dieter.
 * @returns An object containing the weeks, cumulative weight loss, and cumulative target loss
 * for all dieters combined.
 *
 * The returned object has the following properties:
 * - weeks: The weeks for which the cumulative progress is calculated.
 * - groupCumulativeLoss: An array of the cumulative weight loss values for all dieters combined.
 * - groupTargetLoss: An array of the cumulative target loss values for all dieters combined.
 */
export const calculateGroupCumulativeProgress = (
	data: Record<string, Record<string, number | undefined>>,
	targetPerWeek: number
) => {
	const weeks = Object.keys(data);
	const dieters = getUniqueDieters(data);

	const groupCumulativeLoss: number[] = [];
	const groupTargetLoss: number[] = [];

	let totalCumulativeLoss = 0;

	weeks.forEach((week, index) => {
		if (index === 0) {
			groupCumulativeLoss.push(0);
			groupTargetLoss.push(0);
			return;
		}

		let weeklyTotalLoss = 0;

		dieters.forEach((dieter) => {
			const currentWeight = data[week][dieter];
			const previousWeight = data[weeks[index - 1]][dieter];

			if (currentWeight !== undefined && previousWeight !== undefined) {
				weeklyTotalLoss += previousWeight - currentWeight;
			}
		});

		totalCumulativeLoss += weeklyTotalLoss;
		groupCumulativeLoss.push(totalCumulativeLoss);

		const totalTargetPerWeek = targetPerWeek * dieters.length;
		groupTargetLoss.push(index * totalTargetPerWeek);
	});

	return {
		weeks,
		groupCumulativeLoss,
		groupTargetLoss
	};
};

/**
 * Prepares chart data for a group's cumulative progress.
 *
 * @param groupProgress - The group's progress data.
 * @returns A chart data object with the following properties:
 * - labels: The weeks on the X-axis.
 * - datasets: An array with two datasets:
 *   - The first dataset represents the group's actual cumulative loss.
 *   - The second dataset represents the group's target cumulative loss.
 */
export const prepareGroupCumulativeProgressChartData = (groupProgress: {
	weeks: string[];
	groupCumulativeLoss: number[];
	groupTargetLoss: number[];
}) => {
	return {
		labels: groupProgress.weeks,
		datasets: [
			{
				label: 'Group Cumulative Loss',
				data: groupProgress.groupCumulativeLoss,
				borderColor: TEAL,
				backgroundColor: TEAL_TRANSPARENT,
				fill: true
			},
			{
				label: 'Group Target Loss',
				data: groupProgress.groupTargetLoss,
				borderColor: RED,
				backgroundColor: RED_TRANSPARENT,
				fill: true,
				borderDash: [5, 5]
			}
		]
	};
};

export const groupCumulativeProgressChartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			position: 'top'
		},
		title: {
			display: true,
			text: 'Group Cumulative Progress vs Target',
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
				text: 'Weeks'
			}
		},
		y: {
			title: {
				display: true,
				text: 'Cumulative Weight Loss (kg)'
			},
			beginAtZero: false
		}
	},
	interaction: {
		mode: 'index',
		intersect: false
	}
};
