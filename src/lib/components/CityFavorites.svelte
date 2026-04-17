<script lang="ts">
  import { m } from '$lib/paraglide/messages.js';

  interface FavoriteCity {
    name: string;
    temp: string;
    weather: string;
  }

  interface Props {
    cities?: FavoriteCity[];
  }

  let { cities = [] }: Props = $props();

  const fallbackCities: FavoriteCity[] = [
    { name: 'Shanghai', temp: '24', weather: 'Sunny' },
    { name: 'Singapore', temp: '30', weather: 'Haze' },
    { name: 'Vancouver', temp: '16', weather: 'Cloudy' },
  ];

  function resolveIconName(weather: string) {
    const value = weather.toLowerCase();
    if (value.includes('rain') || value.includes('雨')) return 'rain';
    if (value.includes('thunder') || value.includes('雷')) return 'thunder';
    if (value.includes('sun') || value.includes('晴')) return 'sun';
    if (value.includes('haze') || value.includes('fog') || value.includes('雾') || value.includes('霾')) {
      return 'fog';
    }
    return 'cloud';
  }

  const list = $derived(cities.length > 0 ? cities : fallbackCities);
</script>

<div class="favorites-card card-gradient">
  <div class="fav-header">
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      stroke-width="1.3"
      class="fav-star-icon"
      aria-hidden="true"
    >
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      />
    </svg>
    <span class="fav-title">{m.city_favorites()}</span>
  </div>

  <div class="fav-scroll">
    <div class="fav-cities">
      {#each list as city, i (city.name + i)}
        {@const iconKind = resolveIconName(city.weather)}
        <div class="city-item" data-active={i === 0}>
          <div class="city-top">
            <span class="city-name">{city.name}</span>
            {#if i === 0}
              <span class="city-pill">Current</span>
            {:else}
              <span class="city-cond-mini">{city.weather}</span>
            {/if}
          </div>

          <div class="city-main">
            <span class="city-temp">{city.temp}°</span>
            <span class={`city-icon ${iconKind}`}>
              {#if iconKind === 'sun'}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path
                    d="m4.93 4.93 1.41 1.41"
                  /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path
                    d="m6.34 17.66-1.41 1.41"
                  /><path d="m19.07 4.93-1.41 1.41" />
                </svg>
              {:else if iconKind === 'rain'}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M17 17.5a4.5 4.5 0 1 0-4.5-4.5 6 6 0 1 0-11.7 1.5" />
                  <path d="M8 17v2" /><path d="M12 17v4" /><path d="M16 17v2" />
                </svg>
              {:else if iconKind === 'thunder'}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M17 17.5a4.5 4.5 0 1 0-4.5-4.5 6 6 0 1 0-11.7 1.5" />
                  <path d="m13 12-3 5h4l-3 5" />
                </svg>
              {:else if iconKind === 'fog'}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 15h11a4 4 0 1 0-3.7-5.5A6 6 0 1 0 3 15Z" />
                  <path d="M4 19h8" /><path d="M2 22h12" />
                </svg>
              {:else}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M17 17.5a4.5 4.5 0 1 0-4.5-4.5 6 6 0 1 0-11.7 1.5" />
                </svg>
              {/if}
            </span>
          </div>

          <span class="city-detail">Feels Like {city.temp}° · {city.weather}</span>
        </div>
      {/each}
    </div>
  </div>
</div>

<style scoped>
  .favorites-card {
    --city-card-bg: #ffffffd4;
    --city-card-border: #d5e1f4;
    --city-card-active-bg: #fffffff0;
    --city-card-active-border: #8a9cbd;
    --city-card-shadow: 0 6px 14px rgba(96, 119, 146, 0.12);
    --city-title: #1f2f4a;
    --city-name: #314769;
    --city-temp: #2a3e61;
    --city-detail: #7488aa;
    --city-mini: #8a9bb9;
    --city-pill-bg: #eaf0fa;
    --city-pill-text: #4f6488;
    --city-icon: #9aaecc;
    --city-icon-sun: #f2b43d;
    --city-icon-rain: #63a4f4;
    --city-icon-thunder: #7e7af4;
    --city-icon-fog: #8ea1bc;

    border-radius: 22px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  :global(:root.dark) .favorites-card {
    --city-card-bg: #10161f;
    --city-card-border: #2b3543;
    --city-card-active-bg: #131b26;
    --city-card-active-border: #6e7a8d;
    --city-card-shadow: 0 6px 14px rgba(0, 0, 0, 0.26);
    --city-title: #f3f6fb;
    --city-name: #e5eaf3;
    --city-temp: #f0f4fb;
    --city-detail: #a9b6cb;
    --city-mini: #9aa7bc;
    --city-pill-bg: #243040;
    --city-pill-text: #d2dbea;
    --city-icon: #c5cedd;
    --city-icon-fog: #b3c0d3;
  }

  .fav-header {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .fav-star-icon {
    color: var(--accent-blue);
    flex-shrink: 0;
  }

  .fav-title {
    font-family: 'Geist', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: var(--city-title);
  }

  .fav-scroll {
    overflow-x: auto;
  }

  .fav-cities {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(220px, 1fr);
    gap: 10px;
    width: 100%;
    min-width: 700px;
  }

  .city-item {
    min-height: 108px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 10px 12px;
    border-radius: 16px;
    background: var(--city-card-bg);
    border: 1px solid var(--city-card-border);
  }

  .city-item[data-active='true'] {
    background: var(--city-card-active-bg);
    border-width: 2px;
    border-color: var(--city-card-active-border);
    box-shadow: var(--city-card-shadow);
  }

  .city-top,
  .city-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .city-name {
    min-width: 0;
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 700;
    color: var(--city-name);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .city-pill {
    flex-shrink: 0;
    padding: 3px 8px;
    border-radius: 9999px;
    background: var(--city-pill-bg);
    color: var(--city-pill-text);
    font-family: var(--font-body);
    font-size: 10px;
    font-weight: 700;
  }

  .city-cond-mini {
    flex-shrink: 0;
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 700;
    color: var(--city-mini);
  }

  .city-temp {
    font-family: var(--font-mono);
    font-size: 38px;
    font-weight: 700;
    line-height: 1;
    color: var(--city-temp);
  }

  .city-icon {
    color: var(--city-icon);
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .city-icon.sun {
    color: var(--city-icon-sun);
  }

  .city-icon.rain {
    color: var(--city-icon-rain);
  }

  .city-icon.thunder {
    color: var(--city-icon-thunder);
  }

  .city-icon.fog {
    color: var(--city-icon-fog);
  }

  .city-detail {
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 600;
    color: var(--city-detail);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 768px) {
    .favorites-card {
      border-radius: 18px;
      padding: 12px;
      gap: 10px;
    }

    .fav-title {
      font-size: 16px;
    }

    .fav-star-icon {
      width: 16px;
      height: 16px;
    }

    .fav-cities {
      min-width: 620px;
      grid-auto-columns: minmax(180px, 1fr);
      gap: 8px;
    }

    .city-item {
      min-height: 96px;
      padding: 8px 9px;
      gap: 5px;
      border-radius: 14px;
    }

    .city-name {
      font-size: 12px;
    }

    .city-pill {
      padding: 2px 7px;
      font-size: 9px;
    }

    .city-cond-mini,
    .city-detail {
      font-size: 10px;
    }

    .city-temp {
      font-size: 30px;
    }

    .city-icon svg {
      width: 18px;
      height: 18px;
    }
  }
</style>
