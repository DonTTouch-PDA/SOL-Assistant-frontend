'use client';
import { useState, useEffect } from 'react';
import {
	getStockCodeFromLocalStorage,
	setStockCodeToLocalStorage,
} from '@/utils/storage';
import { fetchStockInfo } from '@/services/chartServices';
import { StockInfo } from '@/types/chart';

export default function StockInfoHeader() {
	const [stockCode, setStockCode] = useState<string | null>(null);
	const [stockInfo, setStockInfo] = useState<StockInfo | null>(null);

	useEffect(() => {
		const loadStockData = async () => {
			// 로컬 스토리지에서 stockCode 불러오기
			let currentStockCode = getStockCodeFromLocalStorage();

			// stockCode가 없으면 기본값 설정
			if (!currentStockCode) {
				currentStockCode = '005930';
				setStockCodeToLocalStorage(currentStockCode);
			}

			setStockCode(currentStockCode);

			// 비동기로 stockInfo 가져오기
			const info = await fetchStockInfo(currentStockCode);
			setStockInfo(info as StockInfo);
		};

		loadStockData();
	}, [stockCode]);

	return (
		<div className="flex justify-between">
			<div>
				<p className="text-[30px] font-bold">{stockInfo?.stockName}</p>
			</div>
			<div>
				<p>{stockInfo?.price}</p>
				<p>
					{stockInfo && stockInfo.price - stockInfo.prevPrice > 0 ? '+' : ''}
					{stockInfo &&
						(
							((stockInfo.price - stockInfo.prevPrice) / stockInfo.prevPrice) *
							100
						).toFixed(2)}
					%
				</p>
			</div>
		</div>
	);
}
