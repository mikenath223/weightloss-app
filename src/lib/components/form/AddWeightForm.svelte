<script lang="ts">
	import { handleSubmit } from '$lib/utils/firebase/addData';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import * as yup from 'yup';
	import Loading from '../ui/Loading.svelte';

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	const formData = $state({
		name: undefined,
		weight: undefined
	});
	let errors: Record<string, string> = $state({});
	let isSubmitting = $state(false);

	const schema = yup.object().shape({
		name: yup.string().required('Name is required').max(256, 'Name must not exceed 256 characters'),
		weight: yup
			.number()
			.nullable()
			.min(1, 'Weight must be at least 1 kg')
			.max(1000, 'Weight must not exceed 1000 kg')
	});

	function extractErrors(err: any): Record<string, string> {
		return err.inner.reduce((acc: Record<string, string>, error: any) => {
			acc[error.path] = error.message;
			return acc;
		}, {});
	}

	async function onFormSubmit(): Promise<void> {
		try {
			await schema.validate(formData, { abortEarly: false });
			errors = {};
			isSubmitting = true;
			await handleSubmit(formData.name ?? '', toastStore, formData.weight);
			isSubmitting = false;
			if ($modalStore[0].response) $modalStore[0].response(formData);
			modalStore.close();
		} catch (err) {
			errors = extractErrors(err);
		}
	}

	const cForm = 'py-4 space-y-4';
</script>

<form class="modal-form {cForm}" onsubmit={onFormSubmit}>
	<label class="label">
		<span>Name</span>
		<input
			class="input"
			maxlength="256"
			type="text"
			required
			bind:value={formData.name}
			placeholder="Enter name..."
		/>
		{#if errors.name}
			<div class="mt-1 text-sm text-red-600">{errors.name}</div>
		{/if}
	</label>
	<label class="label">
		<span>Weight(kg)</span>
		<input
			class="input"
			type="number"
			max="1000"
			min="1"
			required={false}
			bind:value={formData.weight}
			placeholder="Enter weight..."
		/>
		{#if errors.weight}
			<div class="mt-1 text-sm text-red-600">{errors.weight}</div>
		{/if}
	</label>
	<footer class="modal-footer !mt-10 flex justify-end space-x-4 py-5">
		<button class="variant-ghost-surface btn" type="button" onclick={() => modalStore.close()}>
			Cancel
		</button>
		<button class="variant-filled-secondary btn" type="submit" disabled={isSubmitting}>
			Submit
			{#if isSubmitting}
				<Loading />
			{/if}
		</button>
	</footer>
</form>
