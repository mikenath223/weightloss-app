<script lang="ts">
	import LottieAnimation from '$lib/components/ui/LottieAnimation.svelte';
	import weightLottie from '$lib/assets/lottie/lady-weight-lift-lottie.json';
	let { name, isWeightGreaterThanZero, weightChange } = $props();
</script>

<section class="animate-customPop flex flex-col items-center space-y-6">
	<div class="flex flex-col items-center">
		<h2 class="mt-4 text-4xl font-bold text-green-600">
			Top Achiever: {name}
		</h2>
		{#if isWeightGreaterThanZero}
			<p class="mt-2 text-lg text-gray-700">
				Lost an incredible
				<span class="font-bold">{weightChange} kg</span>
				this week! 🎉 Keep up the amazing work!
			</p>
		{:else}
			<p class="mt-2 text-lg text-gray-700">
				Looks like we all gained weight but <span class="font-bold">{name}</span>
				gained only
				<span class="font-bold text-red-600">{Math.abs(weightChange).toFixed(2)} kg</span>
				this week.
			</p>
			<p class="text-lg text-gray-700">Don’t worry—every journey has its ups and downs.</p>
			<p class="text-lg text-gray-700">Next week is a fresh start! 🌟🌟🌟</p>
		{/if}
		<div class="">
			<LottieAnimation src={weightLottie} width={300} height={300} />
		</div>
	</div>
</section>
