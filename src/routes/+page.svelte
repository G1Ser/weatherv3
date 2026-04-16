<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import SettingsCard from '$lib/components/SettingsCard.svelte';
  import CityFavorites from '$lib/components/CityFavorites.svelte';
  import LocalWeather from '$lib/components/LocalWeather.svelte';
  import ForecastCard from '$lib/components/ForecastCard.svelte';
  import AirQuality from '$lib/components/AirQuality.svelte';
  import LifeIndices from '$lib/components/LifeIndices.svelte';
  import SunriseSunset from '$lib/components/SunriseSunset.svelte';
  import MoonPhase from '$lib/components/MoonPhase.svelte';

  let showSettings = $state(false);

  function toggleSettings() {
    showSettings = !showSettings;
  }
</script>

<main class="page-container">
  <div class="weather-container">
    <!-- Header (web) / Top Row (mobile) -->
    <Header onToggleSettings={toggleSettings} />

    <!-- Body: VERTICAL layout -->
    <div class="web-body">
      <!-- City Favorites (full width) -->
      <CityFavorites />

      <!-- Local Weather (full width) -->
      <LocalWeather />

      <!-- 7-Day Forecast (full width) -->
      <ForecastCard />

      <!-- AQI + Life Indices: horizontal pair on web, stacked on mobile -->
      <div class="row-pair">
        <AirQuality />
        <LifeIndices />
      </div>

      <!-- Sunrise + Moon Phase: horizontal pair on web, stacked on mobile -->
      <div class="row-pair">
        <SunriseSunset />
        <MoonPhase />
      </div>
    </div>

    <!-- Settings Card (absolute positioned) -->
    <SettingsCard visible={showSettings} />
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

  .row-pair {
    display: flex;
    gap: 14px;
    width: 100%;
  }
  .row-pair > :global(*) {
    flex: 1;
    min-width: 0;
  }

  /* ===== Mobile (≤ 480px, matching lvoeV 430px) ===== */
  @media (max-width: 480px) {
    .page-container {
      padding: 10px;
    }
    .weather-container {
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
</style>
