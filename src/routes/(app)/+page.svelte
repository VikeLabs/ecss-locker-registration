<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import Button from '$lib/components/Button.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import type { PageData } from './$types';
	import { superForm } from '$lib/form.client';
	import Flash from '$lib/components/Flash.svelte';

	export let data: PageData;
	const { form, delayed, enhance, errors, constraints, message } = superForm(data.form);

	const logoSize = '6rem';
</script>

<Title />
<main style:--logo-size={logoSize}>
	<Logo size={logoSize} />
	<h1>Locker Registration</h1>
	{#if $message}
		<Flash {...$message} />
	{/if}
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
			{...$constraints.locker}
		/>
		<Button loading={$delayed}>Register</Button>
	</form>
	<footer>
		Already have an account?
		<a href="./login">Log in.</a>
	</footer>
</main>

<style lang="postcss">
	main {
		position: relative;
		top: calc((var(--logo-size) + var(--main-gap)) / -3);
	}
</style>
