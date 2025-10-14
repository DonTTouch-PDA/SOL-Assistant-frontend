// src/containers/main/ChartContainer.tsx
'use client';
import { useEffect } from 'react';
import { setStockCodeToLocalStorage } from '@/utils/storage';

interface StockCodeProps {
	stockCode: string;
}

export default function ChartContainer({ stockCode }: StockCodeProps) {
	// 종목 코드를 로컬 스토리지에 저장
	useEffect(() => {
		setStockCodeToLocalStorage(stockCode);
	}, [stockCode]);

	return (
		<div className="p-4 w-full max-w-[430px] min-w-[375px] md:w-[393px]">
			<h1 className="text-xl font-bold mb-4 px-2">차트 - {stockCode}</h1>
			<div className="p-4 bg-gray-50 rounded-lg mx-2">
				<p className="text-gray-600">차트 차트</p>
				<p className="text-sm text-blue-600 mt-2">Blob 값: {stockCode}</p>
			</div>
		</div>
	);
}
