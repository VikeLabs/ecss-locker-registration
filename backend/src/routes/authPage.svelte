<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import TextInput from '$lib/components/TextInput.svelte';

	export let title: string;

	const logoSize = '6rem';
	const mainGap = '1.5rem';
</script>

<main
	style:--main-gap={mainGap}
	style:--logo-size={logoSize}
	class="w-full flex flex-col items-center justify-center gap-[var(--main-gap)] relative top-[calc((var(--logo-size)+var(--main-gap))/-3)]"
>
	<Logo size="6rem" />
	<h1 class="text-2xl font-bold text-center">{title}</h1>
	<form method="post">
		<TextInput label="Name or Club" id="name" name="name" />
		<TextInput label="Email" id="email" name="email" />
		<TextInput label="Locker Number" id="locker-number" name="locker-number" />
		<Button>Register</Button>
	</form>
	<div class="font-bold">
		Already have an account?
		<a href="./login" class="underline text-neutral-500">Log in.</a>
	</div>
</main>

<style lang="postcss">
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		gap: theme(space.5);
	}
</style>
