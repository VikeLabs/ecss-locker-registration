<script lang="ts">
	export let id: string;
	export let label: string;
	export let name: string;
	export let value: string = '';
	export let error: string = '';
</script>

<div class="text-input">
	<label for={id}>
		{label}
	</label>
	<input class:error type="text" {id} {name} required bind:value />
	{#if error}
		<span class="error-msg">* {error}</span>
	{/if}
</div>

<style lang="postcss">
	.text-input {
		width: 100%;
		max-width: theme(maxWidth.xs);
	}
	label {
		color: theme(colors.neutral.600);
		font-size: theme(fontSize.base);
		font-weight: theme(fontWeight.medium);
	}
	input {
		display: block;
		height: theme(space.10);
		width: 100%;
		margin: auto;
		margin-top: theme(space.1);
		padding: theme(padding[0.5]) theme(padding.2);
		box-sizing: border-box;
		border: 1px solid theme(colors.neutral.300);
		@apply rounded;
		background: theme(colors.neutral.50);
		color: theme(colors.neutral.700);
		font-size: theme(fontSize.base);
	}
	input.error {
		border-color: theme(colors.red.300);
	}
	.error-msg {
		color: theme(colors.red.600);
		font-size: theme(fontSize.sm);
		font-weight: theme(fontWeight.medium)
	}
</style>
