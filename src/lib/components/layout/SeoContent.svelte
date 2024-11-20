<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.data.seo?.title || 'Weight Loss Tracker'}</title>
	<meta
		name="description"
		content={$page.data.seo?.description ||
			'Join the Weight Loss Tracker app and reach your fitness goals.'}
	/>
	<meta
		name="keywords"
		content={$page.data.seo?.keywords || 'fitness, weight loss, tracking, community'}
	/>
	<meta name="author" content={$page.data.seo?.author || 'Michgolden Ukeje'} />
	<meta property="og:title" content={$page.data.seo?.ogTitle || 'Weight Loss Tracker'} />
	<meta
		property="og:description"
		content={$page.data.seo?.ogDescription ||
			'Track and achieve your fitness goals with the community.'}
	/>
</svelte:head>
