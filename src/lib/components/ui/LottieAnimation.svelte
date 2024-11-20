<script>
	import { browser } from '$app/environment';
	import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';
	import Loading from './Loading.svelte';

	let { src, height, width, className = '' } = $props();
</script>

<div class="flex min-h-56 items-center justify-center {className}">
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
	{:else}
		<Loading />
	{/if}
</div>
