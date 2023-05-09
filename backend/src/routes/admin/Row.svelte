<script lang="ts">
	export let status: 'claimed' | 'available' | 'expired';
	export let locker: string;
	export let name: string | null;
	export let user: string | null;
	export let expiry: Date | null;

	export let checked = false;
	let editing = false;
</script>

<tr class={status} class:checked>
	<td class="text-center">
		<div class="w-full h-full flex items-center justify-center">
			<input type="checkbox" bind:checked class="h-5 w-5" />
		</div>
	</td>
	<td>{locker}</td>
	<td>{status}</td>
	<td>{name}</td>
	<td>{user}</td>
	<td>{expiry?.toDateString() ?? null}</td>
	<td>
		{#if status === 'available'}
			<a href="admin/register?locker={locker}"><button>Register</button></a>
		{:else}
			<a href="admin/edit?locker={locker}"><button>Edit</button></a>
			<a href="admin/delete?locker={locker}"><button>Delete</button></a>
		{/if}
		{#if status === 'expired'}
			<button>Renew</button>
		{/if}
	</td>
</tr>

<style lang="postcss">
	tr.available {
	}
	tr.claimed {
		@apply bg-green-100;
	}
	tr.expired {
		@apply bg-red-100;
	}
	tr.checked {
		@apply bg-blue-100;
	}

	td,
	th {
		border: 1px black solid;
		border-top: none;
		border-right: none;
		@apply px-1 py-0.5;
	}
	.hide {
		display: none;
	}
	button {
		border: 1px theme(colors.neutral.500) solid;
		background: theme(colors.neutral.200);
		@apply px-2 rounded;
	}
	button:hover {
		background: theme(colors.neutral.300);
	}
</style>
