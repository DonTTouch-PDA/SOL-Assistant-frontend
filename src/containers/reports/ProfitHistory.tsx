'use client';

import {
	Trading,
	DailyTrading,
	MonthlyHistory,
	ProfitHistoryData,
} from '@/types/ProfitHistory';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const dummy = {
	currentMonth: {
		month: '2025.09',
		total: {
			sum: 234320,
			diff: 23.2,
			buy: { count: 3, price: 315700 },
			sell: { count: 1, price: 62300 },
		},
		breakdown: [
			{
				date: '2025.09.16',
				tradings: [
					{
						stock: '신한지주',
						imgUrl:
							'https://static.toss.im/png-icons/securities/icn-sec-fill-055550.png',
						type: '매도',
						amount: 1,
						price: 62300,
					},
				],
			},
			{
				date: '2025.09.12',
				tradings: [
					{
						stock: '신한지주',
						imgUrl:
							'https://static.toss.im/png-icons/securities/icn-sec-fill-055550.png',
						type: '매수',
						amount: 2,
						price: 59900,
					},
					{
						stock: 'NAVER',
						imgUrl:
							'https://static.toss.im/png-icons/securities/icn-sec-fill-035420.png',
						type: '매수',
						amount: 1,
						price: 59900,
					},
				],
			},
		],
	},
	previousMonths: [],
};
const dummyRes = {
	month: '2025.08',
	total: {
		sum: 153200,
		diff: -5.3,
		buy: { count: 4, price: 421000 },
		sell: { count: 3, price: 574200 },
	},
	breakdown: [
		{
			date: '2025.08.28',
			tradings: [
				{
					stock: '삼성전자',
					imgUrl:
						'https://static.toss.im/png-icons/securities/icn-sec-fill-005930.png',
					type: '매수',
					amount: 3,
					price: 73000,
				},
			],
		},
		{
			date: '2025.08.21',
			tradings: [
				{
					stock: 'LG에너지솔루션',
					imgUrl:
						'https://static.toss.im/png-icons/securities/icn-sec-fill-373220.png',
					type: '매도',
					amount: 1,
					price: 415000,
				},
			],
		},
		{
			date: '2025.08.09',
			tradings: [
				{
					stock: 'NAVER',
					imgUrl:
						'https://static.toss.im/png-icons/securities/icn-sec-fill-035420.png',
					type: '매수',
					amount: 2,
					price: 196000,
				},
				{
					stock: '카카오',
					imgUrl:
						'https://static.toss.im/png-icons/securities/icn-sec-fill-035720.png',
					type: '매도',
					amount: 1,
					price: 54500,
				},
			],
		},
	],
};

export default function ProfitHistory() {
	const router = useRouter();
	const [data, setData] = useState<ProfitHistoryData>(dummy);

	const [isLoading, setIsLoading] = useState(false);
	const [showLoadMore, setShowLoadMore] = useState(true);

	const loadMore = async () => {
		setIsLoading(true);
		setShowLoadMore(false);
		const prevData = dummyRes;
		setData((prev) => ({
			...prev,
			previousMonths: [...prev.previousMonths, prevData],
		}));
	};

	return (
		<div>
			{/*상단바*/}
			<div className="flex items-center">
				<Image
					src="/arrow-left.svg"
					alt="back"
					width={30}
					height={30}
					onClick={() => {
						router.push('/dashboard/reports');
					}}
				/>
				<p>이번달 매매수익</p>
			</div>
			{/* 월 총계 */}
			<div>
				<p>{data.currentMonth.month.slice(5)}월 실현수익</p>
				<div className="flex">
					{data.currentMonth.total.sum >= 0 && '+'}
					{data.currentMonth.total.sum.toLocaleString()}원
					<div className="text-sm font-semibold">
						{data.currentMonth.total.diff >= 0 ? (
							<p className=" bg-[#FCF4F4] text-[#FA2D42] rounded-sm px-1.5">
								+{data.currentMonth.total.diff}%
							</p>
						) : (
							<p className=" bg-[#F4F9FF] text-[#2E77FA] rounded-sm px-1.5">
								{data.currentMonth.total.diff}%
							</p>
						)}
					</div>
				</div>
				{/* 매수&매도 */}
				<div className="bg-[#F7F7F7] h-[104px] grid grid-cols-2">
					<div>
						<p>매수 {data.currentMonth.total.buy.count}건</p>
						<h1>{data.currentMonth.total.buy.price.toLocaleString()}원</h1>
					</div>
					<div>
						<p>매도 {data.currentMonth.total.sell.count}건</p>
						<h1>{data.currentMonth.total.sell.price.toLocaleString()}원</h1>
					</div>
				</div>

				{/* 상세내역 */}
				{/* 이번달 */}
				<MonthSection data={data.currentMonth} />
				{/* 지난달(전체) */}
				{data.previousMonths?.map((monthData, i) => (
					<MonthSection key={i} data={monthData} />
				))}
				{/* 더보기 */}
				{showLoadMore && (
					<div className="flex justify-center gap-1">
						<p>이전 거래내역 더보기 </p>
						<Image
							src="/arrow-down.svg"
							alt="더보기"
							width={17}
							height={17}
							onClick={() => {
								loadMore();
							}}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

// 월별내역 렌더링함수
function MonthSection({ data }: { data: MonthlyHistory }) {
	return (
		<div>
			<p>{data.month}</p>
			{data.breakdown.map((daily: DailyTrading, idx: number) => (
				<div key={idx}>
					<p className="font-medium mt-2">{daily.date}</p>
					{daily.tradings.map((trading: Trading, idx: number) => (
						<div key={idx} className="grid grid-cols-[1fr_10fr] items-center">
							<Image
								src={trading.imgUrl}
								alt={trading.stock}
								height={23}
								width={23}
								className="rounded-full"
							/>
							<div>
								<div className="flex justify-between">
									<div>{trading.stock}</div>
									<div>
										{(trading.amount * trading.price).toLocaleString()}원
									</div>
								</div>
								<div className="flex justify-between text-sm text-gray-500">
									<div>
										{trading.type} {trading.amount}주
									</div>
									<p>{trading.price.toLocaleString()}원</p>
								</div>
							</div>
						</div>
					))}
				</div>
			))}
		</div>
	);
}
