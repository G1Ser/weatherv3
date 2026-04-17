<script lang="ts">
  import { m } from '$lib/paraglide/messages.js';
  import AqiPollutantChart from '$lib/components/charts/AqiPollutantChart.svelte';
  import type { AirResponse, Lang } from '$lib/api/weather';

  interface Props {
    air?: AirResponse | null;
    locale?: Lang;
  }

  let { air = null, locale = 'en' }: Props = $props();

  const aqiValue = $derived(air?.indexes?.[0]?.aqiDisplay || '46');
  const aqiNumeric = $derived(Math.max(0, Number(aqiValue) || 46));
  const aqiCategory = $derived(
    locale === 'zh'
      ? air?.indexes?.[0]?.category_zh || air?.indexes?.[0]?.category || '良'
      : air?.indexes?.[0]?.category || 'Good'
  );
  const primary = $derived(air?.indexes?.[0]?.primaryPollutant?.name || 'PM10');
  const ringProgress = $derived(Math.min(100, Math.max(8, (aqiNumeric / 180) * 100)));
  const toneClass = $derived.by(() => {
    if (aqiNumeric > 150) {
      return 'tone-danger';
    }
    if (aqiNumeric > 100) {
      return 'tone-warn';
    }
    return 'tone-good';
  });

  const pollutantRows = $derived.by(() => {
    const fallback = [
      { code: 'pm2p5', name: 'PM2.5', concentration: { value: 41, unit: 'μg/m³' } },
      { code: 'pm10', name: 'PM10', concentration: { value: 94, unit: 'μg/m³' } },
      { code: 'o3', name: 'O3', concentration: { value: 101, unit: 'μg/m³' } },
      { code: 'no2', name: 'NO2', concentration: { value: 27, unit: 'μg/m³' } },
    ];
    const list = (air?.pollutants || fallback).slice(0, 4);

    return list.map((item, index) => ({
      label: item.name,
      value: Math.round(item.concentration.value),
      color:
        index === 0
          ? 'var(--aqi-chart-bar-pm25)'
          : index === 1
            ? 'var(--aqi-chart-bar-pm10)'
            : index === 2
              ? 'var(--aqi-chart-bar-o3)'
              : 'var(--aqi-chart-bar-no2)',
    }));
  });
</script>

<div class="aqi-card card-gradient {toneClass}">
  <div class="aqi-header">
    <div class="title-wrap">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="aqi-icon"
      >
        <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
        <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
        <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
      </svg>
      <span class="aqi-title">{m.air_quality()}</span>
    </div>
    <span class="aqi-badge">{aqiCategory}</span>
  </div>

  <div class="aqi-body">
    <div class="aqi-summary">
      <div class="aqi-ring" style="--aqi-progress: {ringProgress}%;">
        <div class="aqi-ring-inner">
          <span class="aqi-label">AQI</span>
          <span class="aqi-score">{aqiValue}</span>
        </div>
      </div>
      <span class="aqi-desc">{m.primary_pollutant()} {primary} · {m.outdoor_activity()}</span>
    </div>

    <div class="aqi-chart-wrap">
      <AqiPollutantChart points={pollutantRows} />
    </div>
  </div>
</div>

<style scoped>
  .aqi-card {
    border-radius: 22px;
    padding: 16px 18px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    position: relative;
    overflow: hidden;
  }

  .aqi-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 12% 20%, rgba(126, 169, 233, 0.15) 0%, transparent 52%);
    pointer-events: none;
  }

  .aqi-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    position: relative;
    z-index: 1;
  }

  .title-wrap {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .aqi-icon {
    color: var(--accent-blue);
  }

  .aqi-title {
    font-family: 'Geist', sans-serif;
    font-size: 21px;
    font-weight: 600;
    color: var(--text-title);
  }

  .aqi-badge {
    padding: 6px 12px;
    border-radius: 9999px;
    border: 1px solid transparent;
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 700;
    line-height: 1;
    flex-shrink: 0;
  }

  .aqi-body {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 170px minmax(0, 1fr);
    gap: 12px;
    align-items: stretch;
  }

  .aqi-summary {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
  }

  .aqi-ring {
    width: 152px;
    height: 152px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background:
      radial-gradient(circle, var(--card-inner-bg-solid) 55%, transparent 57%),
      conic-gradient(var(--aqi-ring-accent) var(--aqi-progress), var(--aqi-ring-track) 0);
    box-shadow: inset 0 0 0 1px var(--aqi-ring-border);
  }

  .aqi-ring-inner {
    width: 84px;
    height: 84px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    background: var(--aqi-ring-core);
    border: 1px solid var(--aqi-ring-border);
  }

  .aqi-label {
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 600;
    color: var(--text-muted);
  }

  .aqi-score {
    font-family: var(--font-mono);
    font-size: 30px;
    font-weight: 700;
    line-height: 1;
    color: var(--aqi-ring-accent);
  }

  .aqi-desc {
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 600;
    line-height: 1.4;
    color: var(--text-body);
  }

  .aqi-chart-wrap {
    border-radius: 16px;
    background: var(--aqi-chart-shell-bg);
    border: 1px solid var(--aqi-chart-shell-border);
    padding: 10px 8px 6px;
  }

  .tone-good .aqi-badge {
    color: var(--aqi-tone-good);
    background: color-mix(in srgb, var(--aqi-tone-good) 18%, transparent);
    border-color: color-mix(in srgb, var(--aqi-tone-good) 38%, transparent);
  }

  .tone-warn .aqi-badge {
    color: var(--aqi-tone-warn);
    background: color-mix(in srgb, var(--aqi-tone-warn) 18%, transparent);
    border-color: color-mix(in srgb, var(--aqi-tone-warn) 38%, transparent);
  }

  .tone-danger .aqi-badge {
    color: var(--aqi-tone-danger);
    background: color-mix(in srgb, var(--aqi-tone-danger) 16%, transparent);
    border-color: color-mix(in srgb, var(--aqi-tone-danger) 34%, transparent);
  }

  @media (max-width: 768px) {
    .aqi-card {
      border-radius: 18px;
      padding: 12px 12px 14px;
      gap: 10px;
    }

    .aqi-title {
      font-size: 18px;
    }

    .aqi-body {
      grid-template-columns: 1fr;
      gap: 8px;
    }

    .aqi-summary {
      flex-direction: row;
      align-items: center;
    }

    .aqi-ring {
      width: 118px;
      height: 118px;
      flex-shrink: 0;
    }

    .aqi-ring-inner {
      width: 70px;
      height: 70px;
    }

    .aqi-score {
      font-size: 24px;
    }

    .aqi-chart-wrap {
      padding: 8px 6px 4px;
    }
  }
</style>
