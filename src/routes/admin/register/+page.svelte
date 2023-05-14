<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import type { PageData } from './$types';
	import { superForm } from '$lib/form.client';
	import Back from '$lib/components/Back.svelte';
	import { dateProxy } from 'sveltekit-superforms/client';
	import DateInput from '$lib/components/DateInput.svelte';

	export let data: PageData;
	const { form, delayed, enhance, errors, constraints } = superForm(data.form);
	const expiryDate = dateProxy(form, 'expiry', { format: 'date' });
</script>

<Back />

<Title />
<main>
	<form method="post" use:enhance>
		<TextInput
			label="Name or Club"
			id="name"
			name="name"
			bind:value={$form.name}
			errors={$errors.name}
			{...$constraints.name}
		/>
		<TextInput
			label="Email"
			id="email"
			name="email"
			bind:value={$form.email}
			errors={$errors.email}
			{...$constraints.email}
		/>
		<TextInput
			label="Locker Number"
			id="locker"
			name="locker"
			bind:value={$form.locker}
			errors={$errors.locker}
			disabled
			{...$constraints.locker}
		/>
		<DateInput
			label="Expiry"
			id="expiry"
			name="expiry"
			bind:value={$expiryDate}
			errors={$errors.expiry}
			{...$constraints.locker}
		/>
		<Button loading={$delayed}>Register</Button>
	</form>
</main>

<style lang="postcss">
</style>
