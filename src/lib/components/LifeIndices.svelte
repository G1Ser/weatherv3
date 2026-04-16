<script lang="ts">
  import { m } from '$lib/paraglide/messages.js';

  const indices = [
    {
      label: m.uv_index(),
      value: 'Moderate',
      desc: 'Use sunscreen SPF30+, avoid long noon exposure',
      valueColor: 'var(--text-value)',
    },
    {
      label: m.sport_index(),
      value: 'Good',
      desc: 'Great for jogging and cycling, keep hydrated',
      valueColor: 'var(--life-good)',
    },
    {
      label: m.clothing(),
      value: 'Jacket',
      desc: 'Morning breeze is cool, carry a light layer',
      valueColor: 'var(--text-value)',
    },
  ];
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
    {#each indices as idx, i (i)}
      <div class="life-item">
        <div class="life-item-meta">
          <span class="life-item-label">{idx.label}</span>
          <span class="life-item-value" style="color: {idx.valueColor};">{idx.value}</span>
        </div>
        <span class="life-item-desc">{idx.desc}</span>
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
  }
  .life-item-desc {
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 500;
    line-height: 1.35;
    color: var(--text-desc);
    flex: 1;
  }

  /* Mobile */
  @media (max-width: 480px) {
    .life-title {
      font-size: 14px;
    }
  }
</style>
