<script lang="ts">
  import { m } from '$lib/paraglide/messages.js';
  import type { Lang, SunAstronomyResponse } from '$lib/api/weather';

  interface Props {
    sun?: SunAstronomyResponse | null;
    locale?: Lang;
  }

  let { sun = null, locale = 'en' }: Props = $props();

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

  function durationText(sunrise?: string, sunset?: string) {
    if (!sunrise || !sunset) {
      return '13h 19m';
    }

    const rise = new Date(sunrise).getTime();
    const set = new Date(sunset).getTime();

    if (Number.isNaN(rise) || Number.isNaN(set) || set <= rise) {
      return '13h 19m';
    }

    const totalMinutes = Math.floor((set - rise) / 60000);
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h}h ${m}m`;
  }

  const sunriseText = $derived(hhmm(sun?.sunrise));
  const sunsetText = $derived(hhmm(sun?.sunset));
  const daylight = $derived(durationText(sun?.sunrise, sun?.sunset));
  const sunriseLabel = $derived(locale === 'zh' ? '日出' : 'Sunrise');
  const sunsetLabel = $derived(locale === 'zh' ? '日落' : 'Sunset');
</script>

<div class="sun-card card-gradient">
  <div class="sun-header">
    <svg
      class="sun-title-icon"
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
      <path d="M12 2v8" />
      <path d="m4.93 10.93 1.41 1.41" />
      <path d="M2 18h2" />
      <path d="m19.07 10.93-1.41 1.41" />
      <path d="M20 18h2" />
      <path d="M22 22H2" />
      <path d="M16 6a4 4 0 0 0-8 0" />
    </svg>
    <span class="sun-title">{m.sunrise_sunset()}</span>
  </div>

  <div class="sun-plot">
    <div class="arc-shell">
      <svg class="sun-arc-svg" viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="sun-arc-split" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="var(--sun-card-progress)" />
            <stop offset="50%" stop-color="var(--sun-card-progress)" />
            <stop offset="50%" stop-color="var(--sun-card-track)" />
            <stop offset="100%" stop-color="var(--sun-card-track)" />
          </linearGradient>
        </defs>
        <path d="M 2 30 Q 50 2 98 30" fill="none" stroke="url(#sun-arc-split)" stroke-width="1.8" />
      </svg>
    </div>

    <span class="sun-marker pulse-dot" aria-hidden="true"></span>

    <span class="sun-time sunrise-time">{sunriseText}</span>
    <span class="sun-label sunrise-label">{sunriseLabel}</span>

    <span class="sun-time sunset-time">{sunsetText}</span>
    <span class="sun-label sunset-label">{sunsetLabel}</span>

    <span class="sun-daylight">{m.daylight()} {daylight}</span>
  </div>
</div>

<style scoped>
  .sun-card {
    --sun-card-title: #1d2a43;
    --sun-card-icon: #5c6f8e;
    --sun-card-track: #becbda;
    --sun-card-progress: #e3c25f;
    --sun-card-dot: #f0be63;
    --sun-card-time: #6e86ae;
    --sun-card-label: #7c8fae;
    --sun-card-daylight: #1a3558;

    border-radius: 22px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    height: 190px;
    backdrop-filter: blur(16px);
  }

  :global(:root.dark) .sun-card {
    --sun-card-title: #f5f5f5;
    --sun-card-icon: #a3a3a3;
    --sun-card-track: #313131;
    --sun-card-progress: #b48b3b;
    --sun-card-time: #b5c1d6;
    --sun-card-label: #8b9ab7;
    --sun-card-daylight: #d4d4d4;
  }

  .sun-header {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .sun-title-icon {
    color: var(--sun-card-icon);
    flex-shrink: 0;
  }

  .sun-title {
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 700;
    color: var(--sun-card-title);
  }

  .sun-plot {
    position: relative;
    width: 100%;
    height: 132px;
    flex-shrink: 0;
  }

  .arc-shell {
    position: absolute;
    top: 18px;
    left: 10px;
    right: 10px;
    height: 70px;
  }

  .sun-arc-svg {
    width: 100%;
    height: 100%;
  }

  .sun-marker {
    position: absolute;
    left: 50%;
    top: 44px;
    width: 10px;
    height: 10px;
    transform: translateX(-50%);
    border-radius: 50%;
    background: var(--sun-card-dot);
  }

  .sun-time,
  .sun-label,
  .sun-daylight {
    position: absolute;
    white-space: nowrap;
  }

  .sun-time {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 700;
    color: var(--sun-card-time);
  }

  .sun-label {
    font-family: var(--font-body);
    font-size: 10px;
    font-weight: 600;
    color: var(--sun-card-label);
  }

  .sun-daylight {
    left: 50%;
    top: 84px;
    transform: translateX(-50%);
    font-family: var(--font-body);
    font-size: 10px;
    font-weight: 600;
    color: var(--sun-card-daylight);
  }

  .sunrise-time {
    left: 10px;
    top: 82px;
  }

  .sunrise-label {
    left: 16px;
    top: 100px;
  }

  .sunset-time {
    right: 10px;
    top: 82px;
  }

  .sunset-label {
    right: 16px;
    top: 100px;
  }

  .pulse-dot {
    transform-origin: center;
    animation: pulse-dot 2.2s ease-in-out infinite;
  }

  @keyframes pulse-dot {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }

    50% {
      transform: scale(1.2);
      opacity: 0.75;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pulse-dot {
      animation: none;
    }
  }
</style>
