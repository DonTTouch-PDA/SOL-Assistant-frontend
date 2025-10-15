import React, { useEffect, useRef } from 'react';
import {
	createChart,
	ColorType,
	LineSeries,
	AreaSeries,
} from 'lightweight-charts';

interface DataPoint {
	time: string; // 'YYYY-MM-DD' 형식
	value: number;
}

interface TimeChartProps {
	data: DataPoint[];
	height?: number;
}
export default function GuruRetentionChart({
	data,
	height = 300,
}: TimeChartProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const chart = createChart(containerRef.current, {
			width: containerRef.current.clientWidth,
			height,
			layout: {
				background: { type: ColorType.Solid, color: '#ffffff' },
				textColor: '#333',
			},
			grid: {
				vertLines: { color: '#eee' },
				horzLines: { color: '#eee' },
			},
			rightPriceScale: {
				visible: true,
				borderVisible: true,
			},
			timeScale: {
				borderVisible: true,
				timeVisible: true,
				secondsVisible: false,
			},
		});

		const areaSeries = chart.addSeries(AreaSeries, {
			lineColor: '#2962FF',
			topColor: '#2962FF',
			bottomColor: 'rgba(41, 98, 255, 0.28)',
		});

		areaSeries.setData(data);

		// 반응형 리사이즈
		const resize = () =>
			chart.applyOptions({ width: containerRef.current!.clientWidth });
		window.addEventListener('resize', resize);

		return () => {
			window.removeEventListener('resize', resize);
			chart.remove();
		};
	}, [data, height]);

	return <div ref={containerRef} style={{ width: '100%', height }} />;
}
