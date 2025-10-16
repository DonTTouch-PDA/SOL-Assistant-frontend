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

const dummyUser = {
	name: '프디아',
	sector: ['헬스케어', '에너지', '정보기술'],
};
// const dummyNews = [
// 	{
// 		sector: '헬스케어',
// 		opinion: '긍정',
// 		summary:
// 			'규제 리스크와 지정학 불확실성 압박 속에서도 일부 구조조정 움직임과 백신/의료기기 기술 수요 기대가 맞물림',
// 		newsList: [
// 			{
// 				date: '2025.10.10',
// 				journal: '헬스케어뉴스',
// 				title: '삼성바이오로직스, 바이오 재팬 2025서 경쟁력 입증',
// 				url: 'https://health.chosun.com/news/dailynews_view.jsp?mn_idx=563199',
// 			},
// 			{
// 				date: '2025.10.10',
// 				journal: '한경',
// 				title: `NH올원뱅크 '15초 건강측정' 서비스 출시`,
// 				url: 'https://www.hankyung.com/article/202510100514P',
// 				imgUrl:
// 					'https://img.hankyung.com/photo/202510/b99bca265e7b50fe563447c0bb766e16.png',
// 			},
// 		],
// 	},
// 	{
// 		sector: '에너지',
// 		opinion: '중립',
// 		summary:
// 			'규제 속에서도 일부 구조조정 움직임과 백신·의료기기 기술 수요 기대가 맞물림',
// 		newsList: [
// 			{
// 				date: '2025.10.10',
// 				journal: '에너지뉴스',
// 				title: '바이오 재팬 2025서 경쟁력 입증',
// 				url: 'https://health.chosun.com/news/dailynews_view.jsp?mn_idx=563199',
// 			},
// 			{
// 				date: '2025.10.10',
// 				journal: '한경',
// 				title: `'15초 건강측정' 서비스 출시`,
// 				url: 'https://www.hankyung.com/article/202510100514P',
// 				imgUrl:
// 					'https://img.hankyung.com/photo/202510/b99bca265e7b50fe563447c0bb766e16.png',
// 			},
// 		],
// 	},
// 	{
// 		sector: '정보기술',
// 		opinion: '부정',
// 		summary: ' 구조조정 움직임과 백신·의료기기 기술 수요 기대가 맞물림',
// 		newsList: [
// 			{
// 				date: '2025.10.10',
// 				journal: '정보기술뉴스',
// 				title: '삼성바이오로직스, 경쟁력 입증',
// 				url: 'https://health.chosun.com/news/dailynews_view.jsp?mn_idx=563199',
// 			},
// 			{
// 				date: '2025.10.10',
// 				journal: '한경',
// 				title: `NH올원뱅크 '15초 건강측정' 서비스 출시`,
// 				url: 'https://www.hankyung.com/article/202510100514P',
// 				imgUrl:
// 					'https://img.hankyung.com/photo/202510/b99bca265e7b50fe563447c0bb766e16.png',
// 			},
// 		],
// 	},
// ];

export default function SectorNewsContainer() {
	const opinionColors: Record<string, string> = {
		긍정: 'bg-[#EAF5F0] text-[#169F6E] ',
		부정: 'bg-[#FCF4F4] text-[#FA2D42]',
		중립: 'bg-[#FFF9E8] text-[#EA9635] ',
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
			<section className="flex items-end gap-1 py-2">
				<h1 className="text-xl font-semibold">
					{dummyUser.name}님의 관심 섹터
				</h1>
				{news.length > 0 && <br />}
				<h1 className="text-xl font-semibold">
					{news.length > 0 && (
						<b className="font-bold text-[#2A3FEC]">
							{dummyUser.sector.toLocaleString()}
						</b>
					)}
					{` `}
					연관 뉴스
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
												<Image
													src={`/${sector.sector}.svg`}
													width={46}
													height={46}
													alt={sector.sector}
												/>
												<div className="flex items-end gap-2">
													<h1 className="text-lg font-semibold">
														{sector.sector}
													</h1>
													<span
														className={`rounded-sm px-1.5 text-sm font-semibold ${opinionColors[sector.opinion]}`}
													>
														{sector.opinion}
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
