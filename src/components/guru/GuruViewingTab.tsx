import React from 'react';
import CustomDropdown from '@/components/common/customDropdown';
import UserFilterButtons from '@/components/guru/UserFilterButtons';
import { GuruView, UserFilterType } from '@/types/guru';
import StockListItemCard from '@/components/common/StockListItemCard';
import GuruMoreInfoCard from './GuruMoreInfoCard';
import { AnimatePresence, motion } from 'framer-motion';

interface GuruViewingTabProps {
	guruType: string;
	onGuruTypeChange: (value: string) => void;
	isOpen: boolean;
	onToggle: () => void;
	userFilter: UserFilterType;
	onUserFilterChange: (filter: UserFilterType) => void;
	viewingStocks: GuruView[];
	isOpenMoreInfo: boolean;
	onMoreInfo: () => void;
	popoverRef: React.RefObject<HTMLDivElement | null>;
}

export default function GuruViewingTab({
	guruType,
	onGuruTypeChange,
	isOpen,
	onToggle,
	userFilter,
	onUserFilterChange,
	viewingStocks,
	isOpenMoreInfo,
	onMoreInfo,
	popoverRef,
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
			<div className="flex items-center gap-1 mb-4 relative">
				<h3 className="text-lg font-semibold text-black">
					고수들은 이 종목을 더 보고 있어요
				</h3>
				<img
					src="/question.png"
					alt="help"
					width={24}
					height={24}
					className="cursor-pointer"
					onClick={onMoreInfo}
				/>

				{/* 팝오버 */}
				<AnimatePresence>
					{isOpenMoreInfo && (
						<motion.div
							ref={popoverRef}
							className="absolute top-8 right-0 z-10"
							initial={{ opacity: 0, y: -10, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -10, scale: 0.95 }}
							transition={{ duration: 0.2 }}
						>
							<GuruMoreInfoCard onClose={onMoreInfo} />
						</motion.div>
					)}
				</AnimatePresence>
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
					onClick={() => {}}
				/>
			))}
		</div>
	);
}
