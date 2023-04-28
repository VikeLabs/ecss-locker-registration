<script lang="ts">
	import Back from '$lib/components/Back.svelte';
	import Button from '$lib/components/Button.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Back />
<main>
	<h1>Locker {data.locker}</h1>
	<p><b>Register for</b>: {data.name}</p>
	<p>
		<b>Status</b>:
		{#if data.status === 'available'}
			<span class="status grey">Available</span>
		{:else if data.status === 'claimed'}
			<span class="status green">Claimed</span>
		{:else if data.status === 'expired'}
			<span class="status red">Expired</span>
		{/if}
	</p>
	<hr class="w-full border-0 my-2" />
	{#if data.status === 'expired'}
		<a href="{data.locker}/renew"><Button>Renew registration</Button></a>
	{/if}
	<a href="{data.locker}/transfer"><Button>Transfer to a different email</Button></a>
	<a href="{data.locker}/deregister"><Button>Deregister locker</Button></a>
</main>

<style lang="postcss">
	main {
		@apply w-full max-w-sm;
		@apply flex flex-col items-center gap-2;
	}
	h1 {
		@apply text-2xl font-bold;
	}
	.status {
		@apply font-bold text-sm p-1 rounded;
	}
	.grey {
		@apply text-neutral-800 bg-neutral-200;
	}
	.green {
		@apply text-green-800 bg-green-200;
	}
	.red {
		@apply text-red-800 bg-red-200;
	}
</style>
