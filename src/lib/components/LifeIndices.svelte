<script lang="ts">
  import { m } from '$lib/paraglide/messages.js';
  import type { Lang, LifeIndexItem } from '$lib/api/weather';

  interface Props {
    indices?: LifeIndexItem[];
    locale?: Lang;
  }

  let { indices = [], locale = 'en' }: Props = $props();

  const fallback: LifeIndexItem[] = [
    {
      date: '2026-04-15',
      type: '5',
      name: 'UV Index',
      name_zh: '紫外线指数',
      level: '2',
      category: 'Moderate',
      category_zh: '中等',
      text: 'Use sunscreen SPF30+ when outdoors around noon.',
      text_zh: '中午外出建议涂抹 SPF30+ 防晒霜。',
    },
    {
      date: '2026-04-15',
      type: '1',
      name: 'Sport Index',
      name_zh: '运动指数',
      level: '1',
      category: 'Good',
      category_zh: '适宜',
      text: 'Great for jogging and cycling, stay hydrated.',
      text_zh: '适合慢跑和骑行，注意补水。',
    },
    {
      date: '2026-04-15',
      type: '3',
      name: 'Clothing',
      name_zh: '穿衣指数',
      level: '2',
      category: 'Light Jacket',
      category_zh: '薄外套',
      text: 'A light jacket is recommended for morning and evening.',
      text_zh: '早晚稍凉，建议携带轻薄外套。',
    },
  ];

  const list = $derived((indices.length > 0 ? indices : fallback).slice(0, 3));

  function localizedLabel(item: LifeIndexItem) {
    return locale === 'zh' ? item.name_zh || item.name : item.name;
  }

  function localizedCategory(item: LifeIndexItem) {
    return locale === 'zh' ? item.category_zh || item.category : item.category;
  }

  function localizedText(item: LifeIndexItem) {
    return locale === 'zh' ? item.text_zh || item.text : item.text;
  }
</script>

<div class="life-card card-gradient">
  <div class="life-header">
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="life-icon"
    >
      <path
        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
      />
      <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
    </svg>
    <span class="life-title">{m.life_indices()}</span>
  </div>

  <div class="life-list">
    {#each list as item, i (item.type + i)}
      <div class="life-item">
        <div class="life-item-meta">
          <span class="life-item-label">{localizedLabel(item)}</span>
          <span class="life-item-value">{localizedCategory(item)}</span>
        </div>
        <span class="life-item-desc">{localizedText(item)}</span>
      </div>
    {/each}
  </div>
</div>

<style scoped>
  .life-card {
    border-radius: 20px;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .life-header {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .life-icon {
    color: var(--accent-blue);
  }

  .life-title {
    font-family: 'Geist', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: var(--text-title);
  }

  .life-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  .life-item {
    display: flex;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 12px;
    background: var(--life-item-bg);
    align-items: flex-start;
  }

  .life-item-meta {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 120px;
  }

  .life-item-label {
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 600;
    color: var(--text-muted);
  }

  .life-item-value {
    font-family: var(--font-mono);
    font-size: 18px;
    font-weight: 700;
    color: var(--life-good);
  }

  .life-item-desc {
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 500;
    line-height: 1.35;
    color: var(--text-desc);
    flex: 1;
  }

  @media (max-width: 768px) {
    .life-item {
      flex-direction: column;
      gap: 6px;
    }

    .life-item-meta {
      min-width: 0;
    }
  }

  @media (max-width: 480px) {
    .life-title {
      font-size: 14px;
    }
  }
</style>
