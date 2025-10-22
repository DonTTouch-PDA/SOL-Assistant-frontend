'use client';
import { getDominantColorFromStockCode } from '@/utils/colorPick';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import GuruCard from '@/components/newHome/GuruCard';
import CustomLine from '@/components/common/CustomLine';
import { MyStock } from '@/types/myStock';
import { BuySellBadge, EmotionBadge } from '@/components/common/CustomBadge';
import { useRouter } from 'next/navigation';
import {
	fetchGuruChangeData,
	fetchHomeNewsData,
	fetchSignData,
} from '@/services/newHomeServices';
import { GuruChangeData, SignData, HomeNewsData } from '@/types/newHome';

interface StockSummaryCardProps {
	data: MyStock;
}

export default function StockSummaryCard({ data }: StockSummaryCardProps) {
	const [color, setColor] = useState('#ffffff');
	//이미지색상추출
	useEffect(() => {
		const fetchColor = async () => {
			const hex = await getDominantColorFromStockCode(data.symbol);
			setColor(hex);
			console.log(hex);
		};
		fetchColor();
	}, [data]);

	const isRising = data.diff >= 0;

	const router = useRouter();

	const [guruChange, setGuruChange] = useState<GuruChangeData | null>(null);
	useEffect(() => {
		fetchGuruChangeData(data.symbol)
			.then((d) => setGuruChange(d))
			.catch((error) => {
				console.error('고수 변화량 데이터 로드 실패:', error);
				setGuruChange(null);
			});
	}, [data]);

	const [sign, setSign] = useState<SignData | null>(null);
	useEffect(() => {
		fetchSignData(data.symbol)
			.then((d) => setSign(d))
			.catch((error) => {
				console.error('매매신호 데이터 로드 실패:', error);
				setSign(null);
			});
	}, [data]);

	const [homeNews, setHomeNews] = useState<HomeNewsData | null>(null);
	useEffect(() => {
		fetchHomeNewsData(data.symbol)
			.then((d) => setHomeNews(d))
			.catch((error) => {
				console.error('뉴스 데이터 로드 실패:', error);
				setHomeNews(null);
			});
	}, [data]);

	return (
		<div
			className={`border rounded-xl p-7 mb-3 flex flex-col gap-3`}
			style={{ borderColor: color, boxShadow: `0 0 5px 3px ${color}20` }}
		>
			{/* 상단 가격정보 */}
			<section
				onClick={() => {
					router.push(`/${data.symbol}`);
				}}
			>
				<div className="flex items-center gap-2">
					<Image
						src={`https://static.toss.im/png-icons/securities/icn-sec-fill-${data.symbol}.png`}
						alt={data.stockName}
						width={32}
						height={32}
						className="rounded-full"
					/>
					<div>
						<h1 className="font-semibold">{data.stockName}</h1>
						<p className="text-[#999DA5] text-sm">
							{data.symbol} {data.market}
						</p>
					</div>
				</div>
				<h1 className="text-2xl font-medium pt-2">
					{data.currentPrice.toLocaleString()}원
				</h1>
				<div className="flex justify-between pt-1">
					<p className="text-[#999DA5] text-sm">
						{data.quantity}주 {Math.floor(data.costBasis).toLocaleString()}원
					</p>
					<p
						className={`text-sm font-medium ${isRising ? 'text-[#FA2D42]' : 'text-[#2D77FA]'}`}
					>
						<b className="text-xs">{isRising ? '▲' : '▼'}</b>
						{Math.floor(data.diff * data.quantity).toLocaleString()}원
					</p>
				</div>
			</section>

			<CustomLine />

			{/* 고수의 Pick */}
			<section
				className="flex flex-col gap-2 py-2"
				onClick={() => {
					router.push('dashboard/guru');
				}}
			>
				<div className="flex gap-2 pb-1">
					<h2 className="font-semibold">고수의 Pick</h2>
					<ChevronRight color="gray" />
				</div>
				{guruChange?.dailyGuru && (
					<div className="flex items-center gap-1 pb-2">
						<p className="text-[#FA2D42] bg-[#FFF2F2] rounded-xl font-semibold px-3  text-sm">
							HOT
						</p>
						<p className="text-sm font-medium">
							고수들이 어제보다 주목한 종목이에요
						</p>
					</div>
				)}

				<div className="flex justify-between gap-2">
					<GuruCard
						type="매수"
						diff={Math.round(guruChange?.guruSellPercent || 0)}
					/>
					<GuruCard
						type="매도"
						diff={Math.round(guruChange?.guruBuyPercent || 0)}
					/>
				</div>
			</section>
			<CustomLine />
			<section className="flex justify-around font-medium">
				<p
					onClick={() => {
						router.push('/dashboard/sector-news');
					}}
				>
					섹터 뉴스{` `}
					<EmotionBadge
						emotion={homeNews?.emotion as 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'}
					/>
				</p>
				<div className=" border-l border-[0.5px] border-[#EEEEEE]" />

				<p
					onClick={() => {
						router.push('/dashboard/similar-chart');
					}}
				>
					매매신호{` `}
					{sign?.buySignal && <BuySellBadge type="BUY" />}
					{sign?.sellSignal && <BuySellBadge type="SELL" />}
				</p>
			</section>
		</div>
	);
}
