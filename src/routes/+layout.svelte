<script lang="ts">
  import 'virtual:uno.css';
  import './layout.css';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href="/favicon.ico" />
  <title>Weather V3</title>
</svelte:head>
{@render children()}
