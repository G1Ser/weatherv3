<script lang="ts">
  import { onMount } from 'svelte';
  import Header from '$lib/components/Header.svelte';
  import SettingsCard from '$lib/components/SettingsCard.svelte';
  import CityFavorites from '$lib/components/CityFavorites.svelte';
  import LocalWeather from '$lib/components/LocalWeather.svelte';
  import ForecastCard from '$lib/components/ForecastCard.svelte';
  import AirQuality from '$lib/components/AirQuality.svelte';
  import LifeIndices from '$lib/components/LifeIndices.svelte';
  import SunriseSunset from '$lib/components/SunriseSunset.svelte';
  import MoonPhase from '$lib/components/MoonPhase.svelte';
  import { getLocale } from '$lib/paraglide/runtime';
  import { weatherApi, type Lang, type Unit } from '$lib/api/weather';
  import type {
    AlertResponse,
    AirResponse,
    ForecastResponse,
    LifeIndicesResponse,
    LocationInfo,
    MoonAstronomyResponse,
    SunAstronomyResponse,
    WeatherNow,
  } from '$lib/api/weather';

  let showSettings = $state(false);
  let locale = $state<Lang>('en');
  let unit = $state<Unit>('m');
  let panel1Height = $state(106);
  const LOCALE_STORAGE_KEY = 'weather-locale';
  let panel1AnchorEl: HTMLDivElement | null = null;

  let locationInfo = $state<LocationInfo | null>(null);
  let nowData = $state<WeatherNow | null>(null);
  let forecastData = $state<ForecastResponse | null>(null);
  let airData = $state<AirResponse | null>(null);
  let indicesData = $state<LifeIndicesResponse | null>(null);
  let alertData = $state<AlertResponse | null>(null);
  let sunData = $state<SunAstronomyResponse | null>(null);
  let moonData = $state<MoonAstronomyResponse | null>(null);
  let favoriteCities = $state<
    Array<{
      name: string;
      weather: string;
      temp: string;
    }>
  >([]);

  function toggleSettings() {
    showSettings = !showSettings;
  }

  function resolveLocaleText(enValue: string, zhValue?: string) {
    if (locale === 'zh') {
      return zhValue || enValue;
    }
    return enValue;
  }

  function buildFavoriteCities() {
    const fallback = [
      { name: locale === 'zh' ? '上海' : 'Shanghai', weather: locale === 'zh' ? '晴' : 'Sunny', temp: '24' },
      { name: locale === 'zh' ? '新加坡' : 'Singapore', weather: locale === 'zh' ? '霾' : 'Haze', temp: '30' },
      { name: locale === 'zh' ? '温哥华' : 'Vancouver', weather: locale === 'zh' ? '多云' : 'Cloudy', temp: '16' },
    ];

    if (locationInfo) {
      fallback[0] = {
        name: resolveLocaleText(locationInfo.name, locationInfo.name_zh),
        weather: resolveLocaleText(nowData?.text || 'Sunny', nowData?.text_zh) || (locale === 'zh' ? '晴' : 'Sunny'),
        temp: nowData?.temp || '23',
      };
    }

    return fallback;
  }

  async function loadDashboardData() {
    const ipInfo = locationInfo ?? (await weatherApi.getIp());
    locationInfo = ipInfo;

    const query = {
      lon: ipInfo.lon,
      lat: ipInfo.lat,
      lang: locale,
      unit,
    };
    const astronomyDate = new Date().toISOString().slice(0, 10).replaceAll('-', '');

    const [nowRes, forecastRes, indicesRes, sunRes, moonRes, alertRes, airRes] = await Promise.all([
      weatherApi.getNow(query),
      weatherApi.getForecast(query),
      weatherApi.getIndices(query),
      weatherApi.getAstronomy({ ...query, astronomy: 'sun', date: astronomyDate }),
      weatherApi.getAstronomy({ ...query, astronomy: 'moon', date: astronomyDate }),
      weatherApi.getAlert(query),
      weatherApi.getAir(query),
    ]);

    nowData = nowRes.now;
    forecastData = forecastRes;
    indicesData = indicesRes;
    sunData = sunRes as SunAstronomyResponse;
    moonData = moonRes as MoonAstronomyResponse;
    alertData = alertRes;
    airData = airRes;
    favoriteCities = buildFavoriteCities();
  }

  function handleUnitChange(next: Unit) {
    if (next === unit) {
      return;
    }

    unit = next;
    localStorage.setItem('weather-unit', next);
    void loadDashboardData();
  }

  function handleLocaleChange(next: Lang) {
    if (next === locale) {
      return;
    }

    locale = next;
    localStorage.setItem(LOCALE_STORAGE_KEY, next);
    favoriteCities = buildFavoriteCities();
    void loadDashboardData();
  }

  onMount(() => {
    locale = getLocale() as Lang;
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);

    const cachedUnit = localStorage.getItem('weather-unit');
    if (cachedUnit === 'm' || cachedUnit === 'i') {
      unit = cachedUnit;
    }

    void loadDashboardData();

    const observer = new ResizeObserver(entries => {
      const [entry] = entries;
      if (!entry) {
        return;
      }
      panel1Height = Math.ceil(entry.contentRect.height);
    });

    if (panel1AnchorEl) {
      observer.observe(panel1AnchorEl);
      panel1Height = Math.ceil(panel1AnchorEl.getBoundingClientRect().height);
    }

    return () => observer.disconnect();
  });
</script>

<main class="page-container">
  <div class="weather-container" style={`--panel-1-height: ${panel1Height}px;`}>
    <div class="panel panel-1">
      <div class="settings-anchor" bind:this={panel1AnchorEl}>
        <Header onToggleSettings={toggleSettings} alertItem={alertData?.alerts?.[0]} {locale} />
        <SettingsCard
          visible={showSettings}
          {locale}
          {unit}
          onUnitChange={handleUnitChange}
          onLocaleChange={handleLocaleChange}
        />
      </div>
    </div>

    <div class="web-body">
      <div class="panel panel-2">
        <CityFavorites cities={favoriteCities} />
      </div>

      <div class="panel panel-3">
        <LocalWeather now={nowData} today={forecastData?.daily?.[0]} {locale} {unit} />
      </div>

      <div class="panel panel-4">
        <ForecastCard daily={forecastData?.daily || []} {locale} {unit} />
      </div>

      <div class="row-pair panel panel-5">
        <AirQuality air={airData} {locale} />
        <LifeIndices indices={indicesData?.daily || []} {locale} />
      </div>

      <div class="row-pair panel panel-6">
        <SunriseSunset sun={sunData} {locale} />
        <MoonPhase moon={moonData} {locale} />
      </div>
    </div>
  </div>
</main>

<style scoped>
  .page-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding: 24px;
  }

  .weather-container {
    --panel-1-top: 12px;
    --panel-gap: 8px;
    position: relative;
    width: 100%;
    max-width: 1366px;
    border-radius: var(--container-radius);
    background: var(--container-bg);
    background-image: var(--container-bg-gradient);
    border: 1px solid var(--container-border);
    box-shadow: var(--container-shadow);
    backdrop-filter: blur(24px);
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .web-body {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }

  .panel {
    animation: card-enter 420ms ease-out both;
  }

  .settings-anchor {
    position: relative;
    width: 100%;
  }

  .panel-1 {
    animation-delay: 40ms;
    position: sticky;
    top: var(--panel-1-top);
    z-index: 80;
    margin-bottom: 2px;
  }

  .panel-2 {
    animation-delay: 80ms;
    position: sticky;
    top: calc(var(--panel-1-top) + var(--panel-1-height) + var(--panel-gap));
    z-index: 72;
    margin-bottom: 2px;
  }

  .panel-3 {
    animation-delay: 120ms;
  }

  .panel-4 {
    animation-delay: 160ms;
  }

  .panel-5 {
    animation-delay: 200ms;
  }

  .panel-6 {
    animation-delay: 240ms;
  }

  .row-pair {
    display: flex;
    gap: 14px;
    width: 100%;
  }

  .row-pair > :global(*) {
    flex: 1;
    min-width: 0;
  }

  @keyframes card-enter {
    from {
      opacity: 0;
      transform: translateY(10px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 1024px) {
    .page-container {
      padding: 14px;
    }

    .weather-container {
      padding: 18px;
      gap: 14px;
    }
  }

  @media (max-width: 480px) {
    .page-container {
      padding: 10px;
    }

    .weather-container {
      --panel-1-top: 8px;
      --panel-gap: 6px;
      border-radius: 42px;
      padding: 18px 16px;
      gap: 12px;
    }

    .web-body {
      gap: 10px;
    }

    .row-pair {
      flex-direction: column;
      gap: 10px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .panel {
      animation: none;
    }
  }
</style>
