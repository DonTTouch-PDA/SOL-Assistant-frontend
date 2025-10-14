'use client';
import { useState, useEffect } from 'react';
import { FilterType, GuruTrade, GuruType } from '@/types/guru';
import GuruTradingTab from '@/components/guru/GuruTradingTab';
import { fetchGetGuruByTrading } from '@/services/guruServices';

//
export default function GuruTradeContainer() {
	const [isOpenTrading, setIsOpenTrading] = useState(false);
	const [activeFilter, setActiveFilter] = useState<FilterType>('많이 산');
	const [stocks, setStocks] = useState<GuruTrade[]>([]);
	const [guruType, setGuruType] = useState('단기 고수');

	useEffect(() => {
		getGuruItemList();
	}, []);

	const handleGuruTypeChange = (value: string) => {
		setGuruType(value);
		setIsOpenTrading(false);
		getGuruItemList();
	};

	const getGuruItemList = async () => {
		const data = await fetchGetGuruByTrading(
			activeFilter,
			guruType as GuruType
		);
		setStocks(data.stocks);
	};

	const handleToggleTrading = () => {
		setIsOpenTrading(!isOpenTrading);
	};

	const handleFilterChange = (filter: FilterType) => {
		setActiveFilter(filter);
		getGuruItemList();
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
			/>
		</div>
	);
}
