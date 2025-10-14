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

const CandleChart: React.FC<CandleChartProps> = ({ data }) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		const updateHeight = () => {
			const headerHeight = 100;
			const bottomMargin = 145;
			const newHeight = window.innerHeight - headerHeight - bottomMargin;
			setHeight(newHeight > 300 ? newHeight : 300); // 최소 300px 보장
		};
		updateHeight();
		window.addEventListener('resize', updateHeight);
		return () => window.removeEventListener('resize', updateHeight);
	}, []);

	useEffect(() => {
		if (!containerRef.current || height === 0) return;

		const wrapper = containerRef.current;
		wrapper.innerHTML = '';

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

		const baseOptions = {
			layout: { background: { color: '#fff' }, textColor: '#333' },
			grid: {
				vertLines: { color: '#eee' },
				horzLines: { color: '#eee' },
			},
			crosshair: { mode: 1 },
		};

		// 캔들차트
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

		// 거래량차트
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

		const volData = data
			.map((d) => ({
				time: d.date,
				value: d.volume || 0,
				color: d.closePrice >= d.openPrice ? '#FB4C5E' : '#4D8CFB',
			}))
			.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
		volumeSeries.setData(volData);

		//스케일 동기화
		const mainScale = mainChart.timeScale();
		const volScale = volumeChart.timeScale();

		mainScale.subscribeVisibleTimeRangeChange((range) => {
			if (range) volScale.setVisibleRange(range);
		});
		volScale.subscribeVisibleTimeRangeChange((range) => {
			if (range) mainScale.setVisibleRange(range);
		});

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

		// 리사이즈 - 렌더링후 y축 폭 맞추기 위해
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

export default CandleChart;
