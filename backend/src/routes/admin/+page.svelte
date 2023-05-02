<script lang="ts">
	import type { PageData } from './$types';
	import Row from './Row.svelte';

	export let data: PageData;
</script>

<div class="scrollable">
	<table>
		<tr class="bg-neutral-200">
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
	.scrollable {
		overflow: scroll;
		position: absolute;
		inset: 0;
	}
	table {
		border-collapse: collapse;
		width: 100%;
	}
	th {
		border: 1px black solid;
		padding: theme(space.1);
		position: sticky;
	}
</style>
