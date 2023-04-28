<script lang="ts">
	import './user.css';
	import Title from '$lib/components/Title.svelte';
	import Button from '$lib/components/Button.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import TextInput from '$lib/components/TextInput.svelte';

	const logoSize = '6rem';
	const mainGap = '1.5rem';
</script>

<Title />
<main style:--main-gap={mainGap} style:--logo-size={logoSize}>
	<Logo size="6rem" />
	<h1>Locker Registration</h1>
	<form method="post">
		<TextInput label="Name or Club" id="name" name="name" />
		<TextInput label="Email" id="email" name="email" />
		<TextInput label="Locker Number" id="locker-number" name="locker-number" />
		<Button>Register</Button>
	</form>
	<footer>
		Already have an account?
		<a href="./login">Log in.</a>
	</footer>
</main>
