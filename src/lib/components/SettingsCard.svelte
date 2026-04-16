<script lang="ts">
  import { m } from '$lib/paraglide/messages.js';

  interface Props {
    visible?: boolean;
  }
  let { visible = false }: Props = $props();

  let isDark = $state(false);

  function toggleTheme() {
    isDark = !isDark;
    document.documentElement.classList.toggle('dark', isDark);
  }
</script>

{#if visible}
  <div class="settings-card">
    <span class="settings-title">{m.quick_settings()}</span>

    <!-- Theme -->
    <div class="settings-row">
      <span class="settings-label">{m.theme()}</span>
      <button class="theme-switch" class:active={isDark} onclick={toggleTheme} aria-label="切换深色/浅色主题">
        <span class="switch-knob"></span>
      </button>
    </div>

    <!-- Language -->
    <div class="settings-row">
      <span class="settings-label">{m.language()}</span>
      <div class="option-group">
        <button class="option active">中文</button>
        <button class="option">EN</button>
      </div>
    </div>

    <!-- Unit -->
    <div class="settings-row">
      <span class="settings-label">{m.unit()}</span>
      <div class="option-group">
        <button class="option active">m</button>
        <button class="option">i</button>
      </div>
    </div>

    <span class="settings-hint">{m.settings_hint()}</span>
  </div>
{/if}

<style scoped>
  .settings-card {
    position: absolute;
    top: 102px;
    right: 24px;
    width: 290px;
    padding: 14px;
    border-radius: 18px;
    background: var(--settings-bg);
    border: 1px solid var(--settings-border);
    backdrop-filter: blur(18px);
    box-shadow: var(--settings-shadow);
    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 50;
  }

  .settings-title {
    font-family: 'Geist', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-title);
  }

  .settings-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
    width: 100%;
  }

  .settings-label {
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 600;
    color: var(--settings-label);
  }

  .theme-switch {
    position: relative;
    width: 46px;
    height: 24px;
    border-radius: 9999px;
    background: var(--settings-switch-bg);
    border: none;
    cursor: pointer;
    transition: background 0.3s;
  }
  .switch-knob {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--settings-switch-knob);
    transition: transform 0.3s;
  }
  .theme-switch.active .switch-knob {
    transform: translateX(22px);
  }

  .option-group {
    display: flex;
    gap: 6px;
  }
  .option {
    padding: 6px 10px;
    border-radius: 9999px;
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid transparent;
    background: var(--settings-option-bg);
    color: var(--settings-option-text);
    transition: all 0.2s;
  }
  .option.active {
    background: var(--settings-option-active-bg);
    border-color: var(--settings-option-active-border);
    color: var(--settings-option-active-text);
  }

  .settings-hint {
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 500;
    color: var(--settings-hint);
  }

  /* Mobile */
  @media (max-width: 480px) {
    .settings-card {
      top: 50px;
      right: 16px;
      left: 16px;
      width: auto;
      padding: 12px;
    }
    .settings-title {
      font-size: 14px;
    }
  }
</style>
