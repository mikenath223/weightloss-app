export const getUniqueDieters = (
	dietersWeightData: Record<string, Record<string, number | undefined>>
) => {
	const dieters = Object.keys(dietersWeightData).reduce((acc: string[], week: string) => {
		return [...acc, ...Object.keys(dietersWeightData[week])];
	}, []);
	const uniqueDieters = [...new Set(dieters)];
	return uniqueDieters;
};
