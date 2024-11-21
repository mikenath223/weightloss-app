<script lang="ts">
	import PageHeaderView from '../ui/PageHeaderView.svelte';

	let { title, subtitle, className = '', children } = $props();
</script>

<section class="min-h-screen py-10 md:px-6 {className}">
	<PageHeaderView {title} {subtitle} />
	{@render children()}
</section>
