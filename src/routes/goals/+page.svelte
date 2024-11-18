<script lang="ts">
	import type { PageData } from './$types';
	import DataChart from '$lib/components/chart/DataChart.svelte';
	import {
		prepareCumulativeProgressChartData,
		prepareCumulativeProgressChartOptions
	} from '$lib/utils/chartUtils/individualGoalsCumulativeProgress';
	import CardWData from '$lib/components/ui/CardWData.svelte';
	import {
		groupCumulativeProgressChartOptions,
		prepareGroupCumulativeProgressChartData
	} from '$lib/utils/chartUtils/groupGoalsCumulativeProgress';

	let { data }: { data: PageData } = $props();

	let selectedDieter = $state(data.individualCumulativeProgress[0]?.name);

	const goalsCumulativeChartConfig = $derived({
		type: 'line',
		data: prepareCumulativeProgressChartData(data.individualCumulativeProgress, selectedDieter),
		options: prepareCumulativeProgressChartOptions
	});

	const groupCumulativeChartConfig = {
		type: 'line',
		data: prepareGroupCumulativeProgressChartData(data.groupCumulativeProgress),
		options: groupCumulativeProgressChartOptions
	};
</script>

<section class="goals-page space-y-4">
	<h2 class="h2 font-extrabold">Dieter's Cumulative Progress</h2>
	<p class="py-3">This is pretty sleek, seems we've been giving our targets no breathing space!</p>
	<section class="grid grid-cols-1 gap-10 xl:grid-cols-2">
		<CardWData>
			<div class="flex">
				<div class="mb-4 ml-auto mt-2">
					<label for="dieter" class="text-md block font-medium text-gray-700">Select Dieter</label>
					<select
						id="dieter"
						bind:value={selectedDieter}
						class="w-28 rounded border-2 border-gray-500 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
					>
						{#each data.individualCumulativeProgress as { name }}
							<option value={name}>{name}</option>
						{/each}
					</select>
				</div>
			</div>
			<DataChart chartConfig={goalsCumulativeChartConfig} />
		</CardWData>
		<CardWData>
			<DataChart chartConfig={groupCumulativeChartConfig} />
		</CardWData>
	</section>
</section>
