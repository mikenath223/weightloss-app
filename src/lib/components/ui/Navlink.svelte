<script lang="ts">
	let { classesActive, navLink, navText, onclick = () => {} } = $props();
</script>

<a
	class="text-grey-800 text-xl text-goal no-underline {classesActive(navLink)} hover:opacity-100"
	href={navLink}
	onclick={() => onclick()}
>
	{navText}
</a>
