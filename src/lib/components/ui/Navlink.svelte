<script lang="ts">
	let { classesActive, navLink, navText } = $props();
</script>

<a
	class="text-grey-800 text-goal text-xl no-underline {classesActive(navLink)} hover:opacity-100"
	href={navLink}
>
	{navText}
</a>
