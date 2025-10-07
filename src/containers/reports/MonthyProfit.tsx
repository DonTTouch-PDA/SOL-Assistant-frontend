'use client';
import CustomCard from '@/components/common/customCard';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const data = {
	total: { profit: 234320, diff: 23.2 },
	breakdown: [
		{
			stock: '신한지주',
			profit: 340220,
			imgUrl:
				'https://static.toss.im/png-icons/securities/icn-sec-fill-055550.png',
		},
		{
			stock: 'NAVER',
			profit: 232500,
			imgUrl:
				'https://static.toss.im/png-icons/securities/icn-sec-fill-035420.png',
		},
	],
};

export default function MonthlyProfit() {
	const router = useRouter();
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
						{data.total.profit.toLocaleString()}
					</b>
					{` `}원
				</p>
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
			{/*이번달 매매내역*/}
			<h1 className="text-lg font-medium pt-3 pb-2">이번달 매매내역</h1>
			{data.breakdown.map((data, idx) => (
				<div
					key={idx}
					className="flex items-center text-lg justify-between font-medium"
				>
					<div className="flex items-center gap-3 py-2">
						<Image
							src={data.imgUrl}
							alt={data.stock}
							height={34}
							width={34}
							className="rounded-full"
						/>
						{data.stock}
					</div>
					<p className="">{data.profit.toLocaleString()}</p>
				</div>
			))}
		</CustomCard>
	);
}
