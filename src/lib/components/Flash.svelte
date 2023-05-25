<script lang="ts">
  import ErrorIcon from "./icons/Error.svelte";
  import Info from "./icons/Info.svelte";
  import Success from "./icons/Success.svelte";
  import Warning from "./icons/Warning.svelte";

  export let msg: string;
  export let type: "info" | "success" | "warning" | "error" = "info";

  const iconClass = "w-6 h-6 inline";
</script>

<div class="container {type}">
  {#if type === "info"}
    <Info class={iconClass} />
  {:else if type === "success"}
    <Success class={iconClass} />
  {:else if type === "warning"}
    <Warning class={iconClass} />
  {:else if type === "error"}
    <ErrorIcon class={iconClass} />
  {/if}
  {msg}
</div>

<style lang="postcss">
  .container {
    @apply w-full p-3;
    @apply text-left text-base;
    @apply rounded-lg border;
    @apply flex items-center justify-start gap-3;
  }
  .info {
    @apply border-sky-300 bg-sky-100 text-sky-900;
  }
  .success {
    @apply border-green-300 bg-green-100 text-green-900;
  }
  .warning {
    @apply border-yellow-300 bg-yellow-100 text-yellow-900;
  }
  .error {
    @apply border-red-300 bg-red-100 text-red-900;
  }
</style>
