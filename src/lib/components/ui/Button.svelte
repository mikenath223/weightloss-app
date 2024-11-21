<script lang="ts">
	let { onclick, className, children, ...restOfProps } = $props();
</script>

<button class="ml-auto md:hidden {className}" type="button" {onclick} {...restOfProps}>
	{@render children()}
</button>
