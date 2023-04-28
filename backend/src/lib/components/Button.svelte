<script lang="ts">
	export let compact: boolean = false;
</script>

<button
	class:compact
	class:px-4={compact}
	class:py-2={compact}
	class:px-6={!compact}
	class:py-3={!compact}
	on:click
>
	<slot />
</button>

<style lang="postcss">
	button {
		padding: theme(space.3) theme(space.6);
		display: flex-inline;
		align-items: center;
		justify-content: center;
		border-color: transparent;
		border-radius: theme(borderRadius.lg);
		background-color: theme(colors.ess-orange);
		color: theme(colors.neutral.50);
		font-weight: theme(fontWeight.bold);
		font-size: theme(fontSize.sm);
	}
	button.compact {
		padding: theme(space.2) theme(space.4);
	}
	button:hover {
		cursor: pointer;
	}
</style>
