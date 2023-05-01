<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import Button from '$lib/components/Button.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	let loading = false;

	const logoSize = '6rem';
</script>

<Title value="Login" />
<main style:--logo-size={logoSize}>
	<Logo size="6rem" />
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
		<TextInput label="Email" id="email" name="email" />
		<Button {loading}>Login</Button>
	</form>
	<footer>
		Don't have a locker?
		<a href="./">Register</a>
	</footer>
</main>

<style lang="postcss">
	main {
		position: relative;
		top: calc((var(--logo-size) + var(--main-gap)) / -3);
	}
</style>
