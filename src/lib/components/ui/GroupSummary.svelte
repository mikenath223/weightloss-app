<script lang="ts">
	let { isWeightGreaterThanZero, weightLoss } = $props();
</script>

<section class="group-summary flex justify-center">
	<div
		class="flex flex-col items-center rounded-lg border-l-8 border-indigo-400 bg-white p-8 shadow-2xl"
	>
		<h2 class="text-3xl font-bold text-indigo-700">Group Total Weight Loss</h2>
		{#if isWeightGreaterThanZero}
			<p class="mt-4 text-xl text-gray-800">
				The group lost a total of
				<span class="font-bold text-green-600">
					{weightLoss} kg
				</span>
				this week! 🚀 Keep it up!
			</p>
		{:else}
			<p class="mt-4 text-xl text-gray-800">
				It looks like we gained a total of
				<span class="font-bold text-red-600">
					{Math.abs(weightLoss)} kg
				</span>
				this week.
			</p>
			<p class="text-xl text-gray-800">
				But no worries! Every step is progress, and next week is a new chance to crush it! 💪
			</p>
		{/if}
	</div>
</section>
