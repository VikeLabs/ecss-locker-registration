<script lang="ts">
	import '../auth.css';

	import Title from '$lib/components/Title.svelte';
	import Button from '$lib/components/Button.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import TextInput from '$lib/components/TextInput.svelte';

	const logoSize = '6rem';
	const mainGap = '1.5rem';
</script>

<Title value="Login" />
<main style:--main-gap={mainGap} style:--logo-size={logoSize}>
	<Logo size="6rem" />
	<h1>Locker Registration</h1>
	<form method="post">
		<TextInput label="Email" id="email" name="email" />
		<Button>Login</Button>
	</form>
	<footer>
		Don't have a locker?
		<a href="./">Register</a>
	</footer>
</main>
