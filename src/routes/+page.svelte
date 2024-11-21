<script lang="ts">
	import type { PageData } from './$types';
	import TopAchiever from '$lib/components/ui/TopAchiever.svelte';
	import GroupSummary from '$lib/components/ui/GroupSummary.svelte';
	import MotivationalMessage from '$lib/components/ui/MotivationalMessage.svelte';
	import LottieAnimation from '$lib/components/ui/LottieAnimation.svelte';
	import noDataLottie from '$lib/assets/lottie/no-data-available-lottie.json';
	import planksLottie from '$lib/assets/lottie/planks-exercise-lottie.json';
	import CardWData from '$lib/components/ui/CardWData.svelte';
	import AddWeightBtn from '$lib/components/ui/AddWeightBtn.svelte';
	import { getDrawerStore, getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	let { data }: { data: PageData } = $props();

	const drawerStore = getDrawerStore();

	const modal: ModalSettings = {
		type: 'component',
		component: 'modalComponentOne'
	};
	const modalStore = getModalStore();

	const onClickOpenModal = () => {
		drawerStore.close();
		modalStore.trigger(modal);
	};
</script>

<section class="flex flex-col items-center space-y-12 px-6 py-10">
	<header class="text-center">
		<h1 class="mb-10 text-2xl font-extrabold text-indigo-700 drop-shadow-md md:text-5xl">
			🎉 Weekly Summary 🎉
		</h1>
		<p class="mt-4 text-lg text-gray-800 md:text-2xl">
			Progress for <span class="font-bold text-indigo-600">{data.weekInfo.weekRange}</span>.
		</p>
	</header>
	{#if data.weeklySummary.hasDataForCurrentWeek}
		<p class="mt-2 text-xl text-gray-800 md:text-2xl">
			Let’s celebrate this week's achievements and stay motivated! 💪
		</p>
	{:else if data.weeklySummary.hasPreviousData}
		<div class="flex flex-col items-center">
			<h3 class="h3 mb-5 text-gray-800">
				No data submitted for this week yet!
				<span class="font-bold text-indigo-600">Why not add your progress?</span> 🚀
			</h3>
			<AddWeightBtn onclick={onClickOpenModal} />
			<LottieAnimation src={planksLottie} width={300} height={300} />
			<p class="text-md mt-50 text-gray-600">
				However last week’s progress is looking great. Let’s keep the streak alive! 🌟
			</p>
			<a
				href="/progress"
				class="variant-outline-secondary btn mt-5 rounded-lg text-indigo-600 hover:variant-filled-secondary"
				>View last week's Progress</a
			>
		</div>
	{:else}
		<section class="mt-10 flex flex-col items-center gap-6">
			<CardWData>
				<div class="flex flex-col items-center">
					<h3 class="h3 mt-5 text-gray-800">
						No data available yet! Start by adding progress data to see the magic unfold. 🎯
					</h3>
					<LottieAnimation src={noDataLottie} width={300} height={300} />
				</div>
			</CardWData>
		</section>
	{/if}

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
