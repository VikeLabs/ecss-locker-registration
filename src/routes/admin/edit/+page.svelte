<script lang="ts">
  import Title from "$lib/components/Title.svelte";
  import Button from "$lib/components/Button.svelte";
  import Input from "$lib/components/Input.svelte";
  import type { PageData } from "./$types";
  import { superForm } from "$lib/form.client";
  import Back from "$lib/components/Back.svelte";
  import { dateProxy } from "sveltekit-superforms/client";

  export let data: PageData;
  const { form, delayed, enhance, errors, constraints } = superForm(data.form);
  const expiryDate = dateProxy(form, "expiry", { format: "date" });
</script>

<Back />

<Title />
<main>
  <form method="post" use:enhance>
    <Input
      type="text"
      label="Name or Club"
      id="name"
      name="name"
      bind:value={$form.name}
      errors={$errors.name}
      {...$constraints.name}
    />
    <Input
      type="text"
      label="Email"
      id="email"
      name="email"
      bind:value={$form.email}
      errors={$errors.email}
      {...$constraints.email}
    />
    <Input
      type="text"
      label="Locker Number"
      id="locker"
      name="locker"
      bind:value={$form.locker}
      errors={$errors.locker}
      {...$constraints.locker}
      disabled
    />
    <Input
      type="date"
      label="Expiry"
      id="expiry"
      name="expiry"
      bind:value={$expiryDate}
      errors={$errors.expiry}
      {...$constraints.locker}
    />
    <Button loading={$delayed}>Edit</Button>
  </form>
</main>

<style lang="postcss">
</style>
