'use client';
import Image from 'next/image';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
} from '@/components/ui/carousel';
import CustomCard from '@/components/common/CustomCard';
import { useState, useEffect } from 'react';
import BottomSheet from '@/components/common/BottomSheet';
import { AINEWS } from '@/constants/descriptions';
import { fetchSectorNews } from '@/services/sectorNewsService';
import { newsList } from '@/types/news';
import {
	Anvil,
	Cigarette,
	Factory,
	FlaskConical,
	Fuel,
	Landmark,
	Laptop,
	Settings,
	Ship,
	SmartphoneNfc,
	Tablets,
	Truck,
	Zap,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const dummyUser = {
	name: '프디아',
	sector: ['헬스케어', '에너지', '정보기술'],
};

const icons = {
	금속: Anvil,
	제약: Tablets,
	'운송장비·부품': Ship,
	화학: FlaskConical,
	통신: SmartphoneNfc,
	기타금융: Landmark,
	'전기·전자': Zap,
	'IT 서비스': Laptop,
	유통: Truck,
	'기계·장비': Settings,
	'음식료·담배': Cigarette,
	'전기·가스': Fuel,
	건설: Factory,
};

export default function SectorNewsContainer() {
	const { userData } = useAuth();

	const opinionColors: Record<string, string> = {
		POSITIVE: 'bg-[#EAF5F0] text-[#169F6E] ',
		NEGATIVE: 'bg-[#FCF4F4] text-[#FA2D42]',
		NEUTRAL: 'bg-[#FFF9E8] text-[#EA9635] ',
	};

	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(1);

	useEffect(() => {
		if (!api) {
			return;
		}
		setCurrent(api.selectedScrollSnap() + 1);
		api.on('select', () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	const [open, setOpen] = useState(false);

	const [news, setNews] = useState<newsList[]>([]);
	useEffect(() => {
		fetchSectorNews().then((data) => {
			setNews(data);
		});
	}, []);

	return (
		<div className="p-2">
			{news.length == 0 ? (
				<section className="flex items-end gap-1 py-2">
					<h1 className="text-xl font-semibold">
						{userData?.name}님의 관심 섹터 연관 뉴스
					</h1>
					<Image
						src="/question.png"
						width={21}
						height={21}
						alt="info"
						onClick={() => {
							setOpen(true);
						}}
					/>
				</section>
			) : (
				<section>
					<h1 className="text-xl font-semibold">
						{userData?.name}님의 관심 섹터
					</h1>
					<h1 className="text-xl font-semibold flex items-end gap-1">
						<b className="font-bold text-[#2A3FEC]">
							{news.map((n) => n.sector).toLocaleString()}
						</b>
						연관 뉴스
						<Image
							src="/question.png"
							width={21}
							height={21}
							alt="info"
							onClick={() => {
								setOpen(true);
							}}
						/>
					</h1>
				</section>
			)}

			{/* Carousel */}
			<section className="px-10 pt-4 -mx-5 pb-6">
				<Carousel setApi={setApi}>
					<CarouselContent>
						{news.length != 0 ? (
							news.map((sector, idx) => (
								<CarouselItem key={idx}>
									<CustomCard>
										<div>
											<div className="flex gap-3 items-center pb-2">
												{(() => {
													const IconComponent =
														icons[sector.sector as keyof typeof icons];
													return (
														<div className="bg-[#F5F5F5] w-[44px] h-[44px] rounded-full flex items-center justify-center">
															<IconComponent className="w-7 h-7 stroke-gray-800" />
														</div>
													);
												})()}

												<div className="flex items-end gap-2">
													<h1 className="text-lg font-semibold">
														{sector.sector}
													</h1>
													<span
														className={`rounded-sm px-1.5 text-sm font-semibold ${opinionColors[sector.emotion]}`}
													>
														{sector.emotion === 'POSITIVE'
															? '긍정'
															: sector.emotion === 'NEGATIVE'
																? '부정'
																: '중립'}
													</span>
												</div>
											</div>
											<div className="bg-[#F4F6F9] text-[#666666] p-4 my-2 rounded-md">
												{sector.summary}
											</div>
										</div>
									</CustomCard>
								</CarouselItem>
							))
						) : (
							<CarouselItem>
								<CustomCard>
									<div className="flex justify-center items-center h-[100px]">
										<p className="text-gray-500 text-sm">
											관심 섹터의 종목을 매매해보세요!
										</p>
									</div>
								</CustomCard>
							</CarouselItem>
						)}
					</CarouselContent>
					<CarouselPrevious className="mx-2" />
					<CarouselNext className="mx-2" />
				</Carousel>
			</section>

			{/* 관련뉴스 */}
			<section>
				<h1 className="text-xl font-semibold pb-4">관련 뉴스</h1>
				<div>
					{news.length > 0 &&
						news[current - 1].newsList.map((news, idx) => (
							<div key={idx} className="pb-3">
								<div className="flex justify-between pb-10">
									<div>
										<p className="text-[#999EA4] text-sm">
											{news.date} {news.journal}
										</p>
										<a href={news.url} className="text-[#333951] font-medium">
											{news.title}
										</a>
									</div>
									{news.imgUrl && (
										<Image
											src={news.imgUrl}
											alt="기사 사진"
											height={75}
											width={85}
											className="rounded-md"
										/>
									)}
								</div>
								<div className="w-[100%]  border-[0.5px] border-[#EEEEEE]" />
							</div>
						))}
				</div>
			</section>

			<BottomSheet
				title="연관 뉴스"
				content={AINEWS}
				additionalContent="출처: 한경뉴스"
				isOpen={open}
				onClose={() => setOpen(false)}
			/>
		</div>
	);
}
