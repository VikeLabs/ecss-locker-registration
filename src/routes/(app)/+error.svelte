<script lang="ts">
  import { page } from "$app/stores";
</script>

<main>
  <h1>
    An
    <span class="underline decoration-red-500 decoration-wavy">error</span>
    occurred
  </h1>
  <p>{$page.error?.message}</p>
</main>
