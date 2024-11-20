<script lang="ts">
	import LottieAnimation from '$lib/components/ui/LottieAnimation.svelte';
	import weightLottie from '$lib/assets/lottie/lady-weight-lift-lottie.json';
	import { TrendingDown, TrendingUp, Trophy } from 'lucide-svelte';
	let { name, isWeightGreaterThanZero, weightChange } = $props();
</script>

<section class="transform rounded-2xl bg-white p-6 shadow-xl transition-all hover:scale-[1.02]">
	<div class="mb-6 flex items-center justify-center">
		<Trophy class="mr-4 h-12 w-12 text-yellow-500" />
		<h2 class="text-3xl font-bold text-indigo-700">Top Achiever Spotlight</h2>
	</div>

	<div class="text-center">
		<h3 class="mb-4 text-2xl font-semibold text-green-600">
			🌟 {name} 🌟
		</h3>

		{#if isWeightGreaterThanZero}
			<div class="flex flex-col items-center">
				<div class="mb-4 flex items-center justify-center">
					<TrendingDown class="mr-2 h-8 w-8 text-green-500" />
					<p class="text-xl text-gray-700">
						Lost an incredible <span class="font-bold text-green-600">
							{weightChange.toFixed(2)} kg
						</span> this week! 🎉
					</p>
				</div>
				<LottieAnimation
					src={weightLottie}
					width={300}
					height={300}
					className="animate-customPop"
				/>
			</div>
		{:else}
			<div class="flex flex-col items-center">
				<TrendingUp class="h-8 w-8 text-red-500" />
				<p class="mt-2 text-xl text-gray-700">
					Gained <span class="font-bold text-red-600">
						{Math.abs(weightChange).toFixed(2)} kg
					</span> this week
				</p>
				<p class="text-md mt-2 text-gray-600">
					Every journey has its ups and downs. Keep going! 💪
				</p>
				<LottieAnimation
					src={weightLottie}
					width={300}
					height={300}
					className="mt-4 animate-customPop"
				/>
			</div>
		{/if}
	</div>
</section>
