'use client';

import React, { useEffect, useRef } from 'react';
import { createChart, HistogramSeries, ColorType } from 'lightweight-charts';

type TradeVolume = {
	time: string;
	buyVolume: number;
	sellVolume: number;
};

interface DualHistogramChartProps {
	data: TradeVolume[];
	height?: number;
}
export default function GuruTradeChart({
	data,
	height = 300,
}: DualHistogramChartProps) {
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

			rightPriceScale: {
				scaleMargins: { top: 0.1, bottom: 0.1 },
			},
			timeScale: {
				borderVisible: false,
			},
			grid: {
				vertLines: { visible: false },
				horzLines: { color: '#eee' },
			},
		});

		//  매수량 (양수)
		const buySeries = chart.addSeries(HistogramSeries, {
			color: '#2979FF',
			priceFormat: { type: 'volume' },
			priceScaleId: 'right',
		});

		// 매도량 (음수)
		const sellSeries = chart.addSeries(HistogramSeries, {
			color: '#FF5252',
			priceFormat: { type: 'volume' },
			priceScaleId: 'right',
		});

		// 매수/매도 데이터 분리 후 설정
		const buyData = data.map((d) => ({ time: d.time, value: d.buyVolume }));
		const sellData = data.map((d) => ({ time: d.time, value: -d.sellVolume }));

		buySeries.setData(buyData);
		sellSeries.setData(sellData);

		// y축 기준선(0)을 중앙에 고정
		chart.priceScale('left').applyOptions({
			autoScale: true,
			invertScale: false,
		});
		chart.priceScale('left').applyOptions({
			scaleMargins: { top: 0.1, bottom: 0.1 },
		});
		// 리사이즈 대응
		const resizeHandler = () => {
			if (containerRef.current)
				chart.resize(containerRef.current.clientWidth, height);
		};
		window.addEventListener('resize', resizeHandler);

		return () => {
			window.removeEventListener('resize', resizeHandler);
			chart.remove();
		};
	}, [data, height]);

	return <div ref={containerRef} style={{ width: '100%', height }} />;
}
