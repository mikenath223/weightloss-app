<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';
	import Topnavbar from '$lib/components/layout/Topnavbar.svelte';
	import {
		Drawer,
		initializeStores,
		Modal,
		Toast,
		type ModalComponent
	} from '@skeletonlabs/skeleton';
	import ModalComponentOne from '$lib/components/modal/Modal.svelte';
	import Loading from '$lib/components/ui/Loading.svelte';

	initializeStores();

	let { children, data }: { children: () => any; data: LayoutData } = $props();

	const modalRegistry: Record<string, ModalComponent> = {
		modalComponentOne: { ref: ModalComponentOne }
	};
</script>

<Topnavbar />
<Toast position="t" />
<Modal components={modalRegistry} />
<Drawer />
<main class="container mx-auto max-w-screen-2xl p-5 font-body md:p-10">
	<section class="mb-10 mt-28 md:mx-6">
		{@render children()}
		{#if data.isLoading}
			<div class="flex min-h-96 items-center justify-center gap-3">
				<h4 class="h4 text-center italic">Loading</h4>
				<Loading />
			</div>
		{/if}
	</section>
</main>
