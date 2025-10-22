'use client';
import { useEffect, useState, useRef } from 'react';
import RecentMenu from './RecentMenu';
import StockSummaryCard from './StockSummaryCard';
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

export default function NewHomeContainer() {
	const [myStockData, setMyStockData] = useState<MyStock[]>([]);
	const [openInfo, setOpenInfo] = useState(false);
	const popoverRef = useRef<HTMLDivElement>(null);
	const [isOpenMoreInfo, setIsOpenMoreInfo] = useState(false);
	useEffect(() => {
		fetchGetMyStocks().then((d) => setMyStockData(d));
	}, []);

	return (
		<div>
			<Carousel className="overflow-visible py-4">
				<div className="flex items-center gap-2 pl-3 mb-2">
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
					{myStockData.length != 0 ? (
						myStockData?.map((stock, idx) => (
							<CarouselItem key={idx} className="pr-1">
								<StockSummaryCard data={stock} />
							</CarouselItem>
						))
					) : (
						<div className="w-full text-center">
							<CustomCard>
								<div className="h-[300px] pt-30 text-gray-600">
									종목을 매매하고 <br />내 종목 요약을 받아보세요!
								</div>
							</CustomCard>
						</div>
					)}
				</CarouselContent>
				<CarouselPrevious className="-left-4" />
				<CarouselNext className="-right-4" />
			</Carousel>
			<div className="w-screen bg-[#F4F6F9] h-5 -mx-6" />
			<RecentMenu />
		</div>
	);
}
