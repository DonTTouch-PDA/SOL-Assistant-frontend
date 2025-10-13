import React from 'react';
import { GuruTrade } from '@/types/guru';
import ProfitRate from '../common/ProfitRate';

interface GuruTradeItemProps {
	trade: GuruTrade;
	index: number;
}

export default function GuruTradeItem({ trade, index }: GuruTradeItemProps) {
	const formatPrice = (price: number) => {
		return price.toLocaleString();
	};

	return (
		<div className="bg-white  pt-[12px] border-gray-100">
			{/* 상단 행 */}
			<div className="flex items-center justify-between mb-2">
				<div className="flex items-center gap-3">
					{/* 순위 */}
					<div className=" flex items-center justify-center">
						<p className="text-blue-700 text-base ">{index + 1}</p>
					</div>

					{/* 종목 로고 */}
					<div>
						<img
							src={trade.img}
							alt={trade.name}
							width={36}
							height={36}
							className="rounded-full"
						/>
					</div>

					{/* 종목 정보 */}
					<div className="text-left">
						<h2 className="text-black text-base">{trade.name}</h2>
						<div className="inline-block text-red-500 rounded-[4px] bg-red-100 px-[4px] text-sm font-medium">
							매수 +{trade.buyRate}%
						</div>
					</div>
				</div>

				{/* 가격 정보 */}
				<div className="flex flex-col items-end text-right">
					<div
						className={`${trade.changeRate >= 0 ? 'text-red-500' : 'text-blue-500'} font-semibold text-base`}
					>
						{formatPrice(trade.currentPrice)}
					</div>
					<div
						className={`flex text-sm ${trade.changeRate >= 0 ? 'text-red-500' : 'text-blue-500'}`}
					>
						<ProfitRate profitRate={trade.changeRate} />
					</div>
				</div>
			</div>
		</div>
	);
}
