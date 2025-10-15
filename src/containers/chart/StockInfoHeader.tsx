'use client';
import { useState, useEffect } from 'react';
import {
	getStockCodeFromLocalStorage,
	setStockCodeToLocalStorage,
} from '@/utils/stockCodeStorage';
import { fetchStockInfo, fetchStockRiskCheck } from '@/services/chartServices';
import { StockInfo, StockRisk } from '@/types/chart';
import StockTab from '@/components/layout/StockTab';
import RiskItemBadge from '@/components/common/RiskItemBadge';

export default function StockInfoHeader() {
	const [stockCode, setStockCode] = useState<string | null>(null);
	const [stockInfo, setStockInfo] = useState<StockInfo | null>(null);
	const [stockRisk, setStockRisk] = useState<StockRisk | null>(null);

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

			// 비동기 병렬 호출로 stockInfo, stockRisk 동시에 가져오기
			const [info, risk] = await Promise.all([
				fetchStockInfo(currentStockCode),
				fetchStockRiskCheck(currentStockCode),
			]);
			setStockInfo(info as StockInfo);
			setStockRisk(risk as StockRisk);
		};

		loadStockData();
	}, [stockCode]);

	const { prePreviousClose = 0, previousClose = 0 } = stockInfo || {};
	const diff = previousClose - prePreviousClose;
	const isUp = diff > 0;

	return (
		<div>
			<div className="flex justify-between">
				<div className="h-[103px]">
					<p className="text-[30px] font-bold">{stockInfo?.stockName}</p>
					<div className="flex items-center gap-2">
						{!stockRisk?.management && (
							<RiskItemBadge
								riskType={!stockRisk?.management ? '관리종목' : '관리종목'}
							/>
						)}
						{!stockRisk?.delisting && (
							<RiskItemBadge
								riskType={!stockRisk?.delisting ? '정리매매' : '정리매매'}
							/>
						)}
					</div>
				</div>
				<div className="text-right">
					<div className="flex flex-col items-end gap-2">
						<p className="text-[23px] font-semibold">
							{stockInfo?.previousClose.toLocaleString()}원
						</p>
					</div>

					{stockInfo && (
						<div>
							<p
								className={`font-semibold ${
									isUp ? 'text-[#FB4C5E]' : 'text-[#4D8CFB]'
								}`}
							>
								{isUp ? '+' : ''}
								{diff.toLocaleString()}원 (
								{Math.abs((diff / prePreviousClose) * 100).toFixed(2)}%)
							</p>
						</div>
					)}
				</div>
			</div>
			<StockTab />
		</div>
	);
}
