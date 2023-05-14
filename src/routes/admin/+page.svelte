<script lang="ts">
	import type { PageData } from './$types';
	import Row from './Row.svelte';
	import filterSVG from './filter.svg';

	export let data: PageData;

	let checked: {
		[k: string]: boolean;
	} = {};

	let showStatusFilter = false;
	let statusFilter = {
		available: true,
		claimed: true,
		expired: true
	};
	const statuses = [...Object.keys(statusFilter)] as Array<keyof typeof statusFilter>;

	$: filteredData = {
		registration: data.registration.filter((row) => statusFilter[row.status])
	};
</script>

<div class="scrollable">
	<!-- <div>
		<div class="text-5xl font-extrabold">DEBUG</div>
		{JSON.stringify(
			Object.entries(checked)
				.filter(([, checked]) => checked)
				.map(([locker]) => locker)
		)}
	</div> -->
	<table>
		<tr class="bg-neutral-200">
			<th />
			<th>Locker</th>
			<th class="relative">
				<button on:click={() => (showStatusFilter = !showStatusFilter)}>
					Status
					<img class="filter" alt="filter" src={filterSVG} />
				</button>
				<div class="absolute text-left left-0 right-0" class:hidden={showStatusFilter}>
					<div class="relative bg-neutral-200 border border-black w-full p-1 top-1">
						{#each statuses as status}
							<div>
								<input type="checkbox" bind:checked={statusFilter[status]} value={status} />
								{status}
							</div>
						{/each}
					</div>
				</div>
			</th>
			<th>Name</th>
			<th>Email</th>
			<th>Expiry</th>
			<th />
		</tr>
		{#each filteredData.registration as row (row.locker)}
			<Row {...row} bind:checked={checked[row.locker]} />
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
	.filter {
		width: 1rem;
		height: 1rem;
		display: inline-block;
	}
</style>
