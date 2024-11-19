<script lang="ts">
	import TopAchiever from '$lib/components/ui/TopAchiever.svelte';
	import GroupSummary from '$lib/components/ui/GroupSummary.svelte';
	import MotivationalMessage from '$lib/components/ui/MotivationalMessage.svelte';

	let { weeklyData } = $props();
</script>

<section class="space-y-8">
	<TopAchiever
		name={weeklyData.topAchiever.name}
		isWeightGreaterThanZero={weeklyData.topAchiever.weightChange > 0}
		weightChange={weeklyData.topAchiever.weightChange.toFixed(2)}
	/>

	<GroupSummary
		isWeightGreaterThanZero={weeklyData.totalWeightLoss > 0}
		weightLoss={weeklyData.totalWeightLoss.toFixed(2)}
	/>

	<section class="motivational-messages grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each weeklyData.messages as { name, message }}
			<MotivationalMessage {name} {message} />
		{/each}
	</section>
</section>
