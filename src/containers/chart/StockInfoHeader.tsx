'use client';
import { useState, useEffect } from 'react';
import {
	getStockCodeFromLocalStorage,
	setStockCodeToLocalStorage,
} from '@/utils/storage';
import { fetchStockInfo } from '@/services/chartServices';
import { StockInfo } from '@/types/chart';
import StockTab from '@/components/layout/StockTab';

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

	const { price = 0, prevPrice = 0 } = stockInfo || {};
	const diff = price - prevPrice;
	const isUp = diff > 0;

	return (
		<div>
			<div className="flex justify-between pb-7">
				<div>
					<p className="text-[30px] font-bold">{stockInfo?.stockName}</p>
				</div>
				<div className="text-right">
					<p className="text-2xl font-semibold">
						{stockInfo?.price.toLocaleString()}원
					</p>
					{stockInfo && (
						<div>
							<p
								className={`font-semibold text-${isUp ? '[#FB4C5E]' : '[#4D8CFB]'}`}
							>
								{isUp ? '+' : ''}
								{diff.toLocaleString()}원 (
								{Math.abs((diff / prevPrice) * 100).toFixed(2)}%)
							</p>
						</div>
					)}
				</div>
			</div>
			<StockTab stockCode={stockCode} />
		</div>
	);
}
