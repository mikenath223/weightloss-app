<script lang="ts">
	import type { PageData } from './$types';
	import TopAchiever from '$lib/components/ui/TopAchiever.svelte';
	import GroupSummary from '$lib/components/ui/GroupSummary.svelte';
	import MotivationalMessage from '$lib/components/ui/MotivationalMessage.svelte';

	let { data }: { data: PageData } = $props();
</script>

<section class="flex min-h-screen flex-col items-center justify-between gap-8 space-y-10">
	<header class="text-center">
		<h1 class="text-5xl font-extrabold text-indigo-700 drop-shadow-md">Weekly Summary</h1>
		<p class="mt-4 text-2xl text-gray-800">
			This is the progress for <span class="font-bold">{data.weekInfo.weekRange}</span>.
		</p>
		<p class="mt-2 text-2xl text-gray-800">Let's celebrate the wins and keep striving!</p>
	</header>
	<TopAchiever
		name={data.weeklySummary.topAchiever.name}
		isWeightGreaterThanZero={data.weeklySummary.topAchiever.weightChange > 0}
		weightChange={data.weeklySummary.topAchiever.weightChange.toFixed(2)}
	/>
	<GroupSummary
		isWeightGreaterThanZero={data.weeklySummary.totalWeightLoss > 0}
		weightLoss={data.weeklySummary.totalWeightLoss.toFixed(2)}
	/>
	<section class="motivational-messages grid grid-cols-1 gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each data.weeklySummary.messages as { name, message }}
			<MotivationalMessage {name} {message} />
		{/each}
	</section>
</section>
