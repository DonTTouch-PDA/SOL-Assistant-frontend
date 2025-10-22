'use client';
import { useState, useEffect, useRef } from 'react';
import {
	getStockCodeFromLocalStorage,
	setStockCodeToLocalStorage,
} from '@/utils/stockCodeStorage';
import { fetchStockInfo, fetchStockRiskCheck } from '@/services/chartServices';
import { StockInfo, StockRisk } from '@/types/chart';
import StockTab from '@/components/layout/StockTab';
import RiskItemBadge from '@/components/common/RiskItemBadge';
import { useAuth } from '@/hooks/useAuth';

export default function StockInfoHeader() {
	const [stockCode, setStockCode] = useState<string | null>(null);
	const [stockInfo, setStockInfo] = useState<StockInfo | null>(null);
	const [stockRisk, setStockRisk] = useState<StockRisk | null>(null);
	const actionScore = useRef<number>(5);
	const { userData } = useAuth();

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

	// 점수 쌓기
	useEffect(() => {
		const interval = setInterval(() => {
			actionScore.current += 0.1;
		}, 5000);

		// 로그 전송
		const sendLog = async () => {
			if (actionScore.current === 5) return;

			navigator.sendBeacon(
				'/api/chart/log-buffer',
				JSON.stringify({
					userId: userData?.id,
					stockId: stockCode,
					deltaScore: actionScore.current > 3 ? 3 : actionScore.current,
					eventTime: new Date().toISOString(),
				})
			);
			actionScore.current = 0;
		};

		window.addEventListener('사용자 로그 추가', sendLog);
		window.addEventListener('사용자 페이지 변경', () => {
			if (document.visibilityState === 'hidden') {
				sendLog();
			}
		});
		return () => {
			clearInterval(interval);
			sendLog();
			window.removeEventListener('사용자 로그 추가', sendLog);
		};
	}, [stockCode, userData]);

	const { prePreviousClose = 0, previousClose = 0 } = stockInfo || {};
	const diff = previousClose - prePreviousClose;
	const isUp = diff > 0;

	return (
		<div>
			<div className="flex justify-between">
				<div className="h-[90px]">
					<p
						className={`${stockInfo?.stockName.length && stockInfo?.stockName.length > 6 ? 'text-[25px]' : 'text-[30px]'} font-bold`}
					>
						{stockInfo?.stockName}
					</p>
					<div className="flex items-center gap-2">
						{stockRisk?.management && (
							<RiskItemBadge
								riskType={stockRisk.management ? '관리종목' : '관리종목'}
							/>
						)}
						{stockRisk?.delisting && (
							<RiskItemBadge
								riskType={stockRisk.delisting ? '정리매매' : '정리매매'}
							/>
						)}
					</div>
				</div>
				<div className="text-right">
					<div className="flex flex-col items-end gap-2">
						<p
							className={`text-[${(stockInfo?.previousClose?.toString().length || 0) > 6 ? '20px' : '23px'}] font-semibold`}
						>
							{stockInfo?.previousClose.toLocaleString()}원
						</p>
					</div>

					{stockInfo && (
						<div>
							<p
								className={`font-semibold ${
									isUp ? 'text-[#FB4C5E]' : 'text-[#4D8CFB]'
								} ${diff.toLocaleString().length > 5 ? 'text-[15px]' : 'text-[20px]'}`}
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
