import { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart, ScatterChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([BarChart, LineChart, PieChart, ScatterChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent, CanvasRenderer]);

interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'scatter';
  title?: string;
  labels: string[];
  datasets: {
    name: string;
    values: number[];
  }[];
  xLabel?: string;
  yLabel?: string;
}

interface Props {
  data: ChartData;
  height?: number;
}

export default function ChartCard({ data, height = 300 }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current, 'dark');
    }

    const option: any = {
      backgroundColor: 'transparent',
      title: data.title ? { text: data.title, textStyle: { color: '#94a3b8', fontSize: 12 } } : undefined,
      tooltip: { trigger: 'axis' },
      legend: { 
        data: data.datasets.map(d => d.name),
        textStyle: { color: '#94a3b8', fontSize: 11 },
        bottom: 0,
      },
      grid: { left: '3%', right: '4%', bottom: '15%', top: data.title ? '15%' : '5%', containLabel: true },
      xAxis: { 
        type: 'category', 
        data: data.labels,
        axisLabel: { color: '#64748b', fontSize: 10 },
        name: data.xLabel,
      },
      yAxis: { 
        type: 'value',
        axisLabel: { color: '#64748b', fontSize: 10 },
        name: data.yLabel,
        splitLine: { lineStyle: { color: '#1e293b' } },
      },
      series: data.datasets.map(d => ({
        name: d.name,
        type: data.type,
        data: d.values,
        itemStyle: { borderRadius: data.type === 'bar' ? [4, 4, 0, 0] : undefined },
      })),
    };

    chartInstance.current.setOption(option);

    const handleResize = () => chartInstance.current?.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: `${height}px` }} />;
}