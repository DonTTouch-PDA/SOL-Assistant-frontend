'use client';

import React, { useEffect, useRef } from 'react';
import { createChart, HistogramSeries, ColorType } from 'lightweight-charts';

import { GuruStockData } from '@/types/chart';

interface DualHistogramChartProps {
	data: GuruStockData[];
	height?: number;
}
export default function GuruTradeChart({ data }: DualHistogramChartProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const chartRef = useRef<ReturnType<typeof createChart> | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const chart = createChart(containerRef.current, {
			width: containerRef.current.clientWidth,
			height: containerRef.current.clientHeight,
			layout: {
				background: { type: ColorType.Solid, color: '#ffffff' },
				textColor: '#333',
			},
			rightPriceScale: { scaleMargins: { top: 0.1, bottom: 0.1 } },
			timeScale: {
				borderVisible: false,
				rightOffset: 30, // 오른쪽에 여백을 두어 데이터를 왼쪽으로 밀어냄
			},
			grid: {
				vertLines: { visible: false },
				horzLines: { color: '#eee' },
			},
		});
		chartRef.current = chart;

		// 매수/매도 시리즈 추가
		const buySeries = chart.addSeries(HistogramSeries, {
			color: '#2979FF',
			priceFormat: { type: 'volume' },
		});

		const sellSeries = chart.addSeries(HistogramSeries, {
			color: '#FF5252',
			priceFormat: { type: 'volume' },
		});

		// 데이터 설정
		const formattedBuyData = data
			.map((d) => ({ time: d.time, value: d.buyVolume }))
			.filter((d) => !isNaN(d.value));
		const formattedSellData = data
			.map((d) => ({ time: d.time, value: -d.sellVolume }))
			.filter((d) => !isNaN(d.value));

		buySeries.setData(formattedBuyData);
		sellSeries.setData(formattedSellData);

		// ✅ 부모 크기 변화 감지 → 자동 리사이즈
		const observer = new ResizeObserver(() => {
			if (containerRef.current && chartRef.current) {
				const { clientWidth, clientHeight } = containerRef.current;
				chartRef.current.resize(clientWidth, clientHeight);
			}
		});
		observer.observe(containerRef.current);

		return () => {
			observer.disconnect();
			chart.remove();
		};
	}, [data]);

	return (
		<div
			ref={containerRef}
			style={{
				width: '100%',
				height: 'calc(100vh - 350px)',
			}}
		/>
	);
}
