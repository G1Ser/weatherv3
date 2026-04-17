<script lang="ts">
  import { m } from '$lib/paraglide/messages.js';
  import type { AlertItem, Lang } from '$lib/api/weather';

  interface Props {
    onToggleSettings?: () => void;
    alertItem?: AlertItem;
    locale?: Lang;
  }

  let { onToggleSettings, alertItem, locale = 'en' }: Props = $props();
  let isAlertExpanded = $state(false);

  function formatIssuedTime(issuedTime?: string) {
    if (!issuedTime) {
      return '--';
    }

    const issuedDate = new Date(issuedTime);
    if (Number.isNaN(issuedDate.getTime())) {
      return '--';
    }

    const localeTag = locale === 'zh' ? 'zh-CN' : 'en-US';
    const timeText = new Intl.DateTimeFormat(localeTag, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(issuedDate);

    const currentDate = new Date();
    const isToday = currentDate.toDateString() === issuedDate.toDateString();
    if (isToday) {
      return timeText;
    }

    const dateText = new Intl.DateTimeFormat(localeTag, {
      month: '2-digit',
      day: '2-digit',
    }).format(issuedDate);

    return `${dateText} ${timeText}`;
  }

  const alertHeadline = $derived.by(() => alertItem?.headline || alertItem?.headline_zh || 'No active alerts');
  const alertSender = $derived.by(() => alertItem?.senderName || alertItem?.senderName_zh || 'Unknown source');
  const alertIssuedText = $derived.by(() => formatIssuedTime(alertItem?.issuedTime));
  const alertIssuedLabel = $derived.by(() => {
    if (alertIssuedText === '--') {
      return locale === 'zh' ? '时间未知' : 'Unknown time';
    }
    return locale === 'zh' ? `${alertIssuedText}发布` : `Issued ${alertIssuedText}`;
  });
  const alertDescription = $derived.by(
    () => alertItem?.description || alertItem?.description_zh || 'No detail description.'
  );
  const alertCriteria = $derived.by(() => alertItem?.criteria || 'No criteria provided.');
  const alertInstruction = $derived.by(() => alertItem?.instruction || 'No instruction provided.');
</script>

<header class="web-header">
  <div class="header-top-row">
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

    <button class="settings-btn" type="button" onclick={onToggleSettings} aria-label={m.settings()}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
        />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span class="sr-only">{m.settings()}</span>
    </button>
  </div>

  <div class="alert-accordion" data-expanded={isAlertExpanded}>
    <button
      class="alert-summary"
      type="button"
      onclick={() => (isAlertExpanded = !isAlertExpanded)}
      aria-expanded={isAlertExpanded}
      aria-controls="alert-detail"
    >
      <div class="alert-summary-left">
        <span class="alert-time">{alertIssuedLabel}</span>
        <span class="alert-unit">{alertSender}</span>
        <span class="alert-warning">
          <svg
            class="alert-main-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="m10.29 3.86-7.55 13.12a2 2 0 0 0 1.74 3.02h15.1a2 2 0 0 0 1.73-3.02L13.76 3.86a2 2 0 0 0-3.47 0Z"
            />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </svg>
          <span>{alertHeadline}</span>
        </span>
      </div>

      <svg
        class="alert-chevron"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>

    {#if isAlertExpanded}
      <div class="alert-detail" id="alert-detail">
        <div class="alert-divider"></div>

        <p class="alert-description">{alertDescription}</p>

        <div class="detail-section">
          <div class="detail-title-row">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{locale === 'zh' ? '触发条件 (Criteria)' : 'Criteria'}</span>
          </div>
          <p class="detail-box">{alertCriteria}</p>
        </div>

        <div class="detail-section">
          <div class="detail-title-row">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 13c0 5-3.5 7.5-8 10-4.5-2.5-8-5-8-10V6l8-3 8 3v7Z" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
            <span>{locale === 'zh' ? '防护指引 (Instruction)' : 'Instruction'}</span>
          </div>
          <p class="detail-box detail-instruction">{alertInstruction}</p>
        </div>
      </div>
    {/if}
  </div>
</header>

<style scoped>
  .web-header {
    --alert-shell-bg: #f5eed3;
    --alert-shell-border: #e9cd71;
    --alert-main-icon: #cc7a00;
    --alert-warning-text: #8e3f00;
    --alert-unit-bg: #efe2bf;
    --alert-unit-border: #e6d3a4;
    --alert-unit-text: #a96210;
    --alert-time-text: #a96210;
    --alert-chevron-color: #bf7a20;
    --alert-divider: #e8d7a0;
    --alert-description: #9a4e08;
    --alert-title-icon: #a14e00;
    --alert-title-text: #7d3a00;
    --alert-box-bg: #efe6c7;
    --alert-box-border: #e5d5a4;
    --alert-box-text: #9a4e08;

    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 0;
    padding: 16px 22px;
    border-radius: 24px;
    background: var(--header-bg);
    border: 1px solid var(--header-border);
    backdrop-filter: blur(18px);
    width: 100%;
  }

  :global(:root.dark) .web-header {
    --alert-shell-bg: #261f13;
    --alert-shell-border: #6f5525;
    --alert-main-icon: #f3b44d;
    --alert-warning-text: #f6c56e;
    --alert-unit-bg: #3b2f1a;
    --alert-unit-border: #4c3c22;
    --alert-unit-text: #e4b465;
    --alert-time-text: #d8aa5e;
    --alert-chevron-color: #f0b454;
    --alert-divider: #5a4823;
    --alert-description: #d7b179;
    --alert-title-icon: #e4b465;
    --alert-title-text: #f0cc8f;
    --alert-box-bg: #1e180f;
    --alert-box-border: #5a4823;
    --alert-box-text: #d7b179;
  }

  .header-top-row {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 8px;
    align-items: center;
  }

  .search-box {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 18px;
    border-radius: 16px;
    background: var(--search-bg);
    border: 1px solid var(--search-border);
    min-width: 0;
    cursor: pointer;
    transition: transform 180ms ease;
  }

  .search-box:hover {
    transform: translateY(-1px);
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .alert-accordion {
    width: 100%;
    border-radius: 16px;
    background: var(--alert-shell-bg);
    border: 1px solid var(--alert-shell-border);
    overflow: hidden;
  }

  .alert-summary {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 16px;
    border: 0;
    background: transparent;
    cursor: pointer;
    text-align: left;
  }

  .alert-summary-left {
    min-width: 0;
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .alert-main-icon {
    color: var(--alert-main-icon);
    flex-shrink: 0;
  }

  .alert-warning {
    min-width: 0;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    max-width: 100%;
    color: var(--alert-warning-text);
    font-family: var(--font-title);
    font-size: 14px;
    font-weight: 700;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
  }

  .alert-warning span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .alert-unit {
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 700;
    color: var(--alert-unit-text);
    background: var(--alert-unit-bg);
    border: 1px solid var(--alert-unit-border);
    padding: 4px 10px;
    border-radius: 9999px;
    flex-shrink: 0;
  }

  .alert-time {
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 600;
    color: var(--alert-time-text);
    flex-shrink: 0;
  }

  .alert-chevron {
    color: var(--alert-chevron-color);
    flex-shrink: 0;
    transition: transform 180ms ease;
  }

  .alert-accordion[data-expanded='true'] .alert-chevron {
    transform: rotate(180deg);
  }

  .alert-detail {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 16px 14px;
  }

  .alert-divider {
    width: 100%;
    height: 1px;
    background: var(--alert-divider);
  }

  .alert-description {
    font-family: var(--font-body);
    font-size: 12px;
    line-height: 1.45;
    color: var(--alert-description);
    word-break: break-word;
  }

  .detail-section {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .detail-title-row {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--alert-title-text);
    font-family: var(--font-title);
    font-size: 12px;
    font-weight: 700;
  }

  .detail-title-row svg {
    color: var(--alert-title-icon);
    flex-shrink: 0;
  }

  .detail-box {
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 500;
    line-height: 1.45;
    color: var(--alert-box-text);
    background: var(--alert-box-bg);
    border: 1px solid var(--alert-box-border);
    border-radius: 10px;
    padding: 10px 12px;
    word-break: break-word;
  }

  .detail-instruction {
    white-space: pre-line;
  }

  .settings-btn {
    width: 46px;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border-radius: 14px;
    background: var(--settings-btn-bg);
    border: 1px solid var(--settings-btn-border);
    color: var(--settings-icon);
    cursor: pointer;
    transition: transform 180ms ease;
    flex-shrink: 0;
  }

  .settings-btn:hover {
    transform: translateY(-1px);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }

  @media (max-width: 1120px) {
    .web-header {
      padding: 14px;
    }

    .settings-btn {
      width: 44px;
      height: 44px;
    }
  }

  @media (max-width: 768px) {
    .web-header {
      gap: 8px;
      padding: 12px;
    }

    .header-top-row {
      gap: 6px;
    }

    .search-box {
      padding: 10px 12px;
      border-radius: 14px;
      gap: 8px;
    }

    .search-text {
      font-size: 12px;
    }

    .settings-btn {
      width: 42px;
      min-height: 42px;
      border-radius: 12px;
    }

    .alert-accordion {
      border-radius: 14px;
    }

    .alert-summary {
      align-items: flex-start;
      padding: 10px 12px;
      gap: 8px;
    }

    .alert-summary-left {
      align-items: center;
      gap: 4px;
      row-gap: 4px;
    }

    .alert-main-icon {
      width: 14px;
      height: 14px;
    }

    .alert-warning {
      order: 1;
      font-size: 12px;
      max-width: min(100%, 300px);
    }

    .alert-unit {
      order: 2;
      padding: 3px 8px;
      font-size: 10px;
    }

    .alert-time {
      order: 3;
      width: 100%;
      font-size: 10px;
    }

    .alert-chevron {
      width: 14px;
      height: 14px;
    }

    .alert-detail {
      gap: 8px;
      padding: 0 12px 12px;
    }

    .alert-description {
      font-size: 10px;
      line-height: 1.4;
    }

    .detail-title-row {
      font-size: 11px;
    }

    .detail-box {
      border-radius: 8px;
      padding: 8px 10px;
      font-size: 10px;
      line-height: 1.4;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .search-box,
    .settings-btn,
    .alert-chevron {
      transition: none;
    }
  }
</style>
