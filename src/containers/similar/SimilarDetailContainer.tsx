import { motion } from 'framer-motion';
import { fetchGetSimilarChart } from '@/services/signalServices';
import { useEffect, useState } from 'react';
import { ChevronLeft, CircleAlert } from 'lucide-react';
import { SIMILAR_DETAIL_BOLLINGER_BANDS } from '@/constants/descriptions';
import { SimilarChartDetail } from '@/types/similar';
import { useRouter } from 'next/navigation';
import SimilarChart from '@/components/similar/SimilarChart';

const dummyData = {
	stockName: 'naver',
	trendPastScaled: [
		{
			offset: -15,
			Close: 29000,
			ScaledClose: 34205.1282051282,
		},
		{
			offset: -14,
			Close: 29200,
			ScaledClose: 34441.0256410256,
		},
		{
			offset: -13,
			Close: 27650,
			ScaledClose: 32612.8205128205,
		},
		{
			offset: -12,
			Close: 27250,
			ScaledClose: 32141.0256410256,
		},
		{
			offset: -11,
			Close: 27300,
			ScaledClose: 32200.0,
		},
		{
			offset: -10,
			Close: 27100,
			ScaledClose: 31964.1025641026,
		},
		{
			offset: -9,
			Close: 25700,
			ScaledClose: 30312.8205128205,
		},
		{
			offset: -8,
			Close: 26200,
			ScaledClose: 30902.5641025641,
		},
		{
			offset: -7,
			Close: 27300,
			ScaledClose: 32200.0,
		},
		{
			offset: -6,
			Close: 27700,
			ScaledClose: 32671.7948717949,
		},
		{
			offset: -5,
			Close: 27600,
			ScaledClose: 32553.8461538462,
		},
		{
			offset: -4,
			Close: 27750,
			ScaledClose: 32730.7692307692,
		},
		{
			offset: -3,
			Close: 28050,
			ScaledClose: 33084.6153846154,
		},
		{
			offset: -2,
			Close: 27100,
			ScaledClose: 31964.1025641026,
		},
		{
			offset: -1,
			Close: 29200,
			ScaledClose: 34441.0256410256,
		},
		{
			offset: 0,
			Close: 29250,
			ScaledClose: 34500.0,
		},
		{
			offset: 1,
			Close: 29700,
			ScaledClose: 35030.7692307692,
		},
		{
			offset: 2,
			Close: 29100,
			ScaledClose: 34323.0769230769,
		},
		{
			offset: 3,
			Close: 28450,
			ScaledClose: 33556.4102564103,
		},
		{
			offset: 4,
			Close: 28200,
			ScaledClose: 33261.5384615385,
		},
		{
			offset: 5,
			Close: 28450,
			ScaledClose: 33556.4102564103,
		},
		{
			offset: 6,
			Close: 29500,
			ScaledClose: 34794.8717948718,
		},
		{
			offset: 7,
			Close: 30500,
			ScaledClose: 35974.358974359,
		},
		{
			offset: 8,
			Close: 30350,
			ScaledClose: 35797.4358974359,
		},
		{
			offset: 9,
			Close: 30100,
			ScaledClose: 35502.5641025641,
		},
		{
			offset: 10,
			Close: 29850,
			ScaledClose: 35207.6923076923,
		},
		{
			offset: 11,
			Close: 29100,
			ScaledClose: 34323.0769230769,
		},
		{
			offset: 12,
			Close: 30350,
			ScaledClose: 35797.4358974359,
		},
		{
			offset: 13,
			Close: 31500,
			ScaledClose: 37153.8461538462,
		},
		{
			offset: 14,
			Close: 32450,
			ScaledClose: 38274.358974359,
		},
		{
			offset: 15,
			Close: 31950,
			ScaledClose: 37684.6153846154,
		},
	],
	trendToday: [
		{
			offset: -15,
			Close: 33400,
		},
		{
			offset: -14,
			Close: 34000,
		},
		{
			offset: -13,
			Close: 33400,
		},
		{
			offset: -12,
			Close: 32400,
		},
		{
			offset: -11,
			Close: 32200,
		},
		{
			offset: -10,
			Close: 32350,
		},
		{
			offset: -9,
			Close: 32750,
		},
		{
			offset: -8,
			Close: 33100,
		},
		{
			offset: -7,
			Close: 33100,
		},
		{
			offset: -6,
			Close: 31900,
		},
		{
			offset: -5,
			Close: 31350,
		},
		{
			offset: -4,
			Close: 30700,
		},
		{
			offset: -3,
			Close: 32800,
		},
		{
			offset: -2,
			Close: 32850,
		},
		{
			offset: -1,
			Close: 33350,
		},
		{
			offset: 0,
			Close: 34500,
		},
	],
	todayDate: '2025-10-02T00:00',
	pastDate: '2025-08-14T00:00',
	description: '단기 이동평균선이 장기 이동평균선을 상향 돌파',
	descriptionDetail:
		'단기 이동평균선(SMA5)이 장기 이동평균선(SMA20)을 위로 돌파할 때 발생. 추세 전환의 초기 신호로, 매수세가 강해지는 구간을 의미함. 일반적으로 상승 추세 시작을 확인하는 대표적인 매수 지표로 활용.',
};

interface StockNameProps {
	stockCode: string;
	stockName: string;
	onclose: () => void;
}
export default function SimilarDetailContainer({
	stockCode,
	stockName,
	onclose,
}: StockNameProps) {
	const router = useRouter();
	const [similarChart, setSimilarChart] = useState<SimilarChartDetail | null>(
		null
	);
	const getSimilarChart = async () => {
		const data = await fetchGetSimilarChart(stockCode);
		setSimilarChart(data as SimilarChartDetail);
	};
	useEffect(() => {
		getSimilarChart();
	}, []);

	return (
		<motion.div
			className="absolute inset-0 z-50 bg-white flex flex-col mt-11"
			initial={{ x: '100%' }}
			animate={{ x: 0 }}
			exit={{ x: '100%' }}
			transition={{ type: 'tween', duration: 0.3 }}
		>
			{/* 헤더 */}
			<div className="flex items-center -ml-[10px]">
				<ChevronLeft size={30} onClick={onclose} />
				<p>과거 유사 차트</p>
			</div>
			<div className="">
				{/* body */}
				<div className="flex justify-between items-center border-b border-gray-200 py-4 -mx-5 px-5 bg-white">
					<p className="text-[30px] pl-[10px] font-bold">{stockName}</p>
					<button
						className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
						onClick={() => {
							router.push(`/${stockCode}`);
						}}
					>
						주문
					</button>
				</div>
				<div className="flex flex-col items-center">
					<div className="flex items-center gap-1">
						<CircleAlert size={16} />
						<p className="text-[12px] py-[12px]">
							오늘과 유사한 매매 신호가 나타났던 과거 {stockName}의 차트예요.
						</p>
					</div>
					<div className="w-full mb-[16px] h-[250px] pt-[16px] ">
						<SimilarChart data={dummyData} today={new Date()} />
					</div>
					<div className="w-full  border-gray-100 border shadow-md p-4 rounded-xl">
						<p className="text-[20px] font-bold">{similarChart?.signalType}</p>
						<p className="text-[16px] leading-5">
							{SIMILAR_DETAIL_BOLLINGER_BANDS}
						</p>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
