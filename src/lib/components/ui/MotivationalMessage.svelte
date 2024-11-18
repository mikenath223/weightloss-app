<script lang="ts">
	let { name, message } = $props();
</script>

<div
	class="message-card rounded-lg bg-blue-50 p-6 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
>
	<h3 class="text-2xl font-bold text-blue-900">{name}</h3>
	<p class="mt-4 text-lg text-gray-800">{message}</p>
</div>
