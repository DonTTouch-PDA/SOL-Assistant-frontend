'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import CustomCard from '@/components/common/CustomCard';
import { fetchSectorNewsBySectorId } from '@/services/sectorNewsService';
import { newsList } from '@/types/news';
import Image from 'next/image';
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

interface SectorNewsDetailContainerProps {
	stockName: string;
	stockCode: string;
	sectorId: string;
	onClose: () => void;
}

export default function SectorNewsDetailContainer({
	stockName,
	stockCode,
	sectorId,
	onClose,
}: SectorNewsDetailContainerProps) {
	const [isVisible, setIsVisible] = useState(false);
	const [sectorNews, setSectorNews] = useState<newsList | null>(null);
	const [loading, setLoading] = useState(true);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const data = await fetchSectorNewsBySectorId(sectorId);
				if (data && data.length > 0) {
					setSectorNews(data[0]); // 첫 번째 섹터 뉴스 사용
				}
			} catch (error) {
				console.error('섹터 뉴스 로드 실패:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchNews();
	}, [sectorId]);

	return (
		<motion.div
			className="fixed top-11 left-1/2 transform -translate-x-1/2 z-50 bg-white flex flex-col w-full max-w-[430px] min-w-[375px] rounded-t-xl px-2"
			style={{
				height: 'calc(100vh - 11px - 78px)',
				boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)',
			}}
			initial={{ y: '100%' }}
			animate={{ y: 0 }}
			exit={{ y: '100%' }}
			transition={{ type: 'tween', duration: 0.5 }}
			drag="y"
			dragConstraints={{ top: 0, bottom: 0 }}
			dragElastic={{ top: 0, bottom: 0.2 }}
			onDragEnd={(event, info) => {
				if (info.offset.y > 100) {
					onClose();
				}
			}}
		>
			{/* 상단 헤더 */}
			<div className="flex items-center justify-center py-2">
				<div
					className="w-8 h-1 bg-gray-300 rounded-full cursor-pointer"
					onClick={onClose}
				></div>
			</div>

			{/* 종목 정보 헤더 */}
			<div className="w-full justify-between items-center border-b border-gray-200 py-4 px-5 bg-white">
				<div className="flex items-center gap-3">
					<Image
						src={`https://static.toss.im/png-icons/securities/icn-sec-fill-${stockCode}.png`}
						alt={stockName}
						width={45}
						height={45}
						className="rounded-full"
					/>
					<div>
						<p className="text-2xl pl-[10px] font-bold">{stockName}</p>
						<p className="text-sm text-gray-500 pl-[10px]">
							{stockName} 섹터 뉴스 요약
						</p>
					</div>
				</div>
			</div>

			{/* 뉴스 내용 */}
			<div className="flex-1 px-5 py-4 overflow-y-auto min-h-0 h-full scrollbar-hide">
				{loading ? (
					<CustomCard>
						<div className="text-center py-8">
							<p className="text-gray-500">뉴스를 불러오는 중...</p>
						</div>
					</CustomCard>
				) : sectorNews ? (
					<div className="space-y-4">
						{/* 섹터 정보 */}
						<CustomCard>
							<div className="flex items-center gap-3 pb-2">
								{(() => {
									const IconComponent =
										icons[sectorNews.sector as keyof typeof icons];
									return (
										<div className="bg-[#F5F5F5] w-[44px] h-[44px] rounded-full flex items-center justify-center">
											{IconComponent ? (
												<IconComponent className="w-7 h-7 stroke-gray-800" />
											) : (
												<span className="text-lg font-bold text-gray-800">
													{sectorNews.sector.charAt(0)}
												</span>
											)}
										</div>
									);
								})()}
								<div className="flex items-end gap-2">
									<h1 className="text-lg font-semibold">{sectorNews.sector}</h1>
									<span
										className={`rounded-sm px-1.5 text-sm font-semibold ${
											sectorNews.emotion === 'POSITIVE'
												? 'bg-[#EAF5F0] text-[#169F6E]'
												: sectorNews.emotion === 'NEGATIVE'
													? 'bg-[#FCF4F4] text-[#FA2D42]'
													: 'bg-[#FFF9E8] text-[#EA9635]'
										}`}
									>
										{sectorNews.emotion === 'POSITIVE'
											? '긍정'
											: sectorNews.emotion === 'NEGATIVE'
												? '부정'
												: '중립'}
									</span>
								</div>
							</div>
							<div className="bg-[#F4F6F9] text-[#666666] p-4 rounded-md">
								{sectorNews.summary}
							</div>
						</CustomCard>

						{/* 관련 뉴스 */}
						<section className="pt-2">
							<h1 className="text-xl font-semibold pb-4">관련 뉴스</h1>
							<div>
								{sectorNews.newsList.length > 0 &&
									sectorNews.newsList.map((news, idx) => (
										<div key={idx} className="pb-3">
											<div className="flex justify-between pb-10">
												<div>
													<p className="text-[#999EA4] text-sm">
														{news.date} {news.journal}
													</p>
													<a
														href={news.url}
														className="text-[#333951] font-medium"
													>
														{news.title}
													</a>
												</div>
											</div>
											<div className="w-[100%]  border-[0.5px] border-[#EEEEEE]" />
										</div>
									))}
							</div>
						</section>
					</div>
				) : (
					<CustomCard>
						<div className="text-center py-8">
							<p className="text-gray-500">뉴스 데이터를 불러올 수 없습니다.</p>
						</div>
					</CustomCard>
				)}
			</div>
		</motion.div>
	);
}
