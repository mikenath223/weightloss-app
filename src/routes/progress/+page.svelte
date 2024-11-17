<script lang="ts">
	import type { PageData } from './$types';
	import DataChart from '$lib/components/chart/DataChart.svelte';
	import { weeklyWeightChangesChartOptions } from '$lib/utils/chartUtils/weeklyWeightChangesUtils';
	import { percentageChangesChartOptions } from '$lib/utils/chartUtils/percentageWeightChangesUtils';
	import { rankPercentageLossChartOptions } from '$lib/utils/chartUtils/rankPercentageLoss';

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
</script>

<section class="mx-3 my-10 md:mx-6">
	<h4 class="h4 font-bold">Weekly Progress Activity</h4>
	<p class="py-3">We've all been doing pretty well so far, let's go dieters!</p>
	<section class="grid grid-cols-1 gap-4 xl:grid-cols-2">
		<div class="card card-hover w-auto bg-white p-4">
			<DataChart chartConfig={weeklyWeightChangesChartConfig} />
		</div>
		<div class="card card-hover w-auto bg-white p-4">
			<DataChart chartConfig={percentageWeightChangesChartConfig} />
		</div>
	</section>
	<h4 class="h4 mt-10 font-bold">Rank Percentage Lost</h4>
	<p class="py-3">Let's see how we stack up</p>
	<section class="grid grid-cols-1 gap-4 xl:grid-cols-2">
		<div class="card card-hover w-auto bg-white p-4">
			<DataChart chartConfig={rankPercentageLostChartConfig} />
		</div>
	</section>
</section>
