<script lang="ts">
	import celebrateEmoji from '$lib/assets/icons/party-popper.png';
	import MdiMenu from 'virtual:icons/mdi/menu';
	import { getCurrentWeekInfo } from '$lib/utils/date';
	import { page } from '$app/stores';
	import Navlink from '../ui/Navlink.svelte';
	import type { DrawerSettings, ModalSettings } from '@skeletonlabs/skeleton';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { NAV_LINKS } from '$lib/constant/progressConstants';
	import Button from '../ui/Button.svelte';
	import AddWeightBtn from '../ui/AddWeightBtn.svelte';

	$: weekInfo = getCurrentWeekInfo();

	$: classesActive = (href: string) =>
		href === $page?.url?.pathname ? '!text-indigo-600 hover:!opacity-80' : 'opacity-80';

	const modal: ModalSettings = {
		type: 'component',
		component: 'modalComponentOne'
	};
	const drawerStore = getDrawerStore();

	const modalStore = getModalStore();

	const mobileMenuDrawer: DrawerSettings = {
		id: 'mobile-menu',
		width: 'w-[85%]',
		rounded: 'rounded-none',
		bgDrawer: 'bg-white',
		position: 'right'
	};

	const onClickOpenModal = () => {
		modalStore.trigger(modal);
	};
	const onClickOpenDrawer = () => {
		drawerStore.open(mobileMenuDrawer);
	};
</script>

<nav
	class="fixed top-0 z-10 flex w-full items-center justify-between bg-gradient-to-r from-pink-300 to-yellow-200 px-6 py-4 shadow-md"
>
	<div class="flex flex-col">
		<h4 class="h4 flex items-center gap-2 text-gray-700">
			<span class="text-sm font-bold text-indigo-600 sm:text-xl">Week {weekInfo.weekNumber}</span>
			<span class="text-sm italic text-gray-600 sm:text-xl">{weekInfo.weekRange}</span>
		</h4>
		<h1 class="flex items-center gap-2 text-lg font-extrabold text-gray-900 sm:text-2xl">
			<span>Welcome, Dieters!</span>
			<img class="size-8" src={celebrateEmoji} alt="Celebration Icon" />
		</h1>
	</div>

	<div class="hidden items-center gap-6 md:flex">
		{#each NAV_LINKS as { name, path }}
			<Navlink {classesActive} navLink={path} navText={name} />
		{/each}
		<AddWeightBtn onclick={onClickOpenModal} />
	</div>

	<Button
		className="md:hidden flex items-center gap-2 text-indigo-600"
		type="button"
		onclick={onClickOpenDrawer}
	>
		<MdiMenu class="size-6" />
	</Button>
</nav>
