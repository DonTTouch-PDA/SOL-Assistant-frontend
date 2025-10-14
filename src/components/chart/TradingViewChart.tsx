'use client';

import React, { useEffect, useRef } from 'react';
import { createChart, CandlestickSeries } from 'lightweight-charts';

type RawCandle = {
	date: string;
	openPrice: number;
	highPrice: number;
	lowPrice: number;
	closePrice: number;
};

interface CandleChartProps {
	data: RawCandle[];
	height?: number;
}

const CandleChart: React.FC<CandleChartProps> = ({ data, height = 500 }) => {
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!containerRef.current || typeof window === 'undefined') return;

		const chart = createChart(containerRef.current, {
			width: containerRef.current.clientWidth,
			height,
			layout: {
				background: { color: '#ffffff' },
				textColor: '#333',
			},
			grid: {
				vertLines: { color: '#eeeeee' },
				horzLines: { color: '#eeeeee' },
			},
			timeScale: {
				timeVisible: true,
			},
		});

		const candleSeries = chart.addSeries(CandlestickSeries, {
			upColor: '#FB4C5E',
			downColor: '#4D8CFB',
			borderVisible: false,
			wickUpColor: '#26a69a',
			wickDownColor: '#ef5350',
		});

		const formatted = data
			.map((d) => ({
				time: d.date,
				open: d.openPrice,
				high: d.highPrice,
				low: d.lowPrice,
				close: d.closePrice,
			}))
			.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

		candleSeries.setData(formatted);

		window.addEventListener('resize', () => {
			chart.resize(containerRef.current!.clientWidth, 300);
		});

		return () => chart.remove();
	}, [data]);

	return <div ref={containerRef} style={{ width: '100%', height: '300px' }} />;
};

export default CandleChart;
