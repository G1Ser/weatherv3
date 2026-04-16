<script lang="ts">
  import { m } from '$lib/paraglide/messages.js';
</script>

<div class="favorites-card card-gradient">
  <div class="fav-header">
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      stroke-width="1.5"
      class="fav-star-icon"
    >
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      />
    </svg>
    <span class="fav-title">{m.city_favorites()}</span>
  </div>

  <div class="fav-cities">
    <div class="city-item">
      <span class="city-name">Shanghai</span>
      <span class="city-weather">24° · Sunny</span>
    </div>
    <div class="city-item">
      <span class="city-name">Singapore</span>
      <span class="city-weather">30° · Haze</span>
    </div>
    <div class="city-item">
      <span class="city-name">Vancouver</span>
      <span class="city-weather">16° · Cloudy</span>
    </div>
  </div>
</div>

<style scoped>
  .favorites-card {
    border-radius: 20px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .fav-header {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .fav-star-icon {
    color: var(--accent-blue);
  }
  .fav-title {
    font-family: 'Geist', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: var(--text-title);
  }

  .fav-cities {
    display: flex;
    gap: 10px;
    width: 100%;
  }

  .city-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 10px 12px;
    border-radius: 14px;
    background: var(--card-inner-bg);
  }
  .city-name {
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 700;
    color: var(--text-label);
  }
  .city-weather {
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 700;
    color: var(--text-title-dark);
  }
</style>
