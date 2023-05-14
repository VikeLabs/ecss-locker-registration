<script lang="ts">
	export let msg: string;
</script>

<div>
	{msg}
</div>

<style lang="postcss">
	div {
		@apply p-3 w-full;
		@apply font-medium text-lg text-center;
		@apply border-2 rounded-lg;
		@apply border-green-200 bg-green-100 text-green-900;
	}
</style>
