'use client';

import { FetchMonthlyProfit } from '@/services/reportServices';
import { Trading, DailyTrading, MonthlyHistory } from '@/types/ProfitHistory';
import { formatToYearMonth } from '@/utils/date';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
	prevMonths: [],
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

interface ProfitHistoryBreakdown {
	date: string;
	tradings: ProfitHistoryTrading[];
}
interface ProfitHistoryTrading {
	stock: string;
	imgUrl: string;
	type: string;
	amount: number;
	price: number;
}

interface ProfitHistoryData {
	month: string;
	total: {
		sum: number;
		diff: number;
		buy: { count: number; price: number };
		sell: { count: number; price: number };
	};
	breakdown: ProfitHistoryBreakdown[];
}

export default function ProfitHistory() {
	const router = useRouter();
	const thisMonth = formatToYearMonth(new Date());
	const [data, setData] = useState<ProfitHistoryData>({
		month: thisMonth,
		total: {
			sum: 0,
			diff: 0,
			buy: { count: 0, price: 0 },
			sell: { count: 0, price: 0 },
		},
		breakdown: [],
	});

	useEffect(() => {
		FetchMonthlyProfit(thisMonth).then((d) => setData(d));
	}, []);

	const [isLoading, setIsLoading] = useState(false);
	const [showLoadMore, setShowLoadMore] = useState(true);

	const loadMore = async () => {
		setIsLoading(true);
		await UseSleep(1000);
		const prevData = dummyRes;
		// setData((prev) => ({
		// 	...prev,
		// 	prevMonths: [...prev.prevMonths, prevData],
		// }));
		setShowLoadMore(false);
	};

	return (
		<div>
			{/*상단바*/}
			<div className="flex items-center pb-3 pt-2">
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
			<div className="px-2">
				{/* 월 총계 */}
				<div className="py-2">
					<p className="font-medium text-lg pb-1">
						{thisMonth.split('-')[1]}월 실현수익
					</p>
					<div className="flex items-end gap-2 pb-4">
						<h1 className="text-3xl font-semibold">
							<b className="font-semibold">{data.total.sum > 0 && '+'}</b>
							{data.total.sum.toLocaleString()}원
						</h1>

						<div className="text-sm font-semibold">
							{data.total.diff >= 0 ? (
								<p className=" bg-[#FCF4F4] text-[#FA2D42] rounded-sm px-1.5">
									+{data.total.diff}%
								</p>
							) : (
								<p className=" bg-[#F4F9FF] text-[#2E77FA] rounded-sm px-1.5">
									{data.total.diff}%
								</p>
							)}
						</div>
					</div>
				</div>
				{/* 매수&매도 */}
				<div className="bg-[#F7F7F7] h-[104px] grid grid-cols-2 -mx-8">
					<div className="flex flex-col justify-center p-7">
						<p className="text-sm font-medium">
							매수
							<b className="pl-2 font-medium text-[#FB2D42]">
								{data.total.buy.count}건
							</b>
						</p>
						<h1 className="text-2xl font-semibold text-[#FB2D42]">
							{data.total.buy.price.toLocaleString()}원
						</h1>
					</div>
					<div className="flex flex-col justify-center p-7">
						<p className="text-sm font-medium">
							매도
							<b className="pl-2 font-medium text-[#2D77FA]">
								{data.total.sell.count}건
							</b>
						</p>
						<h1 className="text-2xl font-semibold text-[#2D77FA]">
							{data.total.sell.price.toLocaleString()}원
						</h1>
					</div>
				</div>

				{/* 상세내역 */}
				{/* 이번달 */}
				{data.breakdown.length > 0 ? (
					<MonthSection data={data} />
				) : (
					<div className="flex flex-col items-center gap-4 p-10">
						<Image
							src="/notification.svg"
							alt="notification"
							width={40}
							height={40}
						/>
						<p className="text-gray-500 text-lg">아직 매매 내역이 없어요.</p>
					</div>
				)}

				{/* 지난달(전체) */}
				{/* {data.prevMonths?.map((monthData, i) => (
					<MonthSection key={i} data={monthData} />
				))} */}
				{/* 더보기 */}
				{showLoadMore && (
					<div className="flex justify-center gap-1 pt-2">
						<p>{isLoading ? '불러오는 중...' : '이전 1개월 거래내역 더보기'}</p>
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
		<div className="pt-4">
			<p className="font-[DunbarLow] font-semibold text-sm text-[#333951]">
				{data.month}
			</p>
			{data.breakdown.map((daily: DailyTrading, idx: number) => (
				<div key={idx}>
					<p className="text-sm mt-2 font-semibold font-[DunbarLow] text-[#999EA3] pb-2 tracking-wide">
						{daily.date.slice(5)}
					</p>
					{daily.tradings.map((trading: Trading, idx: number) => (
						<div
							key={idx}
							className="grid grid-cols-[1fr_10fr] items-center pb-4"
						>
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
									<div className="text-[#333952] font-semibold">
										{(trading.amount * trading.price).toLocaleString()}원
									</div>
								</div>
								<div className="flex justify-between text-sm text-[#777F8C]">
									<div>
										<b
											className={`font-medium ${
												trading.type == '매도'
													? 'text-[#2D77FA]'
													: 'text-[#FB2D42]'
											}
											`}
										>
											{trading.type}
										</b>{' '}
										{trading.amount}주
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

const UseSleep = (delay: number) =>
	new Promise((resolve) => setTimeout(resolve, delay));
