<script lang="ts">
	import celebrateEmoji from '$lib/assets/icons/party-popper.png';
	import MdiPlus from 'virtual:icons/mdi/plus';
	import MdiMenu from 'virtual:icons/mdi/menu';

	import { getCurrentWeekInfo } from '$lib/utils/dateUtils';
	import type { WeekInfo } from '$lib/types/dateUtils';

	let weekInfo: WeekInfo;

	weekInfo = getCurrentWeekInfo();
</script>

<nav class="bg-body-light-2 flex items-center justify-around px-5 py-3 drop-shadow">
	<div class="mr-auto w-full">
		<h4 class="h4 flex items-center gap-2 text-gray-500">
			<span>Week {weekInfo.weekNumber}</span>
			<span class="text-action font-body text-sm italic underline">{weekInfo.weekRange}</span>
		</h4>
		<h1 class="h2 flex gap-2 text-gray-800">
			<span>Welcome Dieters</span><img class="size-10" src={celebrateEmoji} alt="..." />
		</h1>
	</div>
	<div class="mr-auto hidden w-full items-center justify-around md:flex">
		<a class="text-grey-800 text-goal text-xl no-underline" href="/progress">Progress</a>
		<a class="text-grey-800 text-goal text-xl no-underline" href="/progress">Goals</a>
		<button type="button" class="btn variant-filled">
			<span><MdiPlus /></span>
			<span>Add Weight</span>
		</button>
	</div>
	<button class="ml-auto md:hidden" type="button">
		<MdiMenu class="size-6" />
	</button>
</nav>
