<script lang="ts">
  import { m } from '$lib/paraglide/messages.js';
  import TemperatureTrend from '$lib/components/charts/TemperatureTrend.svelte';
  import type { ForecastDailyItem, Lang, Unit } from '$lib/api/weather';

  type WeatherIconKind = 'sun' | 'moon' | 'cloud' | 'rain' | 'thunder' | 'drizzle' | 'snow' | 'fog';

  interface DayView {
    key: string;
    label: string;
    date: string;
    cond: string;
    hi: number;
    lo: number;
    iconDay: string;
    iconNight: string;
    precip: string;
    humidity: string;
    pressure: string;
    uvIndex: string;
  }

  interface Props {
    daily?: ForecastDailyItem[];
    locale?: Lang;
    unit?: Unit;
  }

  let { daily = [], locale = 'en', unit = 'm' }: Props = $props();

  const fallbackDaily: ForecastDailyItem[] = [
    {
      fxDate: '2026-04-15',
      sunrise: '05:35',
      sunset: '18:54',
      moonrise: '04:59',
      moonset: '18:56',
      moonPhase: 'Waxing Gibbous',
      moonPhaseIcon: '803',
      tempMax: '24',
      tempMin: '13',
      iconDay: '100',
      textDay: 'Sunny',
      iconNight: '150',
      textNight: 'Clear',
      uvIndex: '7',
      precip: '0.0',
      humidity: '63',
      pressure: '1005',
    },
    {
      fxDate: '2026-04-16',
      sunrise: '05:34',
      sunset: '18:55',
      moonrise: '05:31',
      moonset: '19:41',
      moonPhase: 'Waning Gibbous',
      moonPhaseIcon: '804',
      tempMax: '22',
      tempMin: '12',
      iconDay: '305',
      textDay: 'Light Rain',
      iconNight: '305',
      textNight: 'Light Rain',
      uvIndex: '4',
      precip: '2.2',
      humidity: '71',
      pressure: '1002',
    },
    {
      fxDate: '2026-04-17',
      sunrise: '05:33',
      sunset: '18:56',
      moonrise: '06:03',
      moonset: '20:26',
      moonPhase: 'Last Quarter',
      moonPhaseIcon: '805',
      tempMax: '25',
      tempMin: '14',
      iconDay: '101',
      textDay: 'Cloudy',
      iconNight: '151',
      textNight: 'Cloudy',
      uvIndex: '6',
      precip: '0.0',
      humidity: '58',
      pressure: '1006',
    },
    {
      fxDate: '2026-04-18',
      sunrise: '05:32',
      sunset: '18:57',
      moonrise: '06:36',
      moonset: '21:12',
      moonPhase: 'Waning Crescent',
      moonPhaseIcon: '806',
      tempMax: '28',
      tempMin: '16',
      iconDay: '100',
      textDay: 'Sunny',
      iconNight: '150',
      textNight: 'Clear',
      uvIndex: '8',
      precip: '0.0',
      humidity: '46',
      pressure: '1008',
    },
  ];

  function formatWeekday(date: string) {
    const dateObj = new Date(`${date}T00:00:00`);
    return dateObj.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', { weekday: 'short' });
  }

  function formatDate(date: string) {
    const dateObj = new Date(`${date}T00:00:00`);
    return dateObj.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
      month: '2-digit',
      day: '2-digit',
    });
  }

  function resolveUvLevel(uvIndex: string) {
    const value = Number(uvIndex);
    if (!Number.isFinite(value)) {
      return '--';
    }

    if (locale === 'zh') {
      if (value <= 2) return '低';
      if (value <= 5) return '中等';
      if (value <= 7) return '较强';
      if (value <= 10) return '很强';
      return '极强';
    }

    if (value <= 2) return 'Low';
    if (value <= 5) return 'Moderate';
    if (value <= 7) return 'High';
    if (value <= 10) return 'Very High';
    return 'Extreme';
  }

  function metricLabel(type: 'precip' | 'humidity' | 'pressure' | 'uv') {
    if (locale === 'zh') {
      if (type === 'precip') return '降水';
      if (type === 'humidity') return '湿度';
      if (type === 'pressure') return '气压';
      return '紫外线';
    }

    if (type === 'precip') return 'Precip';
    if (type === 'humidity') return 'Humidity';
    if (type === 'pressure') return 'Pressure';
    return 'UV';
  }

  function normalizeDays(source: ForecastDailyItem[]): DayView[] {
    return source.slice(0, 7).map(item => ({
      key: item.fxDate,
      label: formatWeekday(item.fxDate),
      date: formatDate(item.fxDate),
      cond: locale === 'zh' ? item.textDay_zh || item.textDay : item.textDay,
      hi: Number(item.tempMax),
      lo: Number(item.tempMin),
      iconDay: item.iconDay,
      iconNight: item.iconNight,
      precip: item.precip || '--',
      humidity: item.humidity || '--',
      pressure: item.pressure || '--',
      uvIndex: item.uvIndex || '--',
    }));
  }

  function resolveIconKind(code: string, night = false): WeatherIconKind {
    const value = Number(code);

    if (night && [150, 151, 152, 153].includes(value)) return 'moon';
    if ([100].includes(value)) return 'sun';
    if ([302, 303, 304].includes(value)) return 'thunder';
    if ([300, 301, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 399].includes(value)) {
      return value === 306 || value === 399 ? 'drizzle' : 'rain';
    }
    if ([400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 456, 457, 499].includes(value)) {
      return 'snow';
    }
    if ([500, 501, 502, 503, 504, 507, 508, 509, 510, 511, 512, 513, 514, 515].includes(value)) {
      return 'fog';
    }
    return 'cloud';
  }

  const days = $derived(normalizeDays(daily.length > 0 ? daily : fallbackDaily));
  const unitLabel = $derived(unit === 'i' ? '°F' : '°C');
</script>

<div class="forecast-card card-gradient">
  <div class="forecast-title-row">
    <svg
      class="forecast-title-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
    <span class="forecast-title">{m.seven_day_forecast()}</span>
  </div>

  <div class="forecast-main card-inner">
    <div class="day-scroll">
      <div class="day-columns">
        {#each days as day (day.key)}
          {@const dayKind = resolveIconKind(day.iconDay)}
          <div class="day-col">
            <span class="day-name">{day.label}</span>
            <span class="day-date">{day.date}</span>

            <div class="icon-shell">
              <div class={`icon-badge ${dayKind}`}>
                {#if dayKind === 'sun'}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path
                      d="m4.93 4.93 1.41 1.41"
                    /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path
                      d="m6.34 17.66-1.41 1.41"
                    /><path d="m19.07 4.93-1.41 1.41" />
                  </svg>
                {:else if dayKind === 'rain'}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M17 17.5a4.5 4.5 0 1 0-4.5-4.5 6 6 0 1 0-11.7 1.5" />
                    <path d="M8 17v2" /><path d="M12 17v4" /><path d="M16 17v2" />
                  </svg>
                {:else if dayKind === 'thunder'}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M17 17.5a4.5 4.5 0 1 0-4.5-4.5 6 6 0 1 0-11.7 1.5" />
                    <path d="m13 12-3 5h4l-3 5" />
                  </svg>
                {:else if dayKind === 'drizzle'}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M17 17.5a4.5 4.5 0 1 0-4.5-4.5 6 6 0 1 0-11.7 1.5" />
                    <path d="M8 17v.01" /><path d="M12 19v.01" /><path d="M16 17v.01" />
                  </svg>
                {:else if dayKind === 'snow'}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M17 17.5a4.5 4.5 0 1 0-4.5-4.5 6 6 0 1 0-11.7 1.5" />
                    <path d="m8 15 1 2" /><path d="m15 15-1 2" /><path d="M11 15h2" />
                  </svg>
                {:else if dayKind === 'fog'}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M3 15h11a4 4 0 1 0-3.7-5.5A6 6 0 1 0 3 15Z" />
                    <path d="M4 19h8" /><path d="M2 22h12" />
                  </svg>
                {:else}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M17 17.5a4.5 4.5 0 1 0-4.5-4.5 6 6 0 1 0-11.7 1.5" />
                  </svg>
                {/if}
              </div>
            </div>

            <span class="day-cond">{day.cond}</span>
          </div>
        {/each}
      </div>
    </div>

    <div class="temp-scroll">
      <div class="temp-grid">
        <div class="temp-row hi-row">
          {#each days as day (day.key + '-hi')}
            <span>{day.hi}{unitLabel}</span>
          {/each}
        </div>
        <div class="temp-band-wrap">
          <TemperatureTrend points={days.map(d => ({ label: d.label, hi: d.hi, lo: d.lo }))} />
        </div>
        <div class="temp-row lo-row">
          {#each days as day (day.key + '-lo')}
            <span>{day.lo}{unitLabel}</span>
          {/each}
        </div>
      </div>
    </div>

    <div class="metric-scroll">
      <div class="metric-columns">
        {#each days as day (day.key + '-metric')}
          <div class="metric-col">
            <div class="metric-item">
              <div class="metric-label"><span>☔</span><span>{metricLabel('precip')}</span></div>
              <span class="metric-value">{day.precip} mm</span>
            </div>
            <div class="metric-item">
              <div class="metric-label"><span>💧</span><span>{metricLabel('humidity')}</span></div>
              <span class="metric-value">{day.humidity}%</span>
            </div>
            <div class="metric-item">
              <div class="metric-label"><span>⎈</span><span>{metricLabel('pressure')}</span></div>
              <span class="metric-value">{day.pressure}</span>
            </div>
            <div class="metric-item">
              <div class="metric-label"><span>✦</span><span>{metricLabel('uv')}</span></div>
              <span class="metric-value">{resolveUvLevel(day.uvIndex)}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style scoped>
  .forecast-card {
    --forecast-title-icon: #334b6f;
    --forecast-main-bg: #ffffffb8;
    --forecast-main-border: #dce7f8;
    --forecast-icon-shell-bg: #f3f7fc;
    --forecast-icon-shell-border: #e1e8f3;
    --forecast-day-sun: #f2b43d;
    --forecast-day-rain: #63a4f4;
    --forecast-day-cloud: #8ea1bc;
    --forecast-day-thunder: #7e7af4;
    --forecast-day-drizzle: #58b6df;
    --forecast-day-snow: #7aa7e6;
    --forecast-day-fog: #92a7c5;
    --forecast-metric-label: #7a90b1;
    --forecast-metric-value: #2e466a;

    border-radius: 24px;
    padding: 18px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    backdrop-filter: blur(16px);
  }

  :global(:root.dark) .forecast-card {
    --forecast-title-icon: #a8b6cb;
    --forecast-main-bg: #111111;
    --forecast-main-border: #2a2a2a;
    --forecast-icon-shell-bg: #152131;
    --forecast-icon-shell-border: #2e3a4a;
    --forecast-day-cloud: #9caac0;
    --forecast-day-fog: #8ea1bc;
    --forecast-metric-label: #8d9cb4;
    --forecast-metric-value: #d4ddea;
  }

  .forecast-title-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .forecast-title-icon {
    color: var(--forecast-title-icon);
    flex-shrink: 0;
  }

  .forecast-title {
    font-family: 'Geist', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: var(--text-title-alt);
  }

  .forecast-main {
    border-radius: 16px;
    background: var(--forecast-main-bg);
    border-color: var(--forecast-main-border);
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .day-scroll,
  .temp-scroll,
  .metric-scroll {
    overflow-x: auto;
  }

  .day-columns {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 10px;
    width: 100%;
    min-width: 680px;
  }

  .day-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    min-width: 0;
  }

  .day-name {
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 700;
    color: var(--forecast-day);
  }

  .day-date {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 600;
    color: var(--forecast-date);
  }

  .icon-shell {
    width: 46px;
    height: 46px;
    margin: 1px 0;
  }

  .icon-badge {
    width: 46px;
    height: 46px;
    border-radius: 14px;
    border: 1px solid var(--forecast-icon-shell-border);
    background: var(--forecast-icon-shell-bg);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-badge.sun {
    color: var(--forecast-day-sun);
  }

  .icon-badge.rain {
    color: var(--forecast-day-rain);
  }

  .icon-badge.cloud {
    color: var(--forecast-day-cloud);
  }

  .icon-badge.thunder {
    color: var(--forecast-day-thunder);
  }

  .icon-badge.drizzle {
    color: var(--forecast-day-drizzle);
  }

  .icon-badge.snow {
    color: var(--forecast-day-snow);
  }

  .icon-badge.fog {
    color: var(--forecast-day-fog);
  }

  .day-cond {
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 700;
    color: var(--forecast-cond);
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .temp-grid {
    min-width: 680px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .temp-row {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 10px;
  }

  .temp-row span {
    text-align: center;
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 700;
  }

  .hi-row span {
    color: #fc4e4e;
  }

  .lo-row span {
    color: #3e6bff;
  }

  .temp-band-wrap {
    width: 100%;
    height: 56px;
  }

  .metric-columns {
    min-width: 680px;
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 10px;
  }

  .metric-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .metric-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .metric-label {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: var(--font-body);
    font-size: 10px;
    font-weight: 600;
    color: var(--forecast-metric-label);
  }

  .metric-value {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 700;
    color: var(--forecast-metric-value);
  }

  @media (max-width: 768px) {
    .forecast-card {
      border-radius: 18px;
      padding: 12px 14px;
      gap: 8px;
    }

    .forecast-title {
      font-size: 18px;
    }

    .forecast-title-icon {
      width: 18px;
      height: 18px;
    }

    .forecast-main {
      border-radius: 14px;
      padding: 10px 10px;
      gap: 10px;
    }

    .day-columns,
    .temp-grid,
    .metric-columns {
      min-width: 620px;
      gap: 8px;
    }

    .icon-shell,
    .icon-badge {
      width: 40px;
      height: 40px;
      border-radius: 12px;
    }

    .icon-badge svg {
      width: 18px;
      height: 18px;
    }

    .day-name {
      font-size: 11px;
    }

    .day-date,
    .day-cond,
    .metric-label {
      font-size: 10px;
    }

    .temp-row span,
    .metric-value {
      font-size: 10px;
    }

    .temp-band-wrap {
      height: 48px;
    }
  }
</style>
