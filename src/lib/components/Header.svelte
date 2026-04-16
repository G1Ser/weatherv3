<script lang="ts">
  import { m } from '$lib/paraglide/messages.js';

  interface Props {
    onToggleSettings?: () => void;
  }
  let { onToggleSettings }: Props = $props();
</script>

<!-- Web header -->
<header class="web-header desktop-only">
  <div class="search-box">
    <svg
      class="search-icon"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
    <span class="search-text">{m.search_placeholder()}</span>
  </div>

  <div class="alert-card">
    <span class="alert-title">{m.alert()}</span>
    <span class="alert-msg">Typhoon L3 within 36h</span>
  </div>

  <button class="settings-btn" onclick={onToggleSettings}>
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path
        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
    <span>{m.settings()}</span>
  </button>
</header>

<!-- Mobile: top row (search + set button) -->
<div class="mobile-top-row mobile-only">
  <div class="mobile-search-bar">
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="search-icon"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
    <span class="mobile-search-text">{m.search_placeholder()}</span>
  </div>
  <button class="mobile-settings-btn" onclick={onToggleSettings}>
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
      <path
        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
    <span>Set</span>
  </button>
</div>

<!-- Mobile: alert pill (separate from header) -->
<div class="mobile-alert-pill mobile-only">
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="alert-icon-svg"
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" stroke="#FFF0F4" />
    <path d="M12 17h.01" stroke="#FFF0F4" />
  </svg>
  <span class="alert-pill-text">Typhoon L3 within 36h</span>
</div>

<style scoped>
  /* ===== Desktop header ===== */
  .web-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 88px;
    padding: 18px 22px;
    border-radius: 24px;
    background: var(--header-bg);
    border: 1px solid var(--header-border);
    backdrop-filter: blur(18px);
    width: 100%;
  }

  .search-box {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    border-radius: 16px;
    background: var(--search-bg);
    border: 1px solid var(--search-border);
    width: 620px;
    cursor: pointer;
  }
  .search-icon {
    color: var(--search-icon);
    flex-shrink: 0;
  }
  .search-text {
    font-family: var(--font-body);
    font-size: 15px;
    font-weight: 600;
    color: var(--search-text);
  }

  .alert-card {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 7px 10px;
    border-radius: 9999px;
    background: var(--alert-bg);
    border: 1px solid var(--alert-border);
    width: 210px;
  }
  .alert-title {
    font-family: 'Geist', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: var(--alert-title);
  }
  .alert-msg {
    font-family: var(--font-body);
    font-size: 10px;
    font-weight: 600;
    line-height: 1.45;
    color: var(--alert-text);
  }

  .settings-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 14px;
    border-radius: 16px;
    background: var(--settings-btn-bg);
    border: 1px solid var(--settings-btn-border);
    color: var(--settings-icon);
    cursor: pointer;
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 600;
    transition: opacity 0.2s;
  }
  .settings-btn:hover {
    opacity: 0.8;
  }

  /* ===== Mobile top row ===== */
  .mobile-top-row {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
  }
  .mobile-search-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border-radius: 14px;
    background: var(--search-bg);
    border: 1px solid var(--search-border);
    flex: 1;
    cursor: pointer;
  }
  .mobile-search-text {
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 600;
    color: var(--search-text);
  }
  .mobile-settings-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 9px 10px;
    border-radius: 12px;
    background: var(--settings-btn-bg);
    border: 1px solid var(--settings-btn-border);
    color: var(--settings-icon);
    cursor: pointer;
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 700;
    flex-shrink: 0;
  }

  /* ===== Mobile alert pill ===== */
  .mobile-alert-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 9999px;
    background: var(--alert-bg);
    border: 1px solid var(--alert-border);
    width: fit-content;
  }
  .alert-icon-svg {
    color: var(--alert-title);
    flex-shrink: 0;
  }
  .alert-pill-text {
    font-family: var(--font-body);
    font-size: 10px;
    font-weight: 700;
    color: var(--alert-text);
  }

  /* ===== Responsive visibility ===== */
  .desktop-only {
    display: flex;
  }
  .mobile-only {
    display: none;
  }

  @media (max-width: 480px) {
    .desktop-only {
      display: none;
    }
    .mobile-only {
      display: flex;
    }
  }
</style>
