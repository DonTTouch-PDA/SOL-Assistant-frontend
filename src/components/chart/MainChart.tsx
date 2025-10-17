'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
	createChart,
	CandlestickSeries,
	HistogramSeries,
} from 'lightweight-charts';

type RawCandle = {
	date: string;
	openPrice: number;
	highPrice: number;
	lowPrice: number;
	closePrice: number;
	volume?: number;
};

interface CandleChartProps {
	data: RawCandle[];
}

const MainChart: React.FC<CandleChartProps> = ({ data }) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		const updateHeight = () => {
			const headerHeight = 100;
			const bottomMargin = 150;
			const newHeight = window.innerHeight - headerHeight - bottomMargin;
			setHeight(newHeight > 300 ? newHeight : 300);
		};
		updateHeight();
		window.addEventListener('resize', updateHeight);
		return () => window.removeEventListener('resize', updateHeight);
	}, []);

	useEffect(() => {
		if (!containerRef.current || height === 0) return;

		const wrapper = containerRef.current;
		wrapper.innerHTML = '';

		const sorted = [...data].sort(
			(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
		);

		const candleEl = document.createElement('div');
		const divider = document.createElement('div');
		const volumeEl = document.createElement('div');

		candleEl.style.height = `${Math.floor(height * 0.7)}px`;
		candleEl.style.width = '100%';
		divider.style.height = '1px';
		divider.style.background = '#ddd';
		volumeEl.style.height = `${Math.floor(height * 0.3)}px`;
		volumeEl.style.width = '100%';

		wrapper.appendChild(candleEl);
		wrapper.appendChild(divider);
		wrapper.appendChild(volumeEl);

		// 공통 차트 옵션
		const baseOptions = {
			layout: { background: { color: '#fff' }, textColor: '#333' },
			grid: {
				vertLines: { color: '#eee' },
				horzLines: { color: '#eee' },
			},
			crosshair: { mode: 1 },
		};

		// --- 캔들 차트 ---
		const mainChart = createChart(candleEl, {
			...baseOptions,
			timeScale: { timeVisible: true, visible: false },
			rightPriceScale: {
				borderColor: '#ccc',
				scaleMargins: { top: 0.05, bottom: 0.05 },
			},
		});

		const candleSeries = mainChart.addSeries(CandlestickSeries, {
			upColor: '#FB4C5E',
			downColor: '#4D8CFB',
			borderVisible: false,
			wickUpColor: '#FB4C5E',
			wickDownColor: '#4D8CFB',
		});

		const candleData = sorted.map((d) => ({
			time: d.date,
			open: d.openPrice,
			high: d.highPrice,
			low: d.lowPrice,
			close: d.closePrice,
		}));
		candleSeries.setData(candleData);

		// --- 거래량 차트 ---
		const volumeChart = createChart(volumeEl, {
			...baseOptions,
			timeScale: { timeVisible: true },
			rightPriceScale: {
				borderColor: '#ccc',
				scaleMargins: { top: 0.1, bottom: 0 },
			},
		});

		const volumeSeries = volumeChart.addSeries(HistogramSeries, {
			color: '#4D8CFB',
			priceFormat: { type: 'volume' },
		});

		const volData = sorted.map((d, i) => {
			const prevVolume = i > 0 ? sorted[i - 1].volume || 0 : 0;
			const currVolume = d.volume || 0;
			const color = currVolume >= prevVolume ? '#FB4C5E' : '#4D8CFB';

			return {
				time: d.date,
				value: currVolume,
				color,
			};
		});
		volumeSeries.setData(volData);

		// --- 스케일 동기화 ---
		const mainScale = mainChart.timeScale();
		const volScale = volumeChart.timeScale();

		mainScale.subscribeVisibleTimeRangeChange((range) => {
			if (range) volScale.setVisibleRange(range);
		});
		volScale.subscribeVisibleTimeRangeChange((range) => {
			if (range) mainScale.setVisibleRange(range);
		});

		// --- y축 폭 동기화 ---
		setTimeout(() => {
			const mainY = mainChart.priceScale('right').width();
			const volY = volumeChart.priceScale('right').width();
			const maxY = Math.max(mainY, volY);

			mainChart.applyOptions({
				rightPriceScale: { minimumWidth: maxY, borderColor: '#ccc' },
			});
			volumeChart.applyOptions({
				rightPriceScale: { minimumWidth: maxY, borderColor: '#ccc' },
			});
		}, 0);

		// --- 리사이즈 ---
		const handleResize = () => {
			mainChart.resize(wrapper.clientWidth, Math.floor(height * 0.7));
			volumeChart.resize(wrapper.clientWidth, Math.floor(height * 0.3));
		};
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			mainChart.remove();
			volumeChart.remove();
		};
	}, [data, height]);

	return (
		<div
			ref={containerRef}
			style={{
				width: '100%',
				height,
			}}
		/>
	);
};

export default MainChart;
