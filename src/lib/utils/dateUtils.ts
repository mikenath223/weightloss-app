import type { WeekInfo } from '$lib/types/dateUtils';

const startDate = new Date('2024-10-02');

/**
 * Get the current week number and date range.
 * @returns {WeekInfo} - An object containing the week number and the range of dates.
 */
export const getCurrentWeekInfo = (): WeekInfo => {
	const now = new Date();
	const diffInMilliseconds = now.getTime() - startDate.getTime();
	const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
	const weekNumber = Math.floor(diffInDays / 7) + 1;

	const weekStartDate = new Date(startDate);
	weekStartDate.setDate(startDate.getDate() + (weekNumber - 1) * 7);

	const weekEndDate = new Date(weekStartDate);
	weekEndDate.setDate(weekStartDate.getDate() + 6);

	const formatDate = (date: Date): string =>
		date
			.toLocaleDateString('en-GB', {
				day: '2-digit',
				month: 'short',
				year: 'numeric'
			})
			.split(' ')
			.join('-');

	return {
		weekNumber,
		weekRange: `${formatDate(weekStartDate)} to ${formatDate(weekEndDate)}`
	};
};
