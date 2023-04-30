<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import Button from '$lib/components/Button.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	export let form: ActionData;
	let lockerError: string | undefined;
	if (form?.lockerTaken) {
		lockerError = 'This locker is taken, please use another';
	}

	let loading = false;

	const logoSize = '6rem';
</script>

<Title />
<main style:--logo-size={logoSize}>
	<Logo size={logoSize} />
	<h1>Locker Registration</h1>
	<form
		method="post"
		use:enhance={() => {
			loading = true;
			return ({ update }) => {
				loading = false;
				update();
			};
		}}
	>
		<TextInput label="Name or Club" id="name" name="name" />
		<TextInput label="Email" id="email" name="email" />
		<TextInput label="Locker Number" id="locker" name="locker" error={lockerError} />
		<Button {loading}>Register</Button>
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
