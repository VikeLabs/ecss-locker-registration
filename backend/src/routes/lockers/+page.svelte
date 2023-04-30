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