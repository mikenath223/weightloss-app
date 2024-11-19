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
	import PageHeaderView from '$lib/components/ui/PageHeaderView.svelte';

	let { data }: { data: PageData } = $props();

	let weeklyChangeSelectedDieter = $state(data.weeklyChangesData.dieters[0]);
	let weeklyChangesChartConfig: ChartConfiguration<'bar'> = $derived(
		updateWeeklyChangesChartConfig(
			data.weeklyChangesData.weeklyChanges,
			data.weeklyChangesData.weeks,
			weeklyChangeSelectedDieter
		)
	);

	let percentageChangeSelectedDieter = $state(data.percentageChangesData.dieters[0]);
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

<section class="progress-page min-h-screen space-y-16 py-10">
	<PageHeaderView
		title="🌟 Progress Tracker 🌟"
		subtitle="Let's see how far we've come together as a team! Keep going! 💪"
	/>

	<section class="group-performance space-y-8">
		<h2 class="text-2xl font-bold text-purple-600 drop-shadow-sm">Group Performance</h2>
		<p class="text-lg text-gray-700">How are we doing as a community? Let's find out!</p>
		<GroupWeightLoss groupTotalWeightLoss={data.groupTotalWeightLoss} />
	</section>

	<section class="weekly-activity space-y-8">
		<h2 class="text-2xl font-bold text-red-600 drop-shadow-sm md:text-3xl">
			Weekly Progress Activity
		</h2>
		<p class="text-lg text-gray-700">Consistency is key! We're doing amazing!</p>
		<div class="grid grid-cols-1 gap-8 xl:grid-cols-2">
			<CardWData className={'!p-0 !pb-4'}>
				<div class="rounded-t-lg bg-gradient-to-r from-red-400 to-pink-400 px-6 py-4 text-white">
					<h3 class="text-lg font-bold">Weekly Weight Changes</h3>
				</div>
				<div class="space-y-4 p-6">
					<label for="dieter" class="text-md -mb-3 block font-semibold text-gray-600">
						Select Dieter
					</label>
					<select
						id="dieter"
						bind:value={weeklyChangeSelectedDieter}
						class="w-full rounded-md border-2 border-gray-300 bg-white p-2 shadow-md focus:border-red-400 focus:ring-2 focus:ring-red-200"
					>
						{#each data.weeklyChangesData.dieters as dieter}
							<option value={dieter}>{dieter}</option>
						{/each}
					</select>
					<p class="text-md text-gray-700">
						View <span class="font-bold">{weeklyChangeSelectedDieter}'s</span> weekly weight changes
						in kg.
					</p>
					{#if weeklyChangesChartConfig}
						<DataChart chartConfig={weeklyChangesChartConfig} />
					{/if}
				</div>
			</CardWData>

			<CardWData className={'!p-0 !pb-4'}>
				<div
					class="rounded-t-lg bg-gradient-to-r from-yellow-400 to-orange-400 px-6 py-4 text-white"
				>
					<h3 class="text-lg font-bold">Weekly Percentage Changes</h3>
				</div>
				<div class="space-y-4 p-6">
					<label for="dieter" class="text-md -mb-3 block font-semibold text-gray-600">
						Select Dieter
					</label>
					<select
						id="dieter"
						bind:value={percentageChangeSelectedDieter}
						class="w-full rounded-md border-2 border-gray-300 bg-white p-2 shadow-md focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
					>
						{#each data.percentageChangesData.dieters as dieter}
							<option value={dieter}>{dieter}</option>
						{/each}
					</select>
					<p class="text-md text-gray-700">
						View <span class="font-bold">{percentageChangeSelectedDieter}'s</span> weekly percentage
						changes.
					</p>
					{#if percentageChangesChartConfig}
						<DataChart chartConfig={percentageChangesChartConfig} />
					{/if}
				</div>
			</CardWData>
		</div>
	</section>

	<section class="rankings-progress space-y-8">
		<h2 class="text-3xl font-bold text-indigo-600 drop-shadow-sm">Rankings and Progress Status</h2>
		<p class="text-lg text-gray-700">How do we stack up as a team? Let's find out! 🚀</p>
		<div class="grid grid-cols-1 gap-8 xl:grid-cols-2">
			<CardWData>
				<DataChart chartConfig={rankPercentageLostChartConfig} />
			</CardWData>
			<CardWData>
				<DataChart chartConfig={weeksAheadBehindChartConfig} />
			</CardWData>
		</div>
	</section>
</section>
