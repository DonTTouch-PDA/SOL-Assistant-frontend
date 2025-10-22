'use client';
import { useEffect, useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';

import { SignalType, SimilarStock } from '@/types/similar';
import FilterButtons from '@/components/common/FilterButtons';
import { FilterOption } from '@/components/common/FilterButtons';
import StockListItemCard from '@/components/common/StockListItemCard';
import SimilarDetailContainer from './SimilarDetailContainer';
import UnderLinedTab from '@/components/layout/UnderLinedTab';
import {
	fetchMyStockSimilarChart,
	fetchAllStockSimilarChart,
} from '@/services/similarServices';

interface SelectedStockType {
	stockCode: string;
	stockName: string;
}

export default function SimilarChartContainer() {
	const [hasStockFilter, setHasStockFilter] = useState('보유');
	const [signalType, setSignalType] = useState<SignalType>('sell');
	const signalOptions: FilterOption<SignalType>[] = [
		{ value: 'buy', label: '매수신호' },
		{ value: 'sell', label: '매도신호' },
	];
	const [stocks, setStocks] = useState<SimilarStock[]>([]);

	// 상세 종목 코드
	const [selectedStock, setSelectedStock] = useState<SelectedStockType | null>(
		null
	);

	const getSignalList = useCallback(async () => {
		try {
			if (hasStockFilter === '보유') {
				const data = await fetchMyStockSimilarChart(signalType);
				setStocks(data);
			} else {
				const data = await fetchAllStockSimilarChart(signalType);
				setStocks(data);
			}
		} catch (error) {
			console.error('유사 차트 조회 실패:', error);
		}
	}, [hasStockFilter, signalType]);

	useEffect(() => {
		getSignalList();
	}, [getSignalList]);

	const tabList = [
		{ id: '보유', label: '보유' },
		{ id: '전체', label: '전체' },
	];
	return (
		<div className="w-full mt-[26px]">
			<UnderLinedTab
				tabList={tabList}
				currentTab={hasStockFilter}
				onClick={(tab) => {
					setHasStockFilter(tab);
					setSignalType(tab === '보유' ? 'sell' : 'buy');
				}}
			/>
			<FilterButtons
				activeFilter={signalType}
				onFilterChange={setSignalType}
				options={signalOptions}
			/>
			{stocks.map((stock, index) => (
				<StockListItemCard
					key={index}
					name={stock.name}
					img={`https://static.toss.im/png-icons/securities/icn-sec-fill-${stock.stock_code}.png`}
					code={stock.stock_code}
					rank={index}
					onClick={() => {
						setSelectedStock({
							stockCode: stock.stock_code,
							stockName: stock.name,
						});
					}}
					currentPrice={stock.currentPrice}
					changeRate={stock.change_rate}
					volume={stock.today_volume}
					detail="volume"
				/>
			))}
			<AnimatePresence>
				{selectedStock && (
					<SimilarDetailContainer
						stockCode={selectedStock.stockCode}
						stockName={selectedStock.stockName}
						signalType={signalType}
						onclose={() => setSelectedStock(null)}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}
