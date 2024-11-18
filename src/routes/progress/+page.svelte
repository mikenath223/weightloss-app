<script lang="ts">
	import type { PageData } from './$types';
	import DataChart from '$lib/components/chart/DataChart.svelte';
	import { weeklyWeightChangesChartOptions } from '$lib/utils/chartUtils/weeklyWeightChangesUtils';
	import { percentageChangesChartOptions } from '$lib/utils/chartUtils/percentageWeightChangesUtils';
	import { rankPercentageLossChartOptions } from '$lib/utils/chartUtils/rankPercentageLoss';
	import { weeksAheadBehindChartOptions } from '$lib/utils/chartUtils/weeksAheadBehindUtils';
	import GroupWeightLoss from '$lib/components/ui/GroupWeightLoss.svelte';

	let { data }: { data: PageData } = $props();

	const weeklyWeightChangesChartConfig = {
		type: 'bar',
		data: data.weeklyChangesChartData,
		options: weeklyWeightChangesChartOptions
	};
	const percentageWeightChangesChartConfig = {
		type: 'bar',
		data: data.percentageChartData,
		options: percentageChangesChartOptions
	};
	const rankPercentageLostChartConfig = {
		type: 'bar',
		data: data.rankChartData,
		options: rankPercentageLossChartOptions
	};
	const weeksAheadBehindChartConfig = {
		type: 'bar',
		data: data.weeksAheadBehindChartData,
		options: weeksAheadBehindChartOptions
	};
</script>

<h2 class="h2 mt-20 font-extrabold">Group Performance</h2>
<p class="py-3">See how we are doing as a community!</p>
<GroupWeightLoss groupTotalWeightLoss={data.groupTotalWeightLoss} />
<h2 class="h2 mt-20 font-extrabold">Weekly Progress Activity</h2>
<p class="py-3">We've all been doing pretty well so far, let's go dieters!</p>
<section class="grid grid-cols-1 gap-4 xl:grid-cols-2">
	<div class="card card-hover w-auto bg-white p-4">
		<DataChart chartConfig={weeklyWeightChangesChartConfig} />
	</div>
	<div class="card card-hover w-auto bg-white p-4">
		<DataChart chartConfig={percentageWeightChangesChartConfig} />
	</div>
</section>
<h2 class="h2 mt-20 font-extrabold">Rankings and Progress Status</h2>
<p class="py-3">Let's see how we stack up, we are so awesome!</p>
<section class="grid grid-cols-1 gap-4 xl:grid-cols-2">
	<div class="card card-hover w-auto bg-white p-4">
		<DataChart chartConfig={rankPercentageLostChartConfig} />
	</div>
	<div class="card card-hover w-auto bg-white p-4">
		<DataChart chartConfig={weeksAheadBehindChartConfig} />
	</div>
</section>
