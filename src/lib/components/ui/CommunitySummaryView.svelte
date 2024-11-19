<script lang="ts">
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import WeeklyDataView from './WeeklyDataView.svelte';
	import NoDataView from './NoDataView.svelte';

	const modalStore = getModalStore();
	const modal: ModalSettings = {
		type: 'component',
		component: 'modalComponentOne'
	};

	let { data } = $props();

	const openAddProgressModal = () => {
		modalStore.trigger(modal);
	};
</script>

{#if data.weeklySummary.hasDataForCurrentWeek && !data.weeklySummary.hasNoUserWithPreviousData}
	<WeeklyDataView weeklyData={data.weeklySummary} />
{:else if data.weeklySummary.hasNoUserWithPreviousData}
	<NoDataView hasNoUserWithPreviousData={true} onAddProgress={openAddProgressModal} />
{:else if data.weeklySummary.hasPreviousData}
	<NoDataView currentWeekData={true} onAddProgress={openAddProgressModal} />
{:else}
	<NoDataView />
{/if}
