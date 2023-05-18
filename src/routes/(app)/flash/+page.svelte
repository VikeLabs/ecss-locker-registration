<script lang="ts">
  import Back from "$lib/components/Back.svelte";
  import Flash from "$lib/components/Flash.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<main>
  <Flash {...data} />
</main>
<Back />
