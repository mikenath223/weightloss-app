export const calculateGroupCumulativeProgress = (
	data: Record<string, Record<string, number | undefined>>,
	targetPerWeek: number
) => {
	const weeks = Object.keys(data); // Get all weeks
	const dieters = Object.keys(data[weeks[0]]); // Get all dieters

	const groupCumulativeLoss: number[] = [];
	const groupTargetLoss: number[] = [];

	// Initialize cumulative loss trackers
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
				weeklyTotalLoss += previousWeight - currentWeight; // Calculate loss for the week
			}
		});

		totalCumulativeLoss += weeklyTotalLoss;
		groupCumulativeLoss.push(totalCumulativeLoss);

		// Group target progress assumes all dieters hit their weekly target
		const totalTargetPerWeek = targetPerWeek * dieters.length;
		groupTargetLoss.push(index * totalTargetPerWeek);
	});

	return {
		weeks,
		groupCumulativeLoss,
		groupTargetLoss
	};
};

export const prepareGroupCumulativeProgressChartData = (groupProgress: {
	weeks: string[];
	groupCumulativeLoss: number[];
	groupTargetLoss: number[];
}) => {
	return {
		labels: groupProgress.weeks, // Weeks for the X-axis
		datasets: [
			{
				label: 'Group Cumulative Loss',
				data: groupProgress.groupCumulativeLoss, // Actual group progress
				borderColor: 'rgba(75, 192, 192, 1)', // Teal
				backgroundColor: 'rgba(75, 192, 192, 0.2)', // Teal (transparent)
				fill: true
			},
			{
				label: 'Group Target Loss',
				data: groupProgress.groupTargetLoss, // Group target progress
				borderColor: 'rgba(192, 75, 75, 1)', // Red
				backgroundColor: 'rgba(192, 75, 75, 0.2)', // Red (transparent)
				fill: true,
				borderDash: [5, 5] // Dashed line
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
