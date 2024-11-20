import {
	DARK_GREEN,
	DARK_RED,
	GREEN,
	RED_TRANSLUCENT,
	WEEKLY_WEIGHT_LOSS_TARGET
} from '$lib/constant/progressConstants';
import { getUniqueDieters } from '../dieters';

/**
 * Calculates the number of weeks each dieter is ahead or behind their weight loss target.
 *
 * This function computes the total weight loss for each dieter from their first recorded week
 * and compares it to their cumulative target loss. The result is expressed in terms
 * of weeks ahead or behind the target, relative to their individual start week.
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
	const dieters = getUniqueDieters(data);

	const results = dieters.map((dieter) => {
		let totalWeightLost = 0;
		let firstWeekIndex = -1;
		let lastWeekIndex = -1;
		let startingWeight: number | undefined;

		weeks.forEach((week, index) => {
			const currentWeight = data[week][dieter];
			if (currentWeight !== undefined) {
				if (firstWeekIndex === -1) {
					firstWeekIndex = index;
					startingWeight = currentWeight;
				}
				lastWeekIndex = index;
			}
		});

		if (firstWeekIndex === -1 || lastWeekIndex === -1 || startingWeight === undefined) {
			return { name: dieter, weeksAheadBehind: 0 };
		}

		for (let index = firstWeekIndex + 1; index <= lastWeekIndex; index++) {
			const currentWeight = data[weeks[index]][dieter];
			const previousWeight = data[weeks[index - 1]][dieter];

			if (currentWeight !== undefined && previousWeight !== undefined) {
				totalWeightLost += previousWeight - currentWeight;
			}
		}

		const numRelevantWeeks = lastWeekIndex - firstWeekIndex;
		const weeksAheadBehind = totalWeightLost / targetPerWeek - numRelevantWeeks;

		return { name: dieter, weeksAheadBehind: weeksAheadBehind || 0 };
	});

	return results;
};

/**
 * Prepares chart data for visualizing the number of weeks each dieter is
 * ahead or behind their weight loss target.
 *
 * The chart data includes labels for each dieter and a dataset representing
 * the weeks ahead or behind target. The color of the bars reflects whether
 * the dieter is on track (green) or behind (red).
 *
 * @param weeksAheadBehindData - An array of objects where each object contains
 * the dieter's name and the number of weeks they are ahead or behind their target.
 * @returns An object containing the chart data with formatted labels and datasets.
 */
export const prepareWeeksAheadBehindChartData = (
	weeksAheadBehindData: { name: string; weeksAheadBehind: number }[]
) => {
	return {
		labels: weeksAheadBehindData.map((item) => item.name),
		datasets: [
			{
				label: 'Weeks Ahead/Behind',
				data: weeksAheadBehindData.map((item) => item.weeksAheadBehind),
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
	indexAxis: 'y',
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			display: false
		},
		title: {
			display: true,
			text: `Weeks Ahead or Behind Target of ${WEEKLY_WEIGHT_LOSS_TARGET} kg/week`
		},
		tooltip: {
			callbacks: {
				label: (tooltipItem: { raw: number }) =>
					`${tooltipItem.raw > 0 ? '+' : ''}${tooltipItem.raw.toFixed(2)} weeks ${tooltipItem.raw > 0 ? 'ahead' : 'behind'}`
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
