<script lang="ts">
  import Back from "$lib/components/Back.svelte";
  import Button from "$lib/components/Button.svelte";
  import TextInput from "$lib/components/TextInput.svelte";
</script>

<Back />
<main>
  <h1>Transfer locker</h1>
  <p>
    An email will be sent confirming the transfer. After one day the email will
    expire and it will have to be resent.
  </p>
  <form method="post">
    <TextInput label="Email" id="email" name="email" />
    <Button>Transfer</Button>
  </form>
</main>
