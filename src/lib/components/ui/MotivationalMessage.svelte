<script lang="ts">
	let { name, message } = $props();
</script>

<div
	class="transform rounded-2xl bg-blue-50 p-6 shadow-md transition-all hover:-translate-y-2 hover:shadow-xl"
>
	<h4 class="mb-4 text-2xl font-bold text-blue-900">{name}</h4>
	<p class="text-gray-700">{message}</p>
</div>
