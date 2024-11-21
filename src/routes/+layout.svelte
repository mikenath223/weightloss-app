<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';
	import Topnavbar from '$lib/components/layout/Topnavbar.svelte';
	import {
		Drawer,
		getDrawerStore,
		initializeStores,
		Modal,
		Toast,
		type ModalComponent
	} from '@skeletonlabs/skeleton';
	import ModalComponentOne from '$lib/components/modal/Modal.svelte';
	import Loading from '$lib/components/ui/Loading.svelte';
	import MobileMenuDrawer from '$lib/components/modal/MobileMenuDrawer.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	initializeStores();

	let { children, data }: { children: () => any; data: LayoutData } = $props();

	let drawerStore = getDrawerStore();

	const modalRegistry: Record<string, ModalComponent> = {
		modalComponentOne: { ref: ModalComponentOne }
	};
</script>

<Topnavbar />
<Toast position="t" />
<Modal components={modalRegistry} />
<Drawer>
	{#if $drawerStore.id === 'mobile-menu'}
		<MobileMenuDrawer />
	{/if}
</Drawer>
<main class="container mx-auto min-h-screen max-w-screen-2xl p-5 !pb-24 font-body md:p-10">
	<section class="mb-10 mt-28 md:mx-6">
		{@render children()}
		{#if data.isLoading}
			<div class="flex min-h-96 items-center justify-center gap-3">
				<h4 class="h4 text-center italic">Loading</h4>
				<Loading />
			</div>
		{/if}
	</section>
	<Footer />
</main>
