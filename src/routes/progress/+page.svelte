<script lang="ts">
	import type { PageData } from './$types';
	import DataChart from '$lib/components/chart/DataChart.svelte';
	import { updateWeeklyChangesChartConfig } from '$lib/utils/chart/weeklyWeightChangesUtils';
	import { rankPercentageLossChartOptions } from '$lib/utils/chart/rankPercentageLoss';
	import { weeksAheadBehindChartOptions } from '$lib/utils/chart/weeksAheadBehindUtils';
	import GroupWeightLoss from '$lib/components/ui/GroupWeightLoss.svelte';
	import type { ChartConfiguration } from 'chart.js';
	import CardWData from '$lib/components/ui/CardWData.svelte';
	import { updateWeeklyPercentageChartConfig } from '$lib/utils/chart/percentageWeightChangesUtils';

	let { data }: { data: PageData } = $props();

	let weeklyChangeSelectedDieter = $state(data.weeklyChangesData.dieters[0]); // Default to the first dieter
	let weeklyChangesChartConfig: ChartConfiguration<'bar'> = $derived(
		updateWeeklyChangesChartConfig(
			data.weeklyChangesData.weeklyChanges,
			data.weeklyChangesData.weeks,
			weeklyChangeSelectedDieter
		)
	);
	let percentageChangeSelectedDieter = $state(data.percentageChangesData.dieters[0]); // Default to the first dieter
	let percentageChangesChartConfig: ChartConfiguration<'bar'> = $derived(
		updateWeeklyPercentageChartConfig(
			data.percentageChangesData.weeklyPercentageChanges,
			data.percentageChangesData.weeks,
			percentageChangeSelectedDieter
		)
	);
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
	<CardWData>
		<div class="mx-4 mb-4 mt-2">
			<label for="dieter" class="text-md block font-semibold text-gray-700">Select Dieter</label>
			<select
				id="dieter"
				bind:value={weeklyChangeSelectedDieter}
				class="w-28 rounded border-2 border-red-500 p-2 focus:outline-none focus:ring-2 focus:ring-red-300"
			>
				{#each data.weeklyChangesData.dieters as dieter}
					<option value={dieter}>{dieter}</option>
				{/each}
			</select>
		</div>
		<h4 class="h4 mx-4 mb-2">
			Here is {weeklyChangeSelectedDieter}'s weekly weight changes in kg
		</h4>
		{#if weeklyChangesChartConfig}
			<DataChart chartConfig={weeklyChangesChartConfig} />
		{/if}
	</CardWData>
	<CardWData>
		<div class="mx-4 mb-4 mt-2">
			<label for="dieter" class="text-md block font-semibold text-gray-700">Select Dieter</label>
			<select
				id="dieter"
				bind:value={percentageChangeSelectedDieter}
				class="w-28 rounded border-2 border-red-500 p-2 focus:outline-none focus:ring-2 focus:ring-red-300"
			>
				{#each data.percentageChangesData.dieters as dieter}
					<option value={dieter}>{dieter}</option>
				{/each}
			</select>
		</div>
		<h4 class="h4 mx-4 mb-2">
			Here is {percentageChangeSelectedDieter}'s weekly percentage changes
		</h4>
		{#if percentageChangesChartConfig}
			<DataChart chartConfig={percentageChangesChartConfig} />
		{/if}
	</CardWData>
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
