<script lang="ts">
	import GroupWeightLossCard from './GroupWeightLossCard.svelte';

	let { groupTotalWeightLoss } = $props();
</script>

<section class="group-totals space-y-4">
	<h2 class="text-lg font-bold text-indigo-600">Community Total Weight Loss</h2>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each groupTotalWeightLoss as { week, totalLoss }}
			<GroupWeightLossCard {week} {totalLoss} />
		{/each}
	</div>
</section>
