<script lang="ts">
	let { name = $bindable(), weight = $bindable(), errors, cForm } = $props();
</script>

<form class="modal-form {cForm}">
	<label class="label">
		<span>Name</span>
		<input
			class="input"
			maxlength="256"
			type="text"
			bind:value={name}
			placeholder="Enter name..."
		/>
		{#if errors.name}
			<div class="mt-1 text-sm text-red-600">{errors.name}</div>
		{/if}
	</label>
	<label class="label">
		<span>Weight</span>
		<input
			class="input"
			type="number"
			max="500"
			min="1"
			bind:value={weight}
			placeholder="Enter weight..."
		/>
		{#if errors.weight}
			<div class="mt-1 text-sm text-red-600">{errors.weight}</div>
		{/if}
	</label>
</form>
