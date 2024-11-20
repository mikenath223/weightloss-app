<script lang="ts">
	import { TrendingDown, TrendingUp } from 'lucide-svelte';

	let { isWeightGreaterThanZero, weightLoss } = $props();
</script>

<section class="transform rounded-2xl bg-white p-6 shadow-xl transition-all hover:scale-[1.02]">
	<div class="text-center">
		<h2 class="mb-6 text-3xl font-bold text-indigo-700">Group Progress</h2>

		{#if isWeightGreaterThanZero}
			<div class="flex items-center justify-center text-green-600">
				<TrendingDown class="mr-2 h-8 w-8" />
				<p class="text-xl">
					Group lost <span class="font-bold">
						{weightLoss} kg
					</span> this week! 🚀
				</p>
			</div>
		{:else}
			<div class="flex flex-col items-center text-red-600">
				<TrendingUp class="h-8 w-8" />
				<p class="mt-2 text-xl">
					Group gained <span class="font-bold">
						{Math.abs(weightLoss)} kg
					</span> this week
				</p>
				<p class="text-md mt-2 text-gray-600">
					Stay motivated! Next week is another opportunity. 💪
				</p>
			</div>
		{/if}
	</div>
</section>
