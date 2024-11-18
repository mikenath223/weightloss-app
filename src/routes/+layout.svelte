<script lang="ts">
	import '../app.css';
	import Topnavbar from '$lib/components/layout/Topnavbar.svelte';
	import { initializeStores, Modal, type ModalComponent } from '@skeletonlabs/skeleton';
	import ModalComponentOne from '$lib/components/modal/Modal.svelte';

	initializeStores();
	let { children } = $props();

	const modalRegistry: Record<string, ModalComponent> = {
		modalComponentOne: { ref: ModalComponentOne }
	};
</script>

<Topnavbar />
<Modal components={modalRegistry} />
<main class="container mx-auto max-w-screen-2xl p-5 font-body md:p-10">
	<section class="mb-10 mt-28 md:mx-6">
		{@render children()}
	</section>
</main>
