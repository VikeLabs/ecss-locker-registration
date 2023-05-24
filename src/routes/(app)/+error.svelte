<script lang="ts">
  import { page } from "$app/stores";
</script>

<main>
  <h1>
    An
    <span class="underline decoration-wavy decoration-red-500">error</span>
    occurred
  </h1>
  <p>{$page.error?.message}</p>
</main>
