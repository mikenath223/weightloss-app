<script lang="ts">
	let { children } = $props();
</script>

<div class="card card-hover w-auto max-w-3xl bg-white p-4">
	{@render children()}
</div>
