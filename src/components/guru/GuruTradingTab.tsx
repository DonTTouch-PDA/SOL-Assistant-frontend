import React from 'react';
import CustomDropdown from '@/components/common/CustomDropdown';
import FilterButtons from '@/components/guru/FilterButtons';
import { FilterType, GuruTrade, GuruType } from '@/types/guru';
import StockListItemCard from '@/components/common/StockListItemCard';

interface GuruTradingTabProps {
	guruType: GuruType;
	onGuruTypeChange: (value: GuruType) => void;
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
				<CustomDropdown<string>
					options={['단기 고수', '중기 고수', '장기 고수']}
					setSortedBy={
						guruType === 'DAY'
							? '단기 고수'
							: guruType === 'SWING'
								? '중기 고수'
								: guruType === 'HOLD'
									? '장기 고수'
									: '단기 고수'
					}
					isOpen={isOpen}
					onToggle={onToggle}
					fetchSortedBy={(label) => {
						const typeMap: Record<string, GuruType> = {
							'단기 고수': 'DAY',
							'중기 고수': 'SWING',
							'장기 고수': 'HOLD',
						};
						onGuruTypeChange(typeMap[label] || 'DAY');
					}}
				/>
			</div>
			{stocks.map((stock, index) => (
				<StockListItemCard
					key={stock.stockSymbol}
					rank={index}
					name={stock.stockName}
					img={`https://static.toss.im/png-icons/securities/icn-sec-fill-${stock.stockSymbol}.png`}
					code={stock.stockSymbol}
					currentPrice={stock.todayClosePrice}
					changeRate={stock.priceChangePercent}
					volumeRate={stock.volumeChangePercent}
					detail={activeFilter}
					onClick={() => {}}
				/>
			))}
		</div>
	);
}
