<script lang="ts">
	import type { PageData } from './$types';
	import Row from './Row.svelte';

	export let data: PageData;
</script>

<div class="scrollable">
	<table>
		<tr class="bg-neutral-200 z-10">
			<th />
			<th>Locker</th>
			<th>Status</th>
			<th>Name</th>
			<th>Email</th>
			<th>Expiry</th>
			<th />
		</tr>
		{#each data.registration as row (row.locker)}
			<Row {...row} />
		{/each}
	</table>
</div>

<style lang="postcss">
	:global(body) {
		display: block !important;
	}
	table {
		border-collapse: separate;
		border-spacing: 0;
		width: 100%;
		position: relative;
	}
	th {
		border: 1px black solid;
		border-top: none;
		border-right: none;
		padding: theme(space.1);
		position: sticky;
		top: 0;
		@apply bg-neutral-200;
	}
</style>
