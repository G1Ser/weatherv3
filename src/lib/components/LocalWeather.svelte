<script lang="ts">
  import { m } from '$lib/paraglide/messages.js';
</script>

<div class="local-card card-gradient">
  <!-- Top row: label + favorite button -->
  <div class="local-top">
    <div class="local-title-wrap">
      <span class="local-label">{m.local_weather()}</span>
      <span class="local-cond">Mostly Sunny</span>
    </div>
    <button class="fav-btn">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polygon
          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        />
      </svg>
      <span>{m.favorite()}</span>
    </button>
  </div>

  <!-- Temperature + Icon -->
  <div class="temp-row">
    <span class="temp-value">24°</span>
    <svg
      class="weather-icon"
      width="108"
      height="108"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  </div>

  <!-- Range info -->
  <span class="local-range">H 28° · L 19° · Humidity 67% · Feels 26°</span>

  <!-- Wind badge -->
  <div class="wind-badge">
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </svg>
    <span>{m.wind()} 4.8 m/s · ENE</span>
  </div>
</div>

<style scoped>
  .local-card {
    border-radius: 24px;
    padding: 22px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    backdrop-filter: blur(18px);
  }

  .local-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .local-title-wrap {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .local-label {
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 600;
    color: var(--text-body);
  }
  .local-cond {
    font-family: 'Geist', sans-serif;
    font-size: 34px;
    font-weight: 600;
    color: var(--text-condition);
  }

  .fav-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    border-radius: 9999px;
    background: var(--accent-badge-bg);
    border: 1px solid var(--accent-badge-border);
    color: var(--accent-badge-text);
    cursor: pointer;
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 600;
    transition: opacity 0.2s;
  }
  .fav-btn:hover {
    opacity: 0.8;
  }

  .temp-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .temp-value {
    font-family: var(--font-mono);
    font-size: 72px;
    font-weight: 600;
    color: var(--text-title-dark);
  }
  .weather-icon {
    color: var(--weather-icon);
  }

  .local-range {
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 500;
    color: var(--text-body);
  }

  .wind-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 8px 12px;
    border-radius: 9999px;
    background: var(--accent-wind-bg);
    color: var(--accent-wind-icon);
    width: fit-content;
  }
  .wind-badge span {
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 600;
    color: var(--accent-wind-text);
  }
</style>
