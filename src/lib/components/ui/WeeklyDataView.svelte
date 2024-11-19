<script lang="ts">
	import TopAchiever from './TopAchiever.svelte';
	import GroupSummary from './GroupSummary.svelte';
	import ProInfoTip from './ProInfoTip.svelte';
	import MotivationalMessage from './MotivationalMessage.svelte';

	let { weeklyData } = $props();
</script>

<div class="container mx-auto px-4 py-8">
	<div class="mx-auto max-w-4xl space-y-8">
		<TopAchiever
			name={weeklyData.topAchiever.name}
			isWeightGreaterThanZero={weeklyData.topAchiever.weightChange > 0}
			weightChange={weeklyData.topAchiever.weightChange}
		/>
		<GroupSummary
			isWeightGreaterThanZero={weeklyData.totalWeightLoss > 0}
			weightLoss={weeklyData.totalWeightLoss.toFixed(2)}
		/>
		<ProInfoTip
			info="A new user with no previous week data won't have any result! Consistent tracking is key. Log
		your weight at the same time each week for accurate results."
		/>
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each weeklyData.messages as { name, message }}
				<MotivationalMessage {name} {message} />
			{/each}
		</div>
	</div>
</div>
