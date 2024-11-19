<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import AddWeightForm from '../form/AddWeightForm.svelte';
	import * as yup from 'yup';
	import LottieAnimation from '../ui/LottieAnimation.svelte';
	import weightLottie from '$lib/assets/lottie/male-weight-lift-lottie.json';

	const modalStore = getModalStore();

	const formData = $state({
		name: undefined,
		weight: undefined
	});
	let errors: Record<string, string> = $state({});

	const schema = yup.object().shape({
		name: yup.string().required('Name is required').max(256, 'Name must not exceed 256 characters'),
		weight: yup
			.number()
			.required('Weight is required')
			.min(1, 'Weight must be at least 1 kg')
			.max(1000, 'Weight must not exceed 1000 kg')
	});

	async function onFormSubmit(): Promise<void> {
		try {
			await schema.validate(formData, { abortEarly: false });
			errors = {};

			if ($modalStore[0].response) $modalStore[0].response(formData);
			modalStore.close();
		} catch (err) {
			errors = extractErrors(err);
		}
	}

	function extractErrors(err: any): Record<string, string> {
		return err.inner.reduce((acc: Record<string, string>, error: any) => {
			acc[error.path] = error.message;
			return acc;
		}, {});
	}

	const cBase = 'card bg-white w-full md:!max-w-3xl w-modal-slim shadow-xl space-y-4';
	const cHeader = 'text-xl font-bold';
	const cForm = 'py-4 space-y-4';
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
				<AddWeightForm
					bind:name={formData.name}
					bind:weight={formData.weight}
					errors={$state.snapshot(errors)}
					{cForm}
				/>
				<footer class="modal-footer flex justify-end space-x-2 py-5">
					<button class="variant-ghost-surface btn" onclick={() => modalStore.close()}>
						Cancel
					</button>
					<button class="variant-filled btn" onclick={onFormSubmit}> Submit </button>
				</footer>
			</div>
		</section>
	</div>
{/if}
