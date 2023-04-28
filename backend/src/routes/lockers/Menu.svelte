<script lang="ts">
	import chevron from './chevron_right.svg';
	export let rows: Row[];

	type Row = {
		name: string;
		locker: string;
	};
</script>

<div class="wrapper">
	<table>
		{#each rows as row}
			<tr class="relative">
				<!-- stretch a link across the entire table row -->
				<!-- this works using "relative" inside "absolute inset-0" -->
				<a class="absolute inset-0" href="lockers/{row.locker}" />

				<td>{row.name}</td>
				<td>{row.locker}</td>
				<td>
					<img class="w-7 h-7 ml-auto" src={chevron} alt="Right chevron" />
				</td>
			</tr>
		{/each}
	</table>
</div>

<style lang="postcss">
	.wrapper {
		@apply w-full max-w-sm bg-neutral-50;
		@apply border border-neutral-300 rounded-lg;
		/* we round table by wrapping it in a rounded div and hiding overflow */
		@apply overflow-hidden box-border;
	}
	table {
		width: 100%;
		border-collapse: collapse;
	}
	tr {
		@apply text-lg hover:bg-neutral-200;
	}
	tr:last-child td {
		border-bottom: 0px;
	}
	td {
		@apply p-3;
		border-bottom: 1px solid theme(colors.neutral.300);
	}
</style>
