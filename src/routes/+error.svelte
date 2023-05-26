<script lang="ts">
  import { page } from "$app/stores";
  import "../components.css";
</script>

<div
  class="m-0 box-border flex h-[100svh] w-full flex-col items-center justify-center gap-4 bg-neutral-100 p-6 font-sans text-neutral-800"
>
  <main class="max-w-sm">
    <h1 class="text-3xl font-bold">
      <span class="underline decoration-red-500 decoration-wavy"
        >{$page.status}</span
      >
      - {$page.error?.message}
    </h1>
    <p>
      Something went wrong. If you continue to see this error, please contact
      the ESS Director of IT.
    </p>
  </main>
</div>
