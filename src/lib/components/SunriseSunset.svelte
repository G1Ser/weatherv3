<script lang="ts">
  import { m } from '$lib/paraglide/messages.js';
</script>

<div class="sun-card card-gradient">
  <span class="sun-title">{m.sunrise_sunset()}</span>

  <div class="sun-arc-container card-inner">
    <svg class="sun-arc-svg" viewBox="0 0 600 96" preserveAspectRatio="xMidYMid meet">
      <!-- Arc paths -->
      <path
        d="M 20 60 Q 150 4, 300 28 Q 450 4, 580 60"
        fill="none"
        stroke="var(--sun-arc)"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M 20 64 Q 150 16, 300 36 Q 450 16, 580 64"
        fill="none"
        stroke="var(--sun-arc-shadow)"
        stroke-width="1"
        stroke-linecap="round"
        opacity="0.6"
      />

      <!-- Sun icons (sunrise, zenith, sunset) -->
      <circle cx="20" cy="60" r="6" fill="var(--sun-icon)" opacity="0.9" />
      <circle cx="300" cy="24" r="7" fill="var(--sun-icon)" />
      <circle cx="580" cy="60" r="6" fill="var(--sun-icon)" opacity="0.9" />

      <!-- Labels -->
      <text x="20" y="86" class="sun-time-text" fill="var(--sun-time)">05:21 ↑</text>
      <text x="252" y="86" class="sun-daylight-text" fill="var(--sun-daylight)">{m.daylight()} 13h 23m</text>
      <text x="530" y="86" class="sun-time-text" fill="var(--sun-time)">18:44 ↓</text>
    </svg>
  </div>
</div>

<style scoped>
  .sun-card {
    border-radius: 22px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 190px;
    backdrop-filter: blur(16px);
  }

  .sun-title {
    font-family: 'Geist', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: var(--text-title-dark);
  }

  .sun-arc-container {
    flex: 1;
    border-radius: 14px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
  }

  .sun-arc-svg {
    width: 100%;
    height: 100%;
  }

  .sun-time-text {
    font-family: 'Geist Mono', monospace;
    font-size: 11px;
    font-weight: 700;
  }
  .sun-daylight-text {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 600;
  }

  /* Mobile */
  @media (max-width: 480px) {
    .sun-card {
      padding: 12px;
      gap: 8px;
    }
    .sun-title {
      font-size: 14px;
    }
    .sun-time-text {
      font-size: 10px;
    }
    .sun-daylight-text {
      font-size: 10px;
    }
  }
</style>
