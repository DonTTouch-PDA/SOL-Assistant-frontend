// src/containers/main/ChartContainer.tsx
'use client';
import { useEffect, useState } from 'react';
import { setStockCodeToLocalStorage } from '@/utils/storage';
import { fetchChartData } from '@/services/chartServices';
import MainChart from '@/components/chart/MainChart';

export interface StockCodeProps {
	stockCode: string;
}

export default function ChartContainer({ stockCode }: StockCodeProps) {
	// 종목 코드를 로컬 스토리지에 저장
	useEffect(() => {
		setStockCodeToLocalStorage(stockCode);
	}, [stockCode]);

	const [chartData, setChartData] = useState([]);

	useEffect(() => {
		fetchChartData(stockCode).then((data) => setChartData(data));
	}, [stockCode]);

	return (
		// <div className="p-4 w-full max-w-[430px] min-w-[375px] md:w-[393px]">
		<div className="-mx-5">
			<div className="flex justify-center">
				<MainChart data={chartData} />
			</div>
		</div>
	);
}
