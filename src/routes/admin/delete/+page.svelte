<script lang="ts">
  import Title from "$lib/components/Title.svelte";
  import Button from "$lib/components/Button.svelte";
  import Input from "$lib/components/Input.svelte";
  import { superForm } from "$lib/form.client";
  import Back from "$lib/components/Back.svelte";

  export let data;
  const { form, delayed, enhance, errors, constraints } = superForm(data.form);
</script>

<Title />
<main>
  <form method="post" use:enhance>
    <Input
      type="text"
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
<Back />

<style lang="postcss">
</style>
