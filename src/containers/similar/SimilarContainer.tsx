'use client';
import { useEffect, useState, useCallback } from 'react';
import { SignalType } from '@/types/similar';
import FilterButtons from '@/components/common/FilterButtons';
import { FilterOption } from '@/components/common/FilterButtons';
import { SimilarChart } from '@/types/similar';
import StockListItemCard from '@/components/common/StockListItemCard';
import { fetchGetSignalList } from '@/services/signalServices';
import SimilarDetailContainer from './SimilarDetailContainer';

export default function SimilarChartContainer() {
	const [hasStockFilter, setHasStockFilter] = useState('보유');
	const [signalType, setSignalType] = useState<SignalType>('매수');
	const signalOptions: FilterOption<SignalType>[] = [
		{ value: '매수', label: '매수신호' },
		{ value: '매도', label: '매도신호' },
	];
	const [stocks, setStocks] = useState<SimilarChart[]>([]);

	// 상세 종목 코드
	const [selectedStock, setSelectedStock] = useState<SimilarChart | null>(null);

	const getSignalList = useCallback(async () => {
		try {
			const data = await fetchGetSignalList(hasStockFilter, signalType);
			setStocks(data.stocks);
		} catch (error) {
			console.error('신호 조회 실패:', error);
		}
	}, [hasStockFilter, signalType]);

	useEffect(() => {
		getSignalList();
	}, [getSignalList]);
	return (
		<div className="w-full mt-[26px]">
			<div className="flex border-b mb-[16px] border-gray-200 relative">
				<button
					onClick={() => {
						setHasStockFilter('보유');
						setSignalType('매수');
					}}
					className={`flex-1 pb-1 text-center transition-colors duration-300 ${
						hasStockFilter === '보유' ? 'text-black' : 'text-gray-500'
					}`}
				>
					보유
				</button>
				<button
					onClick={() => {
						setHasStockFilter('전체');
						setSignalType('매수');
					}}
					className={`flex-1 pb-1 text-center transition-colors duration-300 ${
						hasStockFilter === '전체' ? 'text-black' : 'text-gray-500'
					}`}
				>
					전체
				</button>

				<div
					className={`absolute bottom-0 h-0.5 bg-black transition-all duration-300 ease-in-out ${
						hasStockFilter === '보유' ? 'left-0 w-1/2' : 'left-1/2 w-1/2'
					}`}
				/>
			</div>
			<FilterButtons
				activeFilter={signalType}
				onFilterChange={setSignalType}
				options={signalOptions}
			/>
			{stocks.map((stock, index) => (
				<StockListItemCard
					key={stock.code}
					name={stock.name}
					img={stock.img}
					code={stock.code}
					rank={index}
					onClick={() => {
						setSelectedStock(stock);
					}}
					currentPrice={stock.currentPrice}
					changeRate={stock.changeRate}
					volume={stock.amount}
					detail="volume"
				/>
			))}
			{selectedStock && (
				<SimilarDetailContainer
					stockCode={selectedStock.code}
					stockName={selectedStock.name}
					onclose={() => setSelectedStock(null)}
				/>
			)}
		</div>
	);
}
