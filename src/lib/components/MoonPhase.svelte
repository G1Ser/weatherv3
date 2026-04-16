<script lang="ts">
  import { m } from '$lib/paraglide/messages.js';
</script>

<div class="moon-card card-gradient">
  <span class="moon-title">{m.moon_phase()}</span>

  <div class="moon-body-container card-inner">
    <!-- Moon info -->
    <div class="moon-info">
      <span class="moon-phase-text">Waxing Gibbous · 71%</span>
      <span class="moon-time">{m.moonrise()} 15:08</span>
      <span class="moon-time">{m.moonset()} 02:11</span>
    </div>

    <!-- Phase dots -->
    <div class="moon-dots">
      <span class="dot dot-1"></span>
      <span class="dot dot-2"></span>
      <span class="dot dot-3"></span>
      <span class="dot dot-2"></span>
      <span class="dot dot-1"></span>
    </div>

    <!-- Moon illustration -->
    <div class="moon-illustration">
      <div class="moon-glow"></div>
      <div class="moon-circle"></div>
      <div class="moon-shadow-overlay"></div>
    </div>
  </div>
</div>

<style scoped>
  .moon-card {
    border-radius: 22px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 190px;
    backdrop-filter: blur(16px);
  }

  .moon-title {
    font-family: 'Geist', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: var(--text-title-dark);
  }

  .moon-body-container {
    flex: 1;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
  }

  .moon-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .moon-phase-text {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 700;
    color: var(--moon-phase-text);
  }
  .moon-time {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 600;
    color: var(--moon-time);
  }

  .moon-dots {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
  .dot-1 {
    background: var(--moon-dot-1);
  }
  .dot-2 {
    background: var(--moon-dot-2);
  }
  .dot-3 {
    background: var(--moon-dot-3);
  }

  .moon-illustration {
    position: relative;
    width: 86px;
    height: 86px;
    flex-shrink: 0;
  }
  .moon-glow {
    position: absolute;
    top: 4px;
    left: 2px;
    width: 78px;
    height: 78px;
    border-radius: 50%;
    background: var(--moon-glow);
  }
  .moon-circle {
    position: absolute;
    top: 12px;
    left: 10px;
    width: 62px;
    height: 62px;
    border-radius: 50%;
    background: var(--moon-body);
  }
  .moon-shadow-overlay {
    position: absolute;
    top: 12px;
    left: 34px;
    width: 50px;
    height: 62px;
    border-radius: 50%;
    background: var(--moon-shadow);
    opacity: 0.6;
  }

  /* Mobile */
  @media (max-width: 480px) {
    .moon-card {
      padding: 12px;
      gap: 8px;
    }
    .moon-title {
      font-size: 14px;
    }
  }
</style>
