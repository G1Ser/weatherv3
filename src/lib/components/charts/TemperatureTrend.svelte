<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts/core';
  import { LineChart } from 'echarts/charts';
  import { GridComponent, TooltipComponent } from 'echarts/components';
  import { CanvasRenderer } from 'echarts/renderers';
  import type { EChartsType } from 'echarts/core';

  echarts.use([LineChart, GridComponent, TooltipComponent, CanvasRenderer]);

  interface TrendPoint {
    label: string;
    hi: number;
    lo: number;
  }

  interface Props {
    points?: TrendPoint[];
  }

  let { points = [] }: Props = $props();

  let chartEl = $state<HTMLDivElement | null>(null);
  let chart: EChartsType | null = null;
  let resizeObserver: ResizeObserver | null = null;
  let themeObserver: MutationObserver | null = null;

  function cssColor(name: string, fallback: string) {
    if (!chartEl) {
      return fallback;
    }

    const value = getComputedStyle(chartEl).getPropertyValue(name).trim();
    return value || fallback;
  }

  function toOption(data: TrendPoint[]) {
    const areaStart = cssColor('--forecast-line-lower-fill-start', 'rgba(92, 163, 242, 0.28)');
    const areaMid = cssColor('--forecast-line-lower-shadow', 'rgba(142, 164, 206, 0.26)');
    const areaEnd = cssColor('--forecast-line-lower-fill-end', 'rgba(92, 163, 242, 0.08)');
    const normalized = data.map(item => {
      const hiValue = Number.isFinite(item.hi) ? item.hi : 0;
      const loValue = Number.isFinite(item.lo) ? item.lo : 0;
      return hiValue >= loValue ? { ...item, hi: hiValue, lo: loValue } : { ...item, hi: loValue, lo: hiValue };
    });
    const lowerBound = Math.min(...normalized.map(item => item.lo)) - 2;
    const upperBound = Math.max(...normalized.map(item => item.hi)) + 2;
    const band = normalized.map(item => Math.max(item.hi - item.lo, 0));

    return {
      animationDuration: 700,
      animationEasing: 'cubicOut' as const,
      grid: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 12,
      },
      tooltip: {
        show: false,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: normalized.map(item => item.label),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
      },
      yAxis: {
        type: 'value',
        min: lowerBound,
        max: upperBound,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        splitLine: { show: false },
      },
      series: [
        {
          type: 'line',
          name: 'base',
          stack: 'temp-band',
          data: normalized.map(item => item.lo),
          smooth: 0.38,
          symbol: 'none',
          lineStyle: {
            opacity: 0,
          },
          areaStyle: {
            opacity: 0,
          },
          z: 1,
        },
        {
          type: 'line',
          name: 'band',
          stack: 'temp-band',
          data: band,
          smooth: 0.38,
          symbol: 'none',
          lineStyle: {
            opacity: 0,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: areaStart },
              { offset: 0.55, color: areaMid },
              { offset: 1, color: areaEnd },
            ]),
          },
          z: 2,
        },
      ],
    };
  }

  function updateChart(data: TrendPoint[]) {
    if (!chart || data.length === 0) {
      return;
    }

    chart.setOption(toOption(data), { notMerge: true });
  }

  onMount(() => {
    if (!chartEl) {
      return;
    }

    chart = echarts.init(chartEl);
    updateChart(points);

    resizeObserver = new ResizeObserver(() => {
      chart?.resize();
    });
    resizeObserver.observe(chartEl);

    themeObserver = new MutationObserver(() => {
      updateChart(points);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      resizeObserver?.disconnect();
      themeObserver?.disconnect();
      chart?.dispose();
      resizeObserver = null;
      themeObserver = null;
      chart = null;
    };
  });

  $effect(() => {
    updateChart(points);
  });
</script>

<div class="trend-chart" bind:this={chartEl}></div>

<style scoped>
  .trend-chart {
    width: 100%;
    height: 56px;
    min-width: 680px;
  }

  @media (max-width: 768px) {
    .trend-chart {
      height: 48px;
      min-width: 620px;
    }
  }
</style>
