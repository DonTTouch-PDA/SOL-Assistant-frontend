import React from 'react';
import { MyStock } from '@/types/myStock';
import ProfitRate from '../common/ProfitRate';

interface StockItemProps {
	stock: MyStock;
}

export default function StockItem({ stock }: StockItemProps) {
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
			<div className="flex items-center justify-between mb-2">
				<div className="flex items-center gap-3">
					<div>
						<img
							src={stock.img}
							alt={stock.name}
							width={24}
							height={24}
							className="rounded-full"
						/>
					</div>

					{/* 종목 정보 */}
					<div>
						<h2 className="font-bold text-black text-base">{stock.name}</h2>
						<div className="flex text-gray-500 gap-1 text-xs">
							<p>{stock.code}</p>
							<p>{stock.type}</p>
						</div>
					</div>
				</div>

				<div className="w-16 h-8 bg-gray-100 rounded flex items-center justify-center">
					<span className="text-gray-400 text-xs">차트</span>
				</div>

				{/* 가격 정보 */}
				<div className="flex flex-col items-end text-right">
					<div
						className={`${stock.changeRate >= 0 ? 'text-red-500' : 'text-blue-500'} font-semibold text-base`}
					>
						{formatPrice(stock.currentPrice)}
					</div>
					<div
						className={`flex text-sm ${stock.changeRate >= 0 ? 'text-red-500' : 'text-blue-500'}`}
					>
						<ProfitRate profitRate={stock.changeRate} />
					</div>
				</div>
			</div>

			{/* 내 보유 정보 */}
			<div className="flex justify-between items-center -mx-[22px] px-[22px] bg-gray-100 py-[4px]">
				<div className="text-sm text-gray-700">
					{stock.holding}주 {formatPrice(stock.buyAverage)}
				</div>
				<div className="flex gap-4 text-sm">
					<span
						className={`${stock.profit >= 0 ? 'text-red-500' : 'text-blue-500'}`}
					>
						{formatChangeRate(stock.profit)}
					</span>
					<span
						className={`${stock.diff >= 0 ? 'text-red-500' : 'text-blue-500'}`}
					>
						{formatChangeAmount(stock.diff)}
					</span>
				</div>
			</div>
		</div>
	);
}
