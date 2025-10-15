import React from 'react';
import CustomDropdown from '@/components/common/CustomDropdown';
import FilterButtons from '@/components/guru/FilterButtons';
import { FilterType, GuruTrade } from '@/types/guru';
import StockListItemCard from '@/components/common/StockListItemCard';

interface GuruTradingTabProps {
	guruType: string;
	onGuruTypeChange: (value: string) => void;
	isOpen: boolean;
	onToggle: () => void;
	activeFilter: FilterType;
	onFilterChange: (filter: FilterType) => void;
	stocks: GuruTrade[];
}

export default function GuruTradingTab({
	guruType,
	onGuruTypeChange,
	isOpen,
	onToggle,
	activeFilter,
	onFilterChange,
	stocks,
}: GuruTradingTabProps) {
	return (
		<div className="animate-fadeIn">
			<div className="flex items-center pb-[16px] justify-between">
				<FilterButtons
					activeFilter={activeFilter}
					onFilterChange={onFilterChange}
				/>
				<CustomDropdown
					options={['단기 고수', '중기 고수', '장기 고수']}
					setSortedBy={guruType}
					isOpen={isOpen}
					onToggle={onToggle}
					fetchSortedBy={onGuruTypeChange}
				/>
			</div>
			{stocks.map((stock, index) => (
				<StockListItemCard
					key={stock.code}
					rank={index}
					name={stock.name}
					img={stock.img}
					code={stock.code}
					currentPrice={stock.currentPrice}
					changeRate={stock.changeRate}
					volumeRate={stock.buyRate}
					detail="buy"
					onClick={() => {}}
				/>
			))}
		</div>
	);
}
