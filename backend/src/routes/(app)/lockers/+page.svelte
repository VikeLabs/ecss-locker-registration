<script lang="ts">
	import Menu from './Menu.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	// const hardcodedLockers = [
	// 	{ name: 'Malcolm Seyd', locker: '120' },
	// 	{ name: 'VikeSec', locker: '144' }
	// ];
</script>

<main>
	<h1>Registered Lockers</h1>
	<Menu rows={data.locker} />
</main>
