<script lang="ts">
	export let value: string = '';
	const base: string = 'ESS Locker Registration';
</script>

<svelte:head>
	{#if value}
		<title>{value} - {base}</title>
	{:else}
		<title>{base}</title>
	{/if}
</svelte:head>
