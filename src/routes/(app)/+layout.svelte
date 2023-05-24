<script lang="ts">
  import "../../app.css";
  import "../../components.css";
</script>

<slot />

<style lang="postcss">
  :global(html, body) {
    font-family: "Roboto", system-ui, sans-serif;
    margin: 0;
    height: 100%;
  }

  :global(body) {
    background: theme(colors.neutral.100);
    color: theme(colors.neutral.800);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    padding: 1.5rem;
  }
</style>
