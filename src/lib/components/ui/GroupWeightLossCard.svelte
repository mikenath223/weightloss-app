<script lang="ts">
	let { week, totalLoss } = $props();
</script>

<div class="card card-hover bg-white p-4">
	<h3 class="text-md font-bold text-gray-700">{week}</h3>
	<p class="text-lg font-semibold">
		{#if totalLoss >= 0}
			<span class="text-green-600">-{totalLoss.toFixed(2)} kg</span>
		{:else}
			<span class="text-red-600">+{Math.abs(totalLoss).toFixed(2)} kg</span>
		{/if}
	</p>
</div>
