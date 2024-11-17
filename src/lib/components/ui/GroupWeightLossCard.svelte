<script lang="ts">
	let { week, totalLoss } = $props();
</script>

<div class="card card-hover bg-white p-4">
	<h3 class="text-md font-bold text-gray-700">{week}</h3>
	<p class="text-lg font-semibold text-green-600">
		{#if totalLoss >= 0}
			-{totalLoss.toFixed(2)} kg
		{:else}
			+{Math.abs(totalLoss).toFixed(2)} kg
		{/if}
	</p>
</div>
