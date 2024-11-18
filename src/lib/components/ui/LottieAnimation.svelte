<script>
	import { browser } from '$app/environment';
	import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';
	let { src, height, width } = $props();
</script>

{#if browser}
	<LottiePlayer
		{src}
		autoplay={true}
		loop={true}
		controls={false}
		renderer="svg"
		background="transparent"
		{height}
		{width}
	/>
{/if}
