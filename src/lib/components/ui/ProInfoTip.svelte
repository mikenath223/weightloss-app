<script>
	import { Trophy } from 'lucide-svelte';

	let { info } = $props();
</script>

<div class="rounded-r-lg border-l-4 border-yellow-500 bg-yellow-50 p-4">
	<div class="mb-2 flex items-center">
		<Trophy class="mr-2 h-6 w-6 text-yellow-600" />
		<h3 class="text-xl font-semibold text-yellow-800">Pro Tip</h3>
	</div>
	<p class="text-yellow-700">
		{info}
	</p>
</div>
