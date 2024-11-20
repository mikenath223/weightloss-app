<script lang="ts">
	import MdiPlus from 'virtual:icons/mdi/plus';
	import Button from './Button.svelte';

	let { onclick = () => {}, className = '' } = $props();
</script>

<Button type="button" className="variant-filled-secondary btn {className}" {onclick}>
	<MdiPlus class="size-5" />
	<span>Add Weight</span>
</Button>
