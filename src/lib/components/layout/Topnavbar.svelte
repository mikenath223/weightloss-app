<script lang="ts">
	import celebrateEmoji from '$lib/assets/icons/party-popper.png';
	import MdiPlus from 'virtual:icons/mdi/plus';
	import MdiMenu from 'virtual:icons/mdi/menu';

	import { getCurrentWeekInfo } from '$lib/utils/date';
	import { page } from '$app/stores';
	import Navlink from '../ui/Navlink.svelte';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { getModalStore } from '@skeletonlabs/skeleton';

	$: weekInfo = getCurrentWeekInfo();

	$: classesActive = (href: string) =>
		href === $page.url.pathname ? '!underline hover:!opacity-80' : 'opacity-80';

	const modal: ModalSettings = {
		type: 'component',
		component: 'modalComponentOne'
	};

	const modalStore = getModalStore();
	const onClickOpenModal = () => {
		modalStore.trigger(modal);
	};
</script>

<nav
	class="fixed top-0 z-10 flex w-full items-center justify-around bg-body-light-2 px-5 py-3 drop-shadow"
>
	<div class="mr-auto w-full">
		<h4 class="h4 flex items-center gap-2 text-gray-500">
			<span>Week {weekInfo.weekNumber}</span>
			<span class="font-body text-sm italic text-action underline">{weekInfo.weekRange}</span>
		</h4>
		<h1 class="h2 flex gap-2 text-gray-800">
			<span>Welcome Dieters</span><img class="size-10" src={celebrateEmoji} alt="..." />
		</h1>
	</div>
	<div class="mr-auto hidden w-full items-center justify-around md:flex">
		<Navlink {classesActive} navLink="/" navText="Home" />
		<Navlink {classesActive} navLink="/progress" navText="Progress" />
		<Navlink {classesActive} navLink="/goals" navText="Goals" />
		<button type="button" class="variant-filled btn" on:click={onClickOpenModal}>
			<span><MdiPlus /></span>
			<span>Add Weight</span>
		</button>
	</div>
	<button class="ml-auto md:hidden" type="button">
		<MdiMenu class="size-6" />
	</button>
</nav>
