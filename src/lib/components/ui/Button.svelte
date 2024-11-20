<script lang="ts">
	let { className = '', children, ...restOfProps } = $props();
</script>

<button class={className} {...restOfProps}>
	{@render children()}
</button>
