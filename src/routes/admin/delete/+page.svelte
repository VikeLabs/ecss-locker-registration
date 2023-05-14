<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import type { PageData } from './$types';
	import { superForm } from '$lib/form.client';
	import Back from '$lib/components/Back.svelte';

	export let data: PageData;
	const { form, delayed, enhance, errors, constraints } = superForm(data.form);
</script>

<Back />

<Title />
<main>
	<form method="post" use:enhance>
		<TextInput
			label="Locker Number"
			id="locker"
			name="locker"
			bind:value={$form.locker}
			errors={$errors.locker}
			disabled
			{...$constraints.locker}
		/>
		<Button loading={$delayed}>Delete</Button>
	</form>
</main>

<style lang="postcss">
</style>
