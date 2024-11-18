<script lang="ts">
	import '../app.css';
	import Topnavbar from '$lib/components/layout/Topnavbar.svelte';
	let { children } = $props();
</script>

<Topnavbar />

<main class="font-body container mx-auto max-w-screen-2xl p-5 md:p-10">
	<section class="mb-10 mt-28 md:mx-6">
		{@render children()}
	</section>
</main>
