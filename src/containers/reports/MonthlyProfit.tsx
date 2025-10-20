'use client';
import CustomCard from '@/components/common/CustomCard';
import { FetchThisMonthProfit } from '@/services/reportServices';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// 더미데이터
// const data = {
// 	total: { profit: 234320, diff: 23.2 },
// 	breakdown: [
// 		{
// 			stock: '신한지주',
// 			type: '매도',
// 			profit: 34022,
// 			imgUrl:
// 				'https://static.toss.im/png-icons/securities/icn-sec-fill-055550.png',
// 		},
// 		{
// 			stock: 'NAVER',
// 			profit: 232500,
// 			type: '매수',
// 			imgUrl:
// 				'https://static.toss.im/png-icons/securities/icn-sec-fill-035420.png',
// 		},
// 	],
// };

interface TradeList {
	stockName: string;
	symbol: string;
	totalPrice: number;
	side: string;
}

interface ProfitData {
	realizedProfit: number;
	realizedPercent: number;
	tradeList: TradeList[];
}

export default function MonthlyProfit() {
	const router = useRouter();

	const [profitData, setProfitData] = useState<ProfitData>({
		realizedProfit: 0,
		realizedPercent: 0,
		tradeList: [],
	});
	useEffect(() => {
		FetchThisMonthProfit().then((d) => {
			setProfitData(d);
		});
	}, []);

	return (
		<CustomCard>
			{/*이번달 매매수익*/}
			<div
				className="flex gap-1"
				onClick={() => {
					router.push('/dashboard/reports/profit-history');
				}}
			>
				<h1 className="text-lg font-medium">이번달 매매수익</h1>
				<Image
					src="/arrow-right.svg"
					alt="arrow"
					width={20}
					height={20}
					className=" hover:bg-gray-50 rounded-2xl"
				/>
			</div>
			<div className="flex items-end gap-3">
				<p className="text-xl">
					<b className="text-3xl font-semibold">
						{profitData?.realizedProfit.toLocaleString()}
					</b>
					{` `}원
				</p>
				<div className="text-sm font-semibold">
					{profitData?.realizedPercent >= 0 ? (
						<p className=" bg-[#FCF4F4] text-[#FA2D42] rounded-sm px-1.5">
							+{profitData?.realizedPercent}%
						</p>
					) : (
						<p className=" bg-[#F4F9FF] text-[#2E77FA] rounded-sm px-1.5">
							{profitData?.realizedPercent}%
						</p>
					)}
				</div>
			</div>
			{/*최근 매매내역*/}
			<h1 className="text-lg font-medium pt-3 pb-2">최근 매매내역</h1>
			{profitData?.tradeList?.map((data, idx) => (
				<div
					key={idx}
					className="flex items-center text-lg justify-between font-medium"
				>
					<div className="flex items-center gap-3 py-2">
						<Image
							src={`https://static.toss.im/png-icons/securities/icn-sec-fill-${data.symbol}.png`}
							alt={data.stockName}
							height={34}
							width={34}
							className="rounded-full"
						/>
						{data.stockName}
					</div>
					<div className="flex gap-2 items-center">
						<p
							className={`text-sm font-semibold ${data.side == 'SELL' ? 'text-[#2d77fa]' : 'text-[#fb2d42]'}`}
						>
							{data.side == 'SELL' ? '매도' : '매수'}
						</p>

						<p>{data.totalPrice.toLocaleString()}</p>
					</div>
				</div>
			))}
		</CustomCard>
	);
}
