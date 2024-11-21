<script lang="ts">
	import type { PageData } from './$types';
	import CommunitySummaryView from '$lib/components/ui/CommunitySummaryView.svelte';
	import PageLayout from '$lib/components/layout/PageLayout.svelte';

	let { data }: { data: PageData } = $props();
</script>

<PageLayout
	title="🎉 Weekly Summary 🎉"
	subtitle={`Progress for ${data.weekInfo.weekRange}`}
	className="space-y-12"
>
	<CommunitySummaryView {data} />
</PageLayout>
