<script lang="ts">
  import { m } from '$lib/paraglide/messages.js';

  const days = [
    { name: 'Today', date: '04/15', icon: 'sun', cond: 'Sunny', hiTemp: '24°', loTemp: '11°' },
    { name: 'Tomorrow', date: '04/16', icon: 'cloud-rain', cond: 'Light Rain', hiTemp: '18°', loTemp: '9°' },
    { name: 'Friday', date: '04/17', icon: 'sun', cond: 'Sunny', hiTemp: '25°', loTemp: '10°' },
    { name: 'Saturday', date: '04/18', icon: 'sun', cond: 'Sunny', hiTemp: '28°', loTemp: '15°' },
  ];
</script>

<div class="forecast-card card-gradient">
  <span class="forecast-title">{m.seven_day_forecast()}</span>

  <!-- Day columns -->
  <div class="day-columns">
    {#each days as day, i (i)}
      <div class="day-col">
        <span class="day-name">{day.name}</span>
        <span class="day-date">{day.date}</span>
        {#if day.icon === 'sun'}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="day-icon sun-icon"
          >
            <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path
              d="m4.93 4.93 1.41 1.41"
            /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path
              d="m6.34 17.66-1.41 1.41"
            /><path d="m19.07 4.93-1.41 1.41" />
          </svg>
        {:else}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="day-icon rain-icon"
          >
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M16 14v6" /><path
              d="M8 14v6"
            /><path d="M12 16v6" />
          </svg>
        {/if}
        <span class="day-cond">{day.cond}</span>
      </div>
    {/each}
  </div>

  <!-- Chart area with SVG lines -->
  <div class="chart-area">
    <svg class="chart-line" viewBox="0 0 400 78" preserveAspectRatio="none">
      <path
        d="M14 30 C80 30, 140 42, 180 38 C220 34, 260 28, 310 30 C360 32, 380 22, 386 18"
        fill="none"
        stroke="var(--forecast-line-hi)"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M14 54 C80 54, 140 62, 180 60 C220 58, 260 54, 310 54 C360 54, 380 48, 386 44"
        fill="none"
        stroke="var(--forecast-line-lo)"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
    <div class="temp-labels">
      {#each days as day, i (i)}
        <div class="temp-label-col">
          <span class="temp-hi">{day.hiTemp}</span>
          <span class="temp-lo">{day.loTemp}</span>
        </div>
      {/each}
    </div>
  </div>
</div>

<style scoped>
  .forecast-card {
    border-radius: 24px;
    padding: 18px 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    backdrop-filter: blur(16px);
  }

  .forecast-title {
    font-family: 'Geist', sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: var(--text-title-alt);
  }

  .day-columns {
    display: flex;
    gap: 8px;
    width: 100%;
  }
  .day-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
  }
  .day-name {
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 700;
    color: var(--forecast-day);
  }
  .day-date {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 600;
    color: var(--forecast-date);
  }
  .day-icon {
    margin: 4px 0;
  }
  .sun-icon {
    color: var(--weather-icon);
  }
  .rain-icon {
    color: #7daedb;
  }
  .day-cond {
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 600;
    color: var(--forecast-cond);
  }

  .chart-area {
    position: relative;
    height: 94px;
    border-radius: 12px;
    width: 100%;
  }

  .chart-line {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .temp-labels {
    position: absolute;
    inset: 0;
    display: flex;
    width: 100%;
    height: 100%;
  }
  .temp-label-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 14px 0 4px;
  }
  .temp-hi {
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 700;
    color: var(--forecast-temp-hi);
  }
  .temp-lo {
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 700;
    color: var(--forecast-temp-lo);
  }

  /* Mobile */
  @media (max-width: 480px) {
    .forecast-card {
      border-radius: 18px;
      padding: 12px 14px;
    }
    .forecast-title {
      font-size: 18px;
    }
    .day-columns {
      gap: 6px;
    }
    .chart-area {
      height: 78px;
    }
    .temp-hi,
    .temp-lo {
      font-size: 10px;
    }
    .temp-label-col {
      padding: 8px 0 2px;
    }
  }
</style>
