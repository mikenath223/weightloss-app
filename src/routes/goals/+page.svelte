<script lang="ts">
	import type { PageData } from './$types';
	import DataChart from '$lib/components/chart/DataChart.svelte';
	import {
		prepareCumulativeProgressChartData,
		prepareCumulativeProgressChartOptions
	} from '$lib/utils/chart/individualGoalsCumulativeProgress';
	import CardWData from '$lib/components/ui/CardWData.svelte';
	import {
		groupCumulativeProgressChartOptions,
		prepareGroupCumulativeProgressChartData
	} from '$lib/utils/chart/groupGoalsCumulativeProgress';
	import PageHeaderView from '$lib/components/ui/PageHeaderView.svelte';

	let { data }: { data: PageData } = $props();

	let selectedDieter = $state(data.individualCumulativeProgress[0]?.name);

	const goalsCumulativeChartConfig = $derived({
		type: 'line',
		data: prepareCumulativeProgressChartData(data.individualCumulativeProgress, selectedDieter),
		options: prepareCumulativeProgressChartOptions
	});

	const groupCumulativeChartConfig = $derived({
		type: 'line',
		data: prepareGroupCumulativeProgressChartData(data.groupCumulativeProgress),
		options: groupCumulativeProgressChartOptions
	});
</script>

<section class="goals-page min-h-screen py-10 md:px-6">
	<PageHeaderView
		title="🌟 Goals Dashboard 🌟"
		subtitle="Keep striving and smashing those targets! 🎉"
	/>
	<section class="grid grid-cols-1 gap-12 lg:grid-cols-2">
		<CardWData className={'!p-0 !pb-4'}>
			<div
				class="flex items-center justify-between rounded-t-lg bg-gradient-to-r from-red-400 to-pink-400 px-4 py-2 text-white"
			>
				<h2 class="text-lg font-bold">Individual Progress</h2>
			</div>
			<div class="space-y-5 px-6">
				<label for="dieter" class="text-md -mb-3 mt-2 block font-semibold text-gray-600">
					Select Dieter
				</label>
				<select
					id="dieter"
					bind:value={selectedDieter}
					class="w-full rounded-md border-2 border-gray-300 bg-white p-2 shadow-md focus:border-red-400 focus:ring-2 focus:ring-red-200"
				>
					{#each data.individualCumulativeProgress as { name }}
						<option value={name}>{name}</option>
					{/each}
				</select>
				<p class="text-md text-gray-700">
					View <span class="font-bold">{selectedDieter}'s</span> progress compared to their weekly target.
				</p>
				<DataChart chartConfig={goalsCumulativeChartConfig} />
			</div>
		</CardWData>
		<CardWData className={'!p-0 !pb-4'}>
			<div
				class="flex items-center justify-between rounded-t-lg bg-gradient-to-r from-green-400 to-teal-400 px-4 py-2 text-white"
			>
				<h2 class="text-lg font-bold">Group Progress</h2>
			</div>
			<div class="space-y-4 px-6">
				<p class="text-md my-4 text-gray-700">
					The team's collective progress toward the shared goal.
				</p>
				<DataChart chartConfig={groupCumulativeChartConfig} />
			</div>
		</CardWData>
	</section>
</section>
