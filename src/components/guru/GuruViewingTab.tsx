import React from 'react';
import CustomDropdown from '@/components/common/CustomDropdown';
import UserFilterButtons from '@/components/guru/UserFilterButtons';
import { UserFilterType, GuruTrade } from '@/types/guru';
import StockListItemCard from '@/components/common/StockListItemCard';
import GuruMoreInfoCard from './GuruMoreInfoCard';
import { AnimatePresence, motion } from 'framer-motion';
import { GuruType } from '@/types/guru';
import TreeMapContainer from '@/containers/guru/TreeMapContainer';
import Image from 'next/image';

interface GuruViewingTabProps {
	guruType: GuruType;
	onGuruTypeChange: (value: GuruType) => void;
	isOpen: boolean;
	onToggle: () => void;
	userFilter: UserFilterType;
	onUserFilterChange: (filter: UserFilterType) => void;
	viewingStocks: GuruTrade[];
	viewingStocks2: GuruTrade[];
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
	viewingStocks2,
	isOpenMoreInfo,
	onMoreInfo,
	popoverRef,
}: GuruViewingTabProps) {
	return (
		<div className="animate-fadeIn flex flex-col ">
			<div className="flex items-center pb-[16px] justify-between">
				<UserFilterButtons
					activeFilter={userFilter}
					onFilterChange={onUserFilterChange}
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
			{/* 트리맵 */}
			<TreeMapContainer data={viewingStocks} />

			{/* 제목 */}
			<div className="flex items-center gap-1 mt-6 relative">
				<h3 className="text-lg font-semibold text-black">
					{userFilter === '고수'
						? '고수들이 주목하고 있어요'
						: '고수들은 이 종목을 더 보고 있어요'}
				</h3>
				{userFilter !== '고수' && (
					<Image
						src="/question.png"
						alt="help"
						width={24}
						height={24}
						className="cursor-pointer"
						onClick={onMoreInfo}
					/>
				)}

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
			{viewingStocks2.map((stock) => (
				<StockListItemCard
					key={stock.stockSymbol}
					name={stock.stockName}
					img={`https://static.toss.im/png-icons/securities/icn-sec-fill-${stock.stockSymbol}.png`}
					code={stock.stockSymbol}
					currentPrice={stock.todayClosePrice}
					changeRate={stock.priceChangePercent}
					volumeRate={stock.volumeChangePercent}
					volume={stock.todayVolume}
					detail="VOLUME"
					onClick={() => {}}
				/>
			))}
		</div>
	);
}
