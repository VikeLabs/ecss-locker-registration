<script lang="ts">
	import Back from '$lib/components/Back.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<Back />
<main>
	<p class="font-medium text-xl">{data.msg}</p>
</main>
