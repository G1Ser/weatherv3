<script lang="ts">
  import { m } from '$lib/paraglide/messages.js';
  import type { Lang, MoonAstronomyResponse } from '$lib/api/weather';

  interface Props {
    moon?: MoonAstronomyResponse | null;
    locale?: Lang;
  }

  let { moon = null, locale = 'en' }: Props = $props();

  function hhmm(value?: string) {
    if (!value) {
      return '--:--';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value.slice(11, 16);
    }

    return date.toTimeString().slice(0, 5);
  }

  const moonrise = $derived(hhmm(moon?.moonrise));
  const moonset = $derived(hhmm(moon?.moonset));
  const moonPhase = $derived(moon?.moonPhase?.[0]);
  const moonName = $derived(
    locale === 'zh' ? moonPhase?.name_zh || moonPhase?.name || '盈凸月' : moonPhase?.name || 'Waxing Gibbous'
  );
  const illumination = $derived(moonPhase?.illumination || '71');
  const trendHours = ['18', '20', '22', '00'];
</script>

<div class="moon-card card-gradient">
  <div class="moon-header">
    <svg
      class="moon-title-icon"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3a6.5 6.5 0 0 0 9 9A9 9 0 1 1 12 3Z" />
    </svg>
    <span class="moon-title">{m.moon_phase()} &amp; 24h</span>
  </div>

  <div class="moon-main">
    <div class="moon-info">
      <div class="moon-phase-row">
        <span class="moon-phase-text">{moonName}</span>
        <span class="moon-illumination">{illumination}%</span>
      </div>
      <span class="moon-time">{m.moonrise()} {moonrise}</span>
      <span class="moon-time">{m.moonset()} {moonset}</span>
    </div>

    <div class="moon-illustration">
      <div class="moon-body"></div>
      <div class="moon-shadow"></div>
    </div>
  </div>

  <div class="moon-trend">
    <div class="moon-trend-time-row">
      {#each trendHours as hour, i (i)}
        <span>{hour}</span>
      {/each}
    </div>

    <div class="moon-trend-icon-row">
      {#each trendHours as hour (hour)}
        <span class="moon-pill" aria-hidden="true">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 3a6.5 6.5 0 0 0 9 9A9 9 0 1 1 12 3Z" />
          </svg>
        </span>
      {/each}
    </div>
  </div>
</div>

<style scoped>
  .moon-card {
    --moon-card-title: #1d2a43;
    --moon-card-icon: #5c6f8e;
    --moon-phase-name: #2b456a;
    --moon-phase-value: #2d4c75;
    --moon-time-color: #7a97bf;
    --moon-core: #d8dee8;
    --moon-shade: #eef2f6;
    --moon-trend-bg: #eceff4;
    --moon-pill-bg: #dce2ea;
    --moon-pill-icon: #8192ab;
    --moon-time-label: #4b6388;

    border-radius: 22px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    height: 190px;
    backdrop-filter: blur(16px);
  }

  :global(:root.dark) .moon-card {
    --moon-card-title: #f5f5f5;
    --moon-card-icon: #a3a3a3;
    --moon-phase-name: #e5e7eb;
    --moon-phase-value: #c9d4ea;
    --moon-time-color: #9aa9c3;
    --moon-core: #f3f4f6;
    --moon-shade: #5d6676;
    --moon-trend-bg: #171a1f;
    --moon-pill-bg: #212733;
    --moon-pill-icon: #9ba8c0;
    --moon-time-label: #a3afc7;
  }

  .moon-header {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .moon-title-icon {
    color: var(--moon-card-icon);
    flex-shrink: 0;
  }

  .moon-title {
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 700;
    color: var(--moon-card-title);
  }

  .moon-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .moon-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .moon-phase-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .moon-phase-text {
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 700;
    color: var(--moon-phase-name);
  }

  .moon-illumination {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 700;
    color: var(--moon-phase-value);
  }

  .moon-time {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 600;
    color: var(--moon-time-color);
  }

  .moon-illustration {
    position: relative;
    width: 54px;
    height: 54px;
    flex-shrink: 0;
  }

  .moon-body,
  .moon-shadow {
    position: absolute;
    top: 2px;
    left: 2px;
    border-radius: 50%;
  }

  .moon-body {
    width: 50px;
    height: 50px;
    background: var(--moon-core);
  }

  .moon-shadow {
    width: 36px;
    height: 50px;
    background: var(--moon-shade);
  }

  .moon-trend {
    width: 100%;
    border-radius: 10px;
    background: var(--moon-trend-bg);
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 8px;
  }

  .moon-trend-time-row,
  .moon-trend-icon-row {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 6px;
  }

  .moon-trend-time-row span {
    text-align: center;
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 700;
    color: var(--moon-time-label);
  }

  .moon-pill {
    height: 28px;
    border-radius: 9999px;
    background: var(--moon-pill-bg);
    color: var(--moon-pill-icon);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 480px) {
    .moon-title {
      font-size: 14px;
    }
  }
</style>
