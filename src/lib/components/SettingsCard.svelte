<script lang="ts">
  import { onMount } from 'svelte';
  import { scale } from 'svelte/transition';
  import { m } from '$lib/paraglide/messages.js';
  import { setLocale } from '$lib/paraglide/runtime';
  import type { Lang, Unit } from '$lib/api/weather';

  interface Props {
    visible?: boolean;
    locale?: Lang;
    unit?: Unit;
    onLocaleChange?: (locale: Lang) => void;
    onUnitChange?: (unit: Unit) => void;
  }

  let { visible = false, locale = 'en', unit = 'm', onLocaleChange, onUnitChange }: Props = $props();

  let isDark = $state(false);

  function applyThemeState(nextDark: boolean) {
    isDark = nextDark;
    document.documentElement.classList.toggle('dark', nextDark);
    localStorage.setItem('weather-theme', nextDark ? 'dark' : 'light');
  }

  function toggleTheme() {
    applyThemeState(!isDark);
  }

  function changeLocale(next: Lang) {
    if (next === locale) {
      return;
    }

    onLocaleChange?.(next);
    setLocale(next, { reload: false });
  }

  function changeUnit(next: Unit) {
    if (next === unit) {
      return;
    }

    onUnitChange?.(next);
  }

  onMount(() => {
    const savedTheme = localStorage.getItem('weather-theme');

    if (savedTheme === 'dark' || savedTheme === 'light') {
      applyThemeState(savedTheme === 'dark');
      return;
    }

    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    applyThemeState(prefersDark);
  });
</script>

{#if visible}
  <div class="settings-card" transition:scale={{ duration: 180, start: 0.96 }}>
    <span class="settings-title">{m.quick_settings()}</span>

    <div class="settings-row">
      <span class="settings-label">{m.theme()}</span>
      <button class="theme-switch" class:active={isDark} onclick={toggleTheme} aria-label={m.theme()}>
        <span class="switch-knob">
          <svg
            class="switch-icon"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            {#if isDark}
              <path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9" />
            {:else}
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            {/if}
          </svg>
        </span>
      </button>
    </div>

    <div class="settings-row">
      <span class="settings-label">{m.language()}</span>
      <div class="option-group">
        <button class="option" class:active={locale === 'zh'} onclick={() => changeLocale('zh')}>中文</button>
        <button class="option" class:active={locale === 'en'} onclick={() => changeLocale('en')}>EN</button>
      </div>
    </div>

    <div class="settings-row">
      <span class="settings-label">{m.unit()}</span>
      <div class="option-group">
        <button class="option" class:active={unit === 'm'} onclick={() => changeUnit('m')}>m</button>
        <button class="option" class:active={unit === 'i'} onclick={() => changeUnit('i')}>i</button>
      </div>
    </div>

    <span class="settings-hint">{m.settings_hint()}</span>
  </div>
{/if}

<style scoped>
  .settings-card {
    position: absolute;
    top: 56px;
    right: 0;
    width: min(360px, calc(100% - 8px));
    padding: 16px;
    border-radius: 18px;
    background: var(--settings-bg);
    border: 1px solid var(--settings-border);
    backdrop-filter: blur(18px);
    box-shadow: var(--settings-shadow);
    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 120;
  }

  .settings-title {
    font-family: 'Geist', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: var(--text-title);
  }

  .settings-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 8px 0;
    width: 100%;
  }

  .settings-label {
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 600;
    color: var(--settings-label);
  }

  .theme-switch {
    position: relative;
    width: 66px;
    height: 34px;
    border-radius: 9999px;
    background: linear-gradient(135deg, #9ab7f2 0%, #708bd7 100%);
    border: 1px solid #b8c9f0;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: inset 0 1px 6px rgba(255, 255, 255, 0.35);
    overflow: hidden;
  }

  .switch-knob {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #fff;
    box-shadow:
      0 3px 10px rgba(22, 34, 62, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
    transition:
      transform 0.25s ease,
      background 0.25s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f0a82a;
  }

  .switch-icon {
    opacity: 0.9;
  }

  .theme-switch.active .switch-knob {
    transform: translateX(32px);
    background: #0f172a;
    color: #d9e2f9;
  }

  .theme-switch.active {
    background: linear-gradient(135deg, #1f2a47 0%, #0b1222 100%);
    border-color: #2f4269;
    box-shadow: inset 0 1px 8px rgba(4, 8, 18, 0.65);
  }

  .theme-switch::after {
    content: '';
    position: absolute;
    inset: 6px;
    border-radius: 9999px;
    background: radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.25) 0%, transparent 48%);
    pointer-events: none;
  }

  .option-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .option {
    min-width: 46px;
    min-height: 40px;
    padding: 8px 12px;
    border-radius: 9999px;
    font-family: var(--font-body);
    font-size: 16px;
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

  @media (max-width: 1120px) {
    .settings-card {
      width: min(420px, calc(100% - 8px));
    }
  }

  @media (max-width: 768px) {
    .settings-card {
      top: 50px;
      right: 0;
      width: min(340px, calc(100% - 8px));
      padding: 14px;
      border-radius: 24px;
    }

    .settings-title {
      font-size: 16px;
    }

    .option {
      min-width: 44px;
      min-height: 36px;
      font-size: 14px;
      padding: 6px 12px;
    }
  }
</style>
