<script lang="ts">
	let { title, subtitle } = $props();
</script>

<header class="mb-16 text-center md:mb-28">
	<h1 class="mb-10 text-2xl font-extrabold text-indigo-700 drop-shadow-md md:text-5xl">
		{title}
	</h1>
	<p class="mt-4 text-lg text-gray-800 md:text-2xl">
		{subtitle}
	</p>
</header>
