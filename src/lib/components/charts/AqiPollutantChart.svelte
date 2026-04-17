<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts/core';
  import { BarChart } from 'echarts/charts';
  import { GridComponent, TooltipComponent } from 'echarts/components';
  import { CanvasRenderer } from 'echarts/renderers';
  import type { EChartsType } from 'echarts/core';

  echarts.use([BarChart, GridComponent, TooltipComponent, CanvasRenderer]);

  interface PollutantPoint {
    label: string;
    value: number;
    color: string;
  }

  interface Props {
    points?: PollutantPoint[];
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

  function toOption(data: PollutantPoint[]) {
    const xMax = Math.max(...data.map(item => item.value), 1);
    const tooltipBg = cssColor('--chart-tooltip-bg', 'rgba(16, 21, 32, 0.94)');
    const tooltipBorder = cssColor('--chart-tooltip-border', 'rgba(141, 162, 194, 0.35)');
    const tooltipText = cssColor('--chart-tooltip-text', '#eef3ff');
    const axisLabelColor = cssColor('--aqi-chart-axis', '#5f7597');
    const trackColor = cssColor('--aqi-chart-track', 'rgba(133, 152, 183, 0.18)');
    const valueColor = cssColor('--aqi-chart-value', '#4d6390');

    return {
      animationDuration: 650,
      animationEasing: 'cubicOut' as const,
      grid: {
        top: 6,
        right: 12,
        bottom: 4,
        left: 54,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'none' },
        backgroundColor: tooltipBg,
        borderColor: tooltipBorder,
        borderWidth: 1,
        textStyle: {
          color: tooltipText,
          fontFamily: 'Consolas, LXGW, sans-serif',
          fontSize: 12,
        },
        formatter: (params: Array<{ axisValueLabel: string; value: number }>) => {
          const item = params[0];
          if (!item) {
            return '';
          }
          return `${item.axisValueLabel}: ${item.value}`;
        },
      },
      xAxis: {
        type: 'value',
        max: Math.ceil(xMax * 1.12),
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
      },
      yAxis: {
        type: 'category',
        inverse: true,
        data: data.map(item => item.label),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: axisLabelColor,
          fontFamily: 'Consolas, LXGW, sans-serif',
          fontWeight: 700,
          fontSize: 12,
        },
      },
      series: [
        {
          type: 'bar',
          data: data.map(item => item.value),
          barMaxWidth: 14,
          showBackground: true,
          backgroundStyle: {
            color: trackColor,
            borderRadius: [999, 999, 999, 999],
          },
          itemStyle: {
            borderRadius: [999, 999, 999, 999],
            color: (params: { dataIndex: number }) => data[params.dataIndex]?.color || '#79beff',
          },
          label: {
            show: true,
            position: 'right',
            formatter: '{c}',
            distance: 10,
            color: valueColor,
            fontFamily: 'Consolas, LXGW, sans-serif',
            fontWeight: 700,
            fontSize: 12,
          },
          emphasis: {
            focus: 'series',
          },
        },
      ],
    };
  }

  function updateChart(data: PollutantPoint[]) {
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

<div class="pollutant-chart" bind:this={chartEl}></div>

<style scoped>
  .pollutant-chart {
    width: 100%;
    height: 184px;
  }

  @media (max-width: 768px) {
    .pollutant-chart {
      height: 168px;
    }
  }
</style>
