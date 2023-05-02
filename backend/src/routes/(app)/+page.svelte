<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import Button from '$lib/components/Button.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import type { PageData } from './$types';
	import { superForm } from '$lib/form.client';

	export let data: PageData;
	const { form, delayed, enhance, errors, constraints, message } = superForm(data.form);
	$: console.log($errors);

	const logoSize = '6rem';
</script>

<Title />
<main style:--logo-size={logoSize}>
	<Logo size={logoSize} />
	<h1>Locker Registration</h1>
	{#if $message}
		<!-- TODO fancier flash component -->
		<p
			class="font-bold text-xl border-2 rounded-lg p-2 border-green-200 bg-green-100 text-green-900"
		>
			{$message.msg}
		</p>
	{/if}
	<form method="post" use:enhance>
		<!-- <form method="post" use:enhance> -->
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
