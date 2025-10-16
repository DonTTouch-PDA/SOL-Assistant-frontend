'use client';
import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { useStock } from '@/contexts/StockContext';

export default function Order() {
	const [orderQuantity, setOrderQuantity] = useState(0);
	const [orderPrice, setOrderPrice] = useState(0);
	const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
	const { stockInfo } = useStock();

	// 호가 데이터 생성
	const generateOrderbookData = () => {
		const currentPrice = stockInfo?.previousClose || 85200;
		const priceUnit =
			currentPrice < 2000
				? 1
				: currentPrice < 5000
					? 5
					: currentPrice < 20000
						? 10
						: currentPrice < 50000
							? 50
							: currentPrice < 200000
								? 100
								: 500;

		const data = [];
		for (let i = 10; i >= -10; i--) {
			const orderPrice = currentPrice + i * priceUnit;
			const quantity = Math.floor(Math.random() * 100000) + 1000;

			data.push({
				price: orderPrice,
				quantity,
				isCurrentPrice: i === 0,
			});
		}
		return data;
	};

	const orderbookData = generateOrderbookData();
	return (
		<div className="w-full h-full flex -px-[22px]">
			{/* 호가창 */}
			<div className="w-2/5 bg-white border-r border-gray-200">
				<div className="overflow-y-auto max-h-[calc(100vh-200px)]">
					{orderbookData.map((item) => (
						<div
							key={item.price}
							className={`flex justify-between items-center h-8 cursor-pointer  hover:bg-gray-50 ${
								item.isCurrentPrice ? 'border border-black rounded-[4px]' : ''
							} ${orderPrice === item.price ? 'bg-blue-50' : ''}`}
							onClick={() => setOrderPrice(item.price)}
						>
							<div className="w-1/3 text-center">
								<div
									className={`text-xs font-medium ${item.isCurrentPrice ? 'font-bold' : ''}`}
								>
									{item.price.toLocaleString()}
								</div>
							</div>
							<div className="w-1/3 text-left text-xs text-red-600">
								{item.quantity.toLocaleString()}
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="w-3/5  flex flex-col justify-between pl-[10px]">
				<div>
					<div className="flex">
						<div
							className={`w-1/2 py-2 text-center cursor-pointer ${
								tradeType === 'buy'
									? 'bg-red-500 text-white'
									: 'bg-gray-200 text-gray-700'
							}`}
							onClick={() => setTradeType('buy')}
						>
							구매
						</div>
						<div
							className={`w-1/2 py-2 text-center cursor-pointer ${
								tradeType === 'sell'
									? 'bg-blue-500 text-white'
									: 'bg-gray-200 text-gray-700'
							}`}
							onClick={() => setTradeType('sell')}
						>
							판매
						</div>
					</div>
					<div className="flex flex-col">
						<p className="text-[16px] font-bold pl-[5px]">가격</p>
						<div
							className={`border ${tradeType === 'buy' ? 'bg-red-200' : 'bg-blue-200'} rounded-lg p-2 text-center mb-[10px]`}
						>
							{orderPrice}원
						</div>
						<p className="text-[16px] font-bold pl-[5px]">수량</p>
						<div className="flex items-center gap-2 border justify-between border-black rounded-lg p-2">
							<Minus onClick={() => setOrderQuantity(orderQuantity - 1)} />
							<p>{orderQuantity}주</p>
							<Plus onClick={() => setOrderQuantity(orderQuantity + 1)} />
						</div>
					</div>
				</div>
				<div>
					<div className="flex flex-col gap-[10px]">
						<div className="flex items-center">
							<p className="w-1/4 text-right text-[14px] text-gray-500">수량</p>
							<p className="w-3/4 text-right text-[23px] font-bold">
								{orderQuantity}개
							</p>
						</div>
						<div className="flex items-center mb-4">
							<p className="w-1/4 text-right text-[14px] text-gray-500">
								주문금액
							</p>
							<p className="w-3/4 text-right text-[23px] font-bold">
								{orderPrice * orderQuantity}원
							</p>
						</div>
						<button
							className={`w-full h-12  text-white rounded-lg ${tradeType === 'buy' ? 'bg-red-400' : 'bg-blue-400'}`}
						>
							{tradeType === 'buy' ? '구매하기' : '판매하기'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
