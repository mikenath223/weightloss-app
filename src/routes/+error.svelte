<script lang="ts">
	import { goto } from '$app/navigation';
	import LottieAnimation from '$lib/components/ui/LottieAnimation.svelte';
	import errorLottie from '$lib/assets/lottie/error-lottie.json';

	const handleReload = () => {
		goto('/', { invalidateAll: true });
	};
</script>

<main class="mt-40 flex flex-col items-center justify-center gap-8 text-center text-gray-800">
	<h2 class="h2 my-4 text-center">Something went wrong. Please try again.</h2>
	<LottieAnimation src={errorLottie} height={300} width={300} />
	<button class="variant-filled-secondary btn mt-6" onclick={handleReload}> Go Home </button>
</main>
