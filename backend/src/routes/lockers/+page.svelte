<script>
	import Menu from './Menu.svelte';

	const hardcodedLockers = [
		{ name: 'Malcolm Seyd', locker: '120' },
		{ name: 'VikeSec', locker: '144' }
	];
</script>

<main>
	<h1>Registered Lockers</h1>
	<Menu rows={hardcodedLockers} />
</main>

<style lang="postcss">
	main {
		@apply w-full max-w-sm;
		@apply flex flex-col items-center gap-2;
	}
	h1 {
		@apply text-2xl font-bold;
	}
</style>
