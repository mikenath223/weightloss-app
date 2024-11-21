<script lang="ts">
	import type { PageData } from './$types';
	import TopAchiever from '$lib/components/ui/TopAchiever.svelte';
	import GroupSummary from '$lib/components/ui/GroupSummary.svelte';
	import MotivationalMessage from '$lib/components/ui/MotivationalMessage.svelte';
	import LottieAnimation from '$lib/components/ui/LottieAnimation.svelte';
	import noDataLottie from '$lib/assets/lottie/no-data-available-lottie.json';
	import CardWData from '$lib/components/ui/CardWData.svelte';

	let { data }: { data: PageData } = $props();
</script>

<section class="flex min-h-screen flex-col items-center justify-between space-y-12 px-6 py-10">
	<header class="text-center">
		<h1 class="text-2xl font-extrabold text-indigo-700 drop-shadow-md md:text-5xl">
			🎉 Weekly Summary 🎉
		</h1>
		<p class="mt-4 text-lg text-gray-800 md:text-2xl">
			Progress for <span class="font-bold text-indigo-600">{data.weekInfo.weekRange}</span>.
		</p>
		{#if data.weeklySummary.hasDataForCurrentWeek}
			<p class="mt-2 text-xl text-gray-800 md:text-2xl">
				Let’s celebrate achievements and stay motivated! 💪
			</p>
		{:else}
			<section class="mt-10 flex flex-col items-center gap-6">
				<CardWData>
					<div class="flex flex-col items-center">
						<h3 class="h3 mt-5 text-gray-800">
							No data for this week yet! Add your progress and let's see the magic! 🚀
						</h3>
						<LottieAnimation src={noDataLottie} width={300} height={300} />
					</div>
				</CardWData>
			</section>
		{/if}
	</header>

	{#if data.weeklySummary.hasDataForCurrentWeek}
		<section class="space-y-8">
			<TopAchiever
				name={data.weeklySummary.topAchiever.name}
				isWeightGreaterThanZero={data.weeklySummary.topAchiever.weightChange > 0}
				weightChange={data.weeklySummary.topAchiever.weightChange.toFixed(2)}
			/>

			<GroupSummary
				isWeightGreaterThanZero={data.weeklySummary.totalWeightLoss > 0}
				weightLoss={data.weeklySummary.totalWeightLoss.toFixed(2)}
			/>

			<section class="motivational-messages grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each data.weeklySummary.messages as { name, message }}
					<MotivationalMessage {name} {message} />
				{/each}
			</section>
		</section>
	{/if}
</section>
