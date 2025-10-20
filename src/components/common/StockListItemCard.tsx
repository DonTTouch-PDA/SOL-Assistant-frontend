import React from 'react';
import ProfitRate from './ProfitRate';
import Image from 'next/image';

interface StockListItemCardProps {
	name: string;
	img: string;
	code: string;
	currentPrice: number;
	changeRate: number;
	volumeRate?: number;
	volume?: number;
	rank?: number;
	detail?: string;
	onClick: () => void;
}

export default function StockListItemCard({
	name,
	img,
	code,
	currentPrice,
	changeRate,
	volumeRate,
	volume,
	rank,
	detail,
	onClick,
}: StockListItemCardProps) {
	const formatPrice = (price: number) => {
		return price.toLocaleString();
	};

	const formatVolume = (volume: number) => {
		if (volume >= 1000000000) {
			return `${(volume / 1000000000).toFixed(2)}억`;
		} else if (volume >= 1000000) {
			return `${(volume / 1000000).toFixed(2)}만`;
		} else {
			return volume.toLocaleString();
		}
	};

	return (
		<div className="bg-white  pt-[12px] border-gray-100" onClick={onClick}>
			<div className="flex items-center justify-between mb-2">
				<div className="flex items-center gap-3">
					{rank !== undefined && (
						<div className=" flex items-center justify-center">
							<p className="text-blue-700 text-base ">{rank + 1}</p>
						</div>
					)}

					{/* 종목 로고 */}
					<div>
						<Image
							src={img}
							alt={name}
							width={36}
							height={36}
							className="rounded-full"
						/>
					</div>

					{/* 종목 정보 */}
					<div className="text-left">
						<h2 className="text-black text-base font-medium">{name}</h2>
						{detail === 'buy' && (
							<div className="inline-block text-red-500 rounded-[4px] bg-red-100 px-[4px] text-sm font-medium">
								매수 +{volumeRate}%
							</div>
						)}
						{detail === 'sell' && (
							<div className="inline-block text-blue-500 rounded-[4px] bg-blue-100 px-[4px] text-sm font-medium">
								매도 +{volumeRate}%
							</div>
						)}
						{detail === 'volume' && (
							<div className="inline-block text-gray-500 rounded-[4px] bg-gray-100 px-[4px] text-sm font-medium">
								거래대금 {volume ? formatVolume(volume) : '-'}
							</div>
						)}
					</div>
				</div>

				{/* 가격 정보 */}
				<div className="flex flex-col items-end text-right">
					<div
						className={`${changeRate >= 0 ? 'text-red-500' : 'text-blue-500'} font-semibold text-base`}
					>
						{formatPrice(currentPrice)}
					</div>
					<div
						className={`flex text-sm ${changeRate >= 0 ? 'text-red-500' : 'text-blue-500'}`}
					>
						<ProfitRate profitRate={changeRate} />
					</div>
				</div>
			</div>
		</div>
	);
}
