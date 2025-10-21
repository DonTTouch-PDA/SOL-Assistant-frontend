'use client';

import BottomSheet from '@/components/common/BottomSheet';
import {
	FetchHasMoreTradeHistory,
	FetchMonthlyProfit,
} from '@/services/reportServices';
import { Trading, DailyTrading, MonthlyHistory } from '@/types/ProfitHistory';
import { formatToYearMonth } from '@/utils/date';
import { Check, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
	}, [thisMonth]);

	interface HasMore {
		months: string[];
		totalMonths: number;
	}

	const [hasMore, setHasMore] = useState<HasMore>({
		months: [],
		totalMonths: 0,
	});

	useEffect(() => {
		FetchHasMoreTradeHistory().then((d) => {
			setHasMore(d);
		});
	}, []);

	const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);

	const [month, setMonth] = useState(thisMonth);

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
						{month.split('-')[1]}월 실현수익
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

				<div className="flex gap-1 pt-4">
					<p className="font-[DunbarLow] font-semibold text-sm text-[#333951]">
						{data.month}{' '}
					</p>
					<ChevronDown
						width={15}
						onClick={() => {
							setIsOpenBottomSheet(true);
						}}
					/>
				</div>

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
			</div>
			<BottomSheet
				title="월 선택하기"
				withButton={false}
				content={
					<ul className="flex flex-col gap-3">
						{hasMore?.months.map((m) => (
							<li
								key={m}
								className="text-lg text-gray-700 flex justify-between"
								onClick={() => {
									FetchMonthlyProfit(m).then((d) => setData(d));
									setIsOpenBottomSheet(false);
									setMonth(m);
								}}
							>
								<p>{`${m.split('-')[0]}년 ${m.split('-')[1]}월`}</p>
								{month === m && <Check />}
							</li>
						))}
					</ul>
				}
				isOpen={isOpenBottomSheet}
				onClose={() => setIsOpenBottomSheet(false)}
			/>
		</div>
	);
}

// 월별내역 렌더링함수
function MonthSection({ data }: { data: MonthlyHistory }) {
	return (
		<div>
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
