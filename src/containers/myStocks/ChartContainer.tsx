// src/containers/main/ChartContainer.tsx
'use client';
import { useEffect, useState } from 'react';
import { setStockCodeToLocalStorage } from '@/utils/stockCodeStorage';
import { fetchChartData } from '@/services/chartServices';
import MainChart from '@/components/chart/MainChart';

export default function ChartContainer({ stockCode }: { stockCode: string }) {
	// 종목 코드를 로컬 스토리지에 저장
	useEffect(() => {
		setStockCodeToLocalStorage(stockCode);
		console.log('stockCode', stockCode);
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
