<script lang="ts">
  import { m } from '$lib/paraglide/messages.js';

  const pollutants = [
    { label: 'PM2.5', value: 11, barWidth: 30, color: 'var(--aqi-bar-pm25)', valueColor: 'var(--aqi-value-good)' },
    { label: 'PM10', value: 23, barWidth: 44, color: 'var(--aqi-bar-pm10)', valueColor: 'var(--aqi-value-good)' },
    { label: 'O₃', value: 67, barWidth: 64, color: 'var(--aqi-bar-o3)', valueColor: 'var(--aqi-value-mid)' },
    { label: 'NO₂', value: 19, barWidth: 38, color: 'var(--aqi-bar-no2)', valueColor: 'var(--aqi-value-good)' },
  ];
</script>

<div class="aqi-card card-gradient">
  <div class="aqi-header">
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

  <div class="aqi-value-row">
    <span class="aqi-big-value">AQI 46</span>
    <span class="aqi-badge">Good</span>
  </div>

  <span class="aqi-desc">{m.primary_pollutant()} PM10 · {m.outdoor_activity()}</span>

  <div class="pollutant-list">
    {#each pollutants as p, i (i)}
      <div class="pollutant-row">
        <span class="pollutant-label">{p.label}</span>
        <div class="pollutant-bar">
          <div class="pollutant-fill" style="width: {p.barWidth}%; background: {p.color};"></div>
        </div>
        <span class="pollutant-value" style="color: {p.valueColor};">{p.value}</span>
      </div>
    {/each}
  </div>
</div>

<style scoped>
  .aqi-card {
    border-radius: 20px;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .aqi-header {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .aqi-icon {
    color: var(--accent-blue);
  }
  .aqi-title {
    font-family: 'Geist', sans-serif;
    font-size: 22px;
    font-weight: 600;
    color: var(--text-title);
  }

  .aqi-value-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .aqi-big-value {
    font-family: var(--font-mono);
    font-size: 30px;
    font-weight: 700;
    color: var(--aqi-good);
  }
  .aqi-badge {
    padding: 6px 12px;
    border-radius: 9999px;
    background: var(--aqi-good-bg);
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 700;
    color: var(--aqi-good);
  }

  .aqi-desc {
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 500;
    color: var(--text-body);
  }

  .pollutant-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
  }
  .pollutant-row {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
  }
  .pollutant-label {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 700;
    color: var(--aqi-pollutant-label);
    min-width: 45px;
  }
  .pollutant-bar {
    flex: 1;
    height: 8px;
    border-radius: 9999px;
    background: var(--aqi-bar-bg);
    overflow: hidden;
  }
  .pollutant-fill {
    height: 100%;
    border-radius: 9999px;
    transition: width 0.6s ease;
  }
  .pollutant-value {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 700;
    min-width: 24px;
    text-align: right;
  }

  /* Mobile */
  @media (max-width: 480px) {
    .aqi-title {
      font-size: 16px;
    }
    .aqi-big-value {
      font-size: 22px;
    }
    .aqi-desc {
      font-size: 10px;
    }
  }
</style>
