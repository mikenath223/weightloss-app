<script lang="ts">
	import LottieAnimation from '$lib/components/ui/LottieAnimation.svelte';
	import AddWeightBtn from '$lib/components/ui/AddWeightBtn.svelte';
	import { Trophy, ChartSpline, Target } from 'lucide-svelte';
	import planksLottie from '$lib/assets/lottie/planks-exercise-lottie.json';
	import ProInfoTip from './ProInfoTip.svelte';
	import Button from './Button.svelte';

	let {
		onAddProgress = () => {},
		currentWeekData = false,
		hasNoUserWithPreviousData = false
	} = $props();
</script>

<div class="container mx-auto">
	<div
		class="mx-auto max-w-3xl rounded-2xl border bg-gradient-to-br from-substrate to-body-light-1 shadow-lg"
	>
		<div class="flex flex-col-reverse gap-3 p-4 md:grid md:grid-cols-2 md:p-8 lg:p-12">
			<div class="flex flex-col space-y-6 text-center md:text-left">
				{#if currentWeekData && !hasNoUserWithPreviousData}
					<div class="border-l-4 border-green-500 bg-green-50 p-3">
						<div class="flex items-center space-x-2">
							<Trophy class="text-green-600" />
							<h3 class="text-base font-semibold text-green-800">Great Start This Week!</h3>
						</div>
						<p class="mt-1 text-sm text-green-700">
							You've made your first progress entries. Keep tracking to see your transformation!
						</p>
					</div>
				{/if}

				<h2 class="mb-2 text-2xl font-bold text-indigo-800 md:text-3xl">
					{hasNoUserWithPreviousData
						? 'Welcome to Your Fitness Journey!'
						: "You're Making Progress!"}
				</h2>

				<p class="mb-4 text-sm text-gray-600 md:text-base">
					{hasNoUserWithPreviousData
						? 'Start tracking your weight and fitness progress. Every entry is a step towards your goals!'
						: "You've started tracking. Now let's build a complete picture of your fitness journey."}
				</p>

				<div class="flex flex-col items-center justify-center gap-3 sm:flex-row md:justify-start">
					<AddWeightBtn onclick={onAddProgress} />
					<Button className="variant-outline-secondary btn">
						<a class="flex items-center gap-2" href="/progress">
							<ChartSpline size={20} />
							<span>View Progress</span>
						</a>
					</Button>
				</div>

				{#if hasNoUserWithPreviousData}
					<ProInfoTip
						info="Consistent tracking is key. Log your weight at the same time each week for accurate
    results."
					/>
				{/if}
			</div>

			<div class="flex flex-col items-center space-y-4">
				<LottieAnimation
					src={planksLottie}
					width={250}
					height={250}
					className="w-full max-w-[350px]"
				/>
				<div class="flex items-center space-x-2 rounded-full bg-white/50 px-3 py-1">
					<Target class="h-4 w-4 text-indigo-600" />
					<span class="text-xs text-gray-700"> Your Fitness Journey Begins </span>
				</div>
			</div>
		</div>
	</div>
</div>
