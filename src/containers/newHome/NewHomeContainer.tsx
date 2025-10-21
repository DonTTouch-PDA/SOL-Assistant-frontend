'use client';
import { useEffect, useState } from 'react';
import RecentMenu from './RecentMenu';
import StockSummaryCard from './StockSummaryCard';
import { fetchGetMyStocks } from '@/services/myStocksServices';
import { MyStock } from '@/types/myStock';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import CustomCard from '@/components/common/CustomCard';

export default function NewHomeContainer() {
	const [myStockData, setMyStockData] = useState<MyStock[]>([]);
	useEffect(() => {
		fetchGetMyStocks().then((d) => setMyStockData(d));
	}, []);

	return (
		<div>
			<Carousel className="overflow-visible py-4">
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
