<script lang="ts">
	import MdiPlus from 'virtual:icons/mdi/plus';
	import Button from './Button.svelte';

	let { onclick, className = '' } = $props();
</script>

<Button
	type="button"
	className="flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-white shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 {className}"
	{onclick}
>
	<MdiPlus class="size-5" />
	<span>Add Weight</span>
</Button>
