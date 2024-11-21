<script lang="ts">
	import { NAV_LINKS } from '$lib/constant/progressConstants';
	import Navlink from '../ui/Navlink.svelte';
	import MdiPlus from 'virtual:icons/mdi/plus';
	import MdiClose from 'virtual:icons/mdi/close';
	import { page } from '$app/stores';
	import { getDrawerStore, getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import Button from '../ui/Button.svelte';

	$: classesActive = (href: string) =>
		href === $page?.url?.pathname ? '!text-indigo-600 hover:!opacity-80' : 'opacity-80';

	const drawerStore = getDrawerStore();

	const modal: ModalSettings = {
		type: 'component',
		component: 'modalComponentOne'
	};
	const modalStore = getModalStore();
	const onClickOpenModal = () => {
		drawerStore.close();
		modalStore.trigger(modal);
	};
	const onClickCloseDrawer = () => {
		drawerStore.close();
	};
</script>

<div class="relative flex w-full flex-col items-center justify-around gap-10 pt-28">
	<Button
		className="ml-auto md:hidden absolute top-4 right-4"
		type="button"
		onclick={onClickCloseDrawer}
	>
		<MdiClose class="size-7" />
	</Button>
	{#each NAV_LINKS as { name, path }}
		<Navlink {classesActive} navLink={path} navText={name} onclick={onClickCloseDrawer} />
	{/each}
	<button type="button" class="variant-filled btn" onclick={onClickOpenModal}>
		<span><MdiPlus /></span>
		<span>Add Weight</span>
	</button>
</div>
