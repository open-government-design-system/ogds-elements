<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount } from "svelte";

  // The components register themselves as custom elements, which only works in
  // the browser, so import them after the component mounts rather than at the
  // top level, where SvelteKit would also run the import during SSR.
  onMount(async () => {
    await import("@ogds/elements");
  });
</script>

<!-- Add the banner tag to your page or Svelte component -->
<ogds-banner></ogds-banner>
<h1>Welcome to SvelteKit</h1>

<style>
  /**
   * With the banner, it helps to add a min-height so it doesn't cause a layout
   * shift when the JavaScript is loaded to define the custom element above.
   */
  ogds-banner:not(:defined) {
    min-height: 1.375rem;
  }
</style>
