<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import AddWeightForm from '../form/AddWeightForm.svelte';
	import LottieAnimation from '../ui/LottieAnimation.svelte';
	import weightLottie from '$lib/assets/lottie/male-weight-lift-lottie.json';

	const modalStore = getModalStore();

	const cBase = 'card bg-white w-full md:!max-w-3xl w-modal-slim shadow-xl space-y-4';
	const cHeader = 'text-xl font-bold';
</script>

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<section class="flex items-stretch gap-5">
			<div class="hidden items-center rounded-s-lg bg-body-light-1 md:flex">
				<LottieAnimation src={weightLottie} width={350} height={350} />
			</div>
			<div class="space-y-4 px-10 py-10 md:px-0 md:pl-5 md:pr-16">
				<header class={cHeader}>Add Dieter's Weight</header>
				<article>Want to add a new weight? Sure, go right ahead!</article>
				<AddWeightForm />
			</div>
		</section>
	</div>
{/if}
