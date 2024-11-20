<script lang="ts">
	import type { PageData } from './$types';
	import PageHeaderView from '$lib/components/ui/PageHeaderView.svelte';
	import CommunitySummaryView from '$lib/components/ui/CommunitySummaryView.svelte';

	let { data }: { data: PageData } = $props();
</script>

<section class="flex flex-col items-center space-y-12 py-10 sm:px-6">
	<PageHeaderView
		title="🎉 Weekly Summary 🎉"
		subtitle={`Progress for ${data.weekInfo.weekRange}`}
	/>
	<CommunitySummaryView {data} />
</section>
