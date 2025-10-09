import React from 'react';
import CustomDropdown from '@/components/common/customDropdown';
import UserFilterButtons from '@/components/guru/UserFilterButtons';
import { GuruView, UserFilterType } from '@/types/guru';
import StockListItemCard from '@/components/common/stockListItemCard';

interface GuruViewingTabProps {
	guruType: string;
	onGuruTypeChange: (value: string) => void;
	isOpen: boolean;
	onToggle: () => void;
	userFilter: UserFilterType;
	onUserFilterChange: (filter: UserFilterType) => void;
	viewingStocks: GuruView[];
}

export default function GuruViewingTab({
	guruType,
	onGuruTypeChange,
	isOpen,
	onToggle,
	userFilter,
	onUserFilterChange,
	viewingStocks,
}: GuruViewingTabProps) {
	return (
		<div className="animate-fadeIn">
			<div className="flex items-center pb-[16px] justify-between">
				<UserFilterButtons
					activeFilter={userFilter}
					onFilterChange={onUserFilterChange}
				/>
				<CustomDropdown
					options={['단기 고수', '중기 고수', '장기 고수']}
					setSortedBy={guruType}
					isOpen={isOpen}
					onToggle={onToggle}
					fetchSortedBy={onGuruTypeChange}
				/>
			</div>

			{/* 제목 */}
			<div className="flex items-center gap-1 mb-4">
				<h3 className="text-lg font-semibold text-black">
					고수들은 이 종목을 더 보고 있어요
				</h3>
				<img
					src="/question.png"
					alt="help"
					width={24}
					height={24}
					onClick={() => {
						console.log('내용 띄우기');
					}}
				/>
			</div>

			{/* 조회종목 리스트 */}
			{viewingStocks.map((stock, index) => (
				<StockListItemCard
					key={stock.code}
					name={stock.name}
					img={stock.img}
					code={stock.code}
					currentPrice={stock.currentPrice}
					changeRate={stock.changeRate}
					volume={stock.amount}
					detail="volume"
				/>
			))}
		</div>
	);
}
