<script lang="ts">
  import { invalidate } from "$app/navigation";
  import type { PageData } from "./$types";
  import filterSVG from "./filter.svg";

  export let data: PageData;

  let checked: {
    [k: string]: boolean;
  } = Object.fromEntries(
    data.registration.map(({ locker }) => [locker, false])
  );

  $: checkedLockers = Object.entries(checked)
    .filter(([, checked]) => checked)
    .map(([locker]) => locker);

  let showStatusFilter = false;
  let statusFilter = {
    available: true,
    claimed: true,
    expired: true,
  };
  const statuses = [...Object.keys(statusFilter)] as Array<
    keyof typeof statusFilter
  >;

  $: filteredData = {
    registration: data.registration.filter((row) => statusFilter[row.status]),
  };

  function selectAll() {
    for (const locker of Object.keys(checked)) {
      checked[locker] = true;
    }
  }
  function deselectAll() {
    for (const locker of Object.keys(checked)) {
      checked[locker] = false;
    }
  }
  async function deleteLockers(lockers: string[]) {
    await fetch("/admin/api/lockers", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lockers),
    });
    invalidate("/admin/api/lockers");
    deselectAll();
  }
  async function renew(locker: string) {
    await fetch("admin/renew", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ locker }),
    });
    invalidate("/admin/api/lockers");
  }
</script>

<div class="scrollable">
  <h1 class="text-3xl p-2 font-semibold">Locker Registration Admin Panel</h1>
  <hr class="border-black" />
  <div class="p-2">
    {#if Object.values(checked).some((checked) => !checked)}
      <button on:click={selectAll}>Select all</button>
    {:else}
      <button on:click={deselectAll}>Deselect all</button>
    {/if}
    {#if Object.values(checked).some((checked) => checked)}
      <button on:click={() => deleteLockers(checkedLockers)}
        >Delete selected</button
      >
    {/if}
  </div>
  <table>
    <tr class="bg-neutral-200">
      <th />
      <th>Locker</th>
      <th class="relative">
        <button on:click={() => (showStatusFilter = !showStatusFilter)}>
          Status
          <img class="filter" alt="filter" src={filterSVG} />
        </button>
        <div
          class="absolute text-left left-0 right-0"
          class:hidden={!showStatusFilter}
        >
          <div
            class="relative bg-neutral-200 border border-black w-full p-1 top-1"
          >
            {#each statuses as status}
              <div>
                <input
                  type="checkbox"
                  bind:checked={statusFilter[status]}
                  value={status}
                />
                {status}
              </div>
            {/each}
          </div>
        </div>
      </th>
      <th>Name</th>
      <th>Email</th>
      <th>Expiry</th>
      <th />
    </tr>
    {#each filteredData.registration as { locker, status, name, user, expiry } (locker)}
      <tr class={status} class:checked={checked[locker]}>
        <td class="text-center">
          <div class="w-full h-full flex items-center justify-center">
            <input
              type="checkbox"
              bind:checked={checked[locker]}
              class="h-5 w-5"
            />
          </div>
        </td>
        <td>{locker}</td>
        <td>{status}</td>
        <td>{name}</td>
        <td>{user}</td>
        <td>{expiry?.toDateString() ?? null}</td>
        <td>
          {#if status === "available"}
            <a href="admin/register?locker={locker}"
              ><button>Register</button></a
            >
          {:else}
            <a href="admin/edit?locker={locker}"><button>Edit</button></a>
            <a href="admin/delete?locker={locker}"><button>Delete</button></a>
          {/if}
          {#if status === "expired"}
            <button on:click={() => renew(locker)}>Renew</button>
          {/if}
        </td>
      </tr>
    {/each}
  </table>
</div>

<style lang="postcss">
  .scrollable {
    overflow: scroll;
    position: absolute;
    inset: 0;
  }

  table {
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    position: relative;
  }
  th {
    border-top: 1px black solid;
    position: sticky;
    top: 0;
    @apply bg-neutral-200;
  }
  th,
  td {
    border: 1px black solid;
    border-right: none;
    @apply p-1;
  }
  td {
    border-top: none;
    @apply py-0.5;
  }
  tr.available {
  }
  tr.claimed {
    @apply bg-green-100;
  }
  tr.expired {
    @apply bg-red-100;
  }
  tr.checked {
    @apply bg-blue-100;
  }

  .filter {
    width: 1rem;
    height: 1rem;
    display: inline-block;
  }

  button {
    border: 1px theme(colors.neutral.500) solid;
    background: theme(colors.neutral.200);
    @apply px-2 rounded;
  }
  button:hover {
    background: theme(colors.neutral.300);
  }
</style>
