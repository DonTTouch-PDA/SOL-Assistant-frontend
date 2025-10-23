// NewHomeContainer.tsx
'use client';
import { useEffect, useState, useRef } from 'react';
import RecentMenu from './RecentMenu';
import StockSummaryCard from './StockSummaryCard';
import StockSummaryCardSkeleton from '@/components/newHome/StockSummaryCardSkeleton';
import { fetchGetMyStocks } from '@/services/myStocksServices';
import { MyStock } from '@/types/myStock';
import { AnimatePresence, motion } from 'framer-motion';
import GuruMoreInfoCard from '@/components/guru/GuruMoreInfoCard';
import { NEW_HOME_MORE_INFO } from '@/constants/descriptions';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import CustomCard from '@/components/common/CustomCard';
import Image from 'next/image';

interface NewHomeContainerProps {
	onSectorNewsClick?: (
		stockName: string,
		stockCode: string,
		sectorId: string
	) => void;
}

export default function NewHomeContainer({
	onSectorNewsClick,
}: NewHomeContainerProps) {
	const [myStockData, setMyStockData] = useState<MyStock[]>([]);
	const [isLoadingAll, setIsLoadingAll] = useState(true); // 전체 로딩 상태
	const [loadedCount, setLoadedCount] = useState(0); // 개별 카드 완료 수 추적
	const [openInfo, setOpenInfo] = useState(false);
	const popoverRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		fetchGetMyStocks()
			.then((d) => setMyStockData(d))
			.catch(console.error);
	}, []);

	// 모든 카드 데이터가 완료되면 전체 로딩 false
	useEffect(() => {
		if (myStockData.length > 0 && loadedCount === myStockData.length) {
			setIsLoadingAll(false);
		}
	}, [loadedCount, myStockData.length]);

	const handleCardLoaded = () => setLoadedCount((prev) => prev + 1);

	return (
		<div>
			<Carousel className="overflow-visible py-4">
				<div className="flex items-center gap-1 pl-3 mb-2">
					<p className="text-lg font-semibold text-black ">
						나를 위한 맞춤 정보
					</p>
					<Image
						className="cursor-pointer"
						src="/question.png"
						alt="info"
						width={21}
						height={21}
						onClick={() => setOpenInfo(true)}
					/>
				</div>

				<AnimatePresence>
					{openInfo && (
						<motion.div
							ref={popoverRef}
							className="absolute top-10 left-0 z-10"
							initial={{ opacity: 0, y: -10, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -10, scale: 0.95 }}
							transition={{ duration: 0.2 }}
						>
							<GuruMoreInfoCard
								comment={NEW_HOME_MORE_INFO}
								onClose={() => setOpenInfo(false)}
							/>
						</motion.div>
					)}
				</AnimatePresence>

				<CarouselContent className="px-5 py-1">
					{/* 전체 로딩 중 */}
					{myStockData.length > 0
						? myStockData.map((stock, idx) => (
								<CarouselItem key={idx} className="pr-1">
									<StockSummaryCard
										data={stock}
										onSectorNewsClick={onSectorNewsClick}
										onLoaded={handleCardLoaded}
									/>
								</CarouselItem>
							))
						: Array.from({ length: 2 }).map((_, idx) => (
								<CarouselItem key={idx} className="pr-1">
									<StockSummaryCardSkeleton />
								</CarouselItem>
							))}
				</CarouselContent>

				<CarouselPrevious className="-left-4" />
				<CarouselNext className="-right-4" />
			</Carousel>
			<div className="w-screen bg-[#F4F6F9] h-5 -mx-6" />
			<RecentMenu />
		</div>
	);
}
