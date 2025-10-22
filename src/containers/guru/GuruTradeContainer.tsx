'use client';
import { useState, useEffect } from 'react';
import { FilterType, GuruTrade, GuruType } from '@/types/guru';
import GuruTradingTab from '@/components/guru/GuruTradingTab';
import { fetchGetGuruByTrading } from '@/services/guruServices';

//
interface GuruTradeContainerProps {
	guruFilter?: GuruType;
	tradeFilter?: FilterType;
}

export default function GuruTradeContainer({
	guruFilter = 'DAY',
	tradeFilter = 'BUY',
}: GuruTradeContainerProps) {
	const [isOpenTrading, setIsOpenTrading] = useState(false);
	const [activeFilter, setActiveFilter] = useState<FilterType>(tradeFilter);
	const [stocks, setStocks] = useState<GuruTrade[]>([]);
	const [guruType, setGuruType] = useState<GuruType>(guruFilter);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		getGuruItemList();
	}, [activeFilter, guruType]);

	const handleGuruTypeChange = (value: GuruType) => {
		setGuruType(value);
		setIsOpenTrading(false);
	};

	const getGuruItemList = async () => {
		console.log('데이터 재조회', { activeFilter, guruType });
		setIsLoading(true);
		const data = await fetchGetGuruByTrading(
			activeFilter,
			guruType as GuruType
		);
		setStocks(
			data.stockVolumeList.sort(
				(a, b) => b.volumeChangePercent - a.volumeChangePercent
			)
		);
		console.log(data.stockVolumeList);
		setIsLoading(false);
	};

	const handleToggleTrading = () => {
		setIsOpenTrading(!isOpenTrading);
	};

	const handleFilterChange = (filter: FilterType) => {
		setActiveFilter(filter);
	};

	return (
		<div>
			<GuruTradingTab
				guruType={guruType}
				onGuruTypeChange={handleGuruTypeChange}
				isOpen={isOpenTrading}
				onToggle={handleToggleTrading}
				activeFilter={activeFilter}
				onFilterChange={handleFilterChange}
				stocks={stocks}
				isLoading={isLoading}
			/>
		</div>
	);
}
