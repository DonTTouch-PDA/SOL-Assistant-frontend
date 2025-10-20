import React from 'react';
import { MyStock } from '@/types/myStock';
import ProfitRate from '../common/ProfitRate';
import Image from 'next/image';
import { setStockCodeToLocalStorage } from '@/utils/stockCodeStorage';
import { useRouter } from 'next/navigation';

interface StockItemProps {
	stock: MyStock;
}

export default function StockItem({ stock }: StockItemProps) {
	const router = useRouter();
	const formatPrice = (price: number) => {
		return price.toLocaleString();
	};

	const formatChangeRate = (rate: number) => {
		return `${rate > 0 ? '+' : ''}${rate.toFixed(2)}%`;
	};

	const formatChangeAmount = (amount: number) => {
		return `${amount > 0 ? '+' : ''}${amount.toLocaleString()}`;
	};

	return (
		<div className="bg-white border-b pt-[12px] border-gray-100">
			{/* 상단 행 */}
			<div
				className="flex items-center justify-between mb-2"
				onClick={() => {
					setStockCodeToLocalStorage(stock.symbol);
					router.push(`/${stock.symbol}`);
				}}
			>
				<div className="flex items-center gap-3">
					<div>
						<Image
							src={`https://static.toss.im/png-icons/securities/icn-sec-fill-${stock.symbol}.png`}
							alt={stock.stockName}
							width={32}
							height={32}
							className="rounded-full"
						/>
					</div>

					{/* 종목 정보 */}
					<div>
						<h2 className="font-semibold text-black text-base">
							{stock.stockName}
						</h2>
						<div className="flex text-gray-500 gap-1 text-xs">
							<p>{stock.symbol}</p>
							<p>{stock.market}</p>
						</div>
					</div>
				</div>

				{/* <div className="w-16 h-8 bg-gray-100 rounded flex items-center justify-center">
					<span className="text-gray-400 text-xs">차트</span>
				</div> */}

				{/* 가격 정보 */}
				<div className="flex flex-col items-end text-right mb-[4px]">
					<div
						className={`${stock.changeRate >= 0 ? 'text-red-500' : 'text-blue-500'} font-semibold text-base`}
					>
						{formatPrice(stock.currentPrice)}
					</div>
					<div
						className={`flex text-sm font-medium ${stock.changeRate >= 0 ? 'text-red-500' : 'text-blue-500'}`}
					>
						<ProfitRate profitRate={stock.changeRate} />
					</div>
				</div>
			</div>

			{/* 내 보유 정보 */}
			<div className="flex justify-between items-center -mx-[22px] pr-[22px] pl-[65px] bg-gray-100 py-[4px] font-normal">
				<div className="w-1/3 text-sm text-[#777F8A] font-medium">
					{stock.quantity}주 {formatPrice(stock.costBasis)}
				</div>
				<div className="w-2/3 flex text-right gap-2 text-sm font-medium">
					<span
						className={`w-1/2 ${stock.profit >= 0 ? 'text-red-500' : 'text-blue-500'}`}
					>
						{formatChangeRate(stock.profit)}
					</span>
					<span
						className={`w-1/2 ${stock.diff >= 0 ? 'text-red-500' : 'text-blue-500'} `}
					>
						{formatChangeAmount(stock.diff)}
					</span>
				</div>
			</div>
		</div>
	);
}
