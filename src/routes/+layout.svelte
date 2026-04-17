<script lang="ts">
  import 'virtual:uno.css';
  import './layout.css';
  import { browser } from '$app/environment';
  import { baseLocale, isLocale, overwriteGetLocale, overwriteSetLocale } from '$lib/paraglide/runtime';

  const LOCALE_STORAGE_KEY = 'weather-locale';
  let activeLocale: 'en' | 'zh' = baseLocale;

  if (browser) {
    const cachedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (cachedLocale && isLocale(cachedLocale)) {
      activeLocale = cachedLocale as 'en' | 'zh';
    }

    overwriteGetLocale(() => activeLocale);
    overwriteSetLocale(nextLocale => {
      if (!isLocale(nextLocale)) {
        return;
      }

      activeLocale = nextLocale as 'en' | 'zh';
      localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
      document.documentElement.lang = nextLocale;
    });

    document.documentElement.lang = activeLocale;
  }

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href="/favicon.ico" />
  <title>Weather V3</title>
</svelte:head>
{@render children()}
