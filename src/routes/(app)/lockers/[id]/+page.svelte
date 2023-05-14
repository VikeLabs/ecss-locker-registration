<script lang="ts">
	import { enhance } from '$app/forms';
	import Back from '$lib/components/Back.svelte';
	import Button from '$lib/components/Button.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let renewLoading = false;
</script>

<Back />
<main>
	<h1>Locker {data.locker}</h1>
	<div>
		<p><b>Register for</b>: {data.name}</p>
		<p>
			<b>Status</b>:
			{#if data.status === 'claimed'}
				<span class="status green">Claimed</span>
			{:else if data.status === 'expired'}
				<span class="status red">Expired</span>
			{/if}
		</p>
	</div>
	<div class="buttons">
		{#if data.status === 'expired'}
			<form
				action="?/renew"
				method="post"
				use:enhance={() => {
					renewLoading = true;
					return ({ update }) => {
						renewLoading = false;
						update();
					};
				}}
			>
				<Button loading={renewLoading}>Renew registration</Button>
			</form>
		{/if}
		<a href="{data.locker}/transfer"><Button>Transfer to a different email</Button></a>
		<a href="{data.locker}/deregister"><Button>Deregister locker</Button></a>
	</div>
</main>

<style lang="postcss">
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
	.buttons {
		@apply flex flex-col gap-2 items-center;
	}
</style>
