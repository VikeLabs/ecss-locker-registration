<script lang="ts">
  import Menu from "./Menu.svelte";
  import Button from "$lib/components/Button.svelte";
  import { enhance } from "$app/forms";

  export let data;

  let logoutLoading = false;
</script>

<main>
  <h1>Registered Lockers</h1>
  <Menu rows={data.locker} />
  <form
    method="post"
    action="?/logout"
    use:enhance={() => {
      logoutLoading = true;
      return ({ update }) => {
        logoutLoading = false;
        update();
      };
    }}
  >
    <Button loading={logoutLoading}>Logout</Button>
  </form>
</main>
