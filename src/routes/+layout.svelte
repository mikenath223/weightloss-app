<script lang="ts">
	import '../app.css';
	import Topnavbar from '$lib/components/layout/Topnavbar.svelte';
	let { children } = $props();
</script>

<Topnavbar />

<main class="font-body container max-w-screen-2xl p-10">
	{@render children()}
</main>
