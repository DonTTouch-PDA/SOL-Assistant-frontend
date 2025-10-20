'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Minus, Plus } from 'lucide-react';
import { useStock } from '@/contexts/StockContext';
import { orderBuyStock, orderSellStock } from '@/services/orderServices';
import { toast } from 'react-toastify';

interface OrderbookData {
	price: number;
	quantity: number;
	changeRate: number;
}

interface OrderFromModal {
	price: number;
	tradeType: 'buy' | 'sell';
}

export default function Order({
	orderFromModal,
}: {
	orderFromModal?: OrderFromModal;
}) {
	const [orderBookData, setOrderBookData] = useState<OrderbookData[]>([]);
	const [orderQuantity, setOrderQuantity] = useState(0);
	const [orderPrice, setOrderPrice] = useState(orderFromModal?.price || 0);
	const [tradeType, setTradeType] = useState<OrderFromModal['tradeType']>(
		orderFromModal?.tradeType || 'buy'
	);
	const { stockInfo, isLoading } = useStock();
	const [currentPrice, setCurrentPrice] = useState(0);
	const scrollRef = useRef<HTMLDivElement>(null);

	const getPriceUnit = (price: number): number => {
		if (price < 2000) return 1;
		if (price < 5000) return 5;
		if (price < 20000) return 10;
		if (price < 50000) return 50;
		if (price < 200000) return 100;
		if (price < 500000) return 500;
		return 1000;
	};
	// 호가 데이터 생성
	const generateOrderbookData = useCallback(
		(nowPrice: number, prevPrice: number) => {
			const priceUnit = getPriceUnit(nowPrice);

			const data = [];
			for (let i = 10; i >= -10; i--) {
				const orderPrice = nowPrice + i * priceUnit;
				const changeRate = ((orderPrice - prevPrice) / prevPrice) * 100;
				const quantity = Math.floor(Math.random() * 1000000) + 1000;

				data.push({
					price: orderPrice,
					quantity,
					changeRate: changeRate,
				});
			}
			setOrderBookData(data);
		},
		[]
	);
	useEffect(() => {
		if (stockInfo && !isLoading) {
			const nowPrice = stockInfo.previousClose || 0;
			const prevPrice = stockInfo.prePreviousClose || 0;
			setCurrentPrice(nowPrice);
			if (orderFromModal) {
				setOrderPrice(orderFromModal.price);
			} else {
				setOrderPrice(nowPrice);
			}
			generateOrderbookData(nowPrice, prevPrice);

			setTimeout(() => {
				if (scrollRef.current) {
					const containerHeight = scrollRef.current.clientHeight;
					const itemHeight = 40;
					const currentPriceIndex = 10;
					const scrollTop =
						currentPriceIndex * itemHeight -
						containerHeight / 2 +
						itemHeight / 2;

					scrollRef.current.scrollTo({
						top: Math.max(0, scrollTop),
						behavior: 'smooth',
					});
				}
			}, 100);
		}
	}, [stockInfo, isLoading, generateOrderbookData]);

	useEffect(() => {
		const interval = setInterval(() => {
			setOrderBookData((prev) =>
				prev.map((item) => ({
					...item,
					quantity: Math.floor(Math.random() * 1000000) + 3000,
				}))
			);
		}, 1000);

		return () => clearInterval(interval);
	}, [currentPrice]);

	const getQuantityWidth = (quantity: number) => {
		if (quantity === 0) return '0%';
		const maxQuantity = 1000000;
		const percentage = (quantity / maxQuantity) * 100;
		return `${Math.min(percentage, 100)}%`;
	};

	return (
		<div
			className="w-full h-full flex -px-[22px] overflow-hidden"
			style={{ height: 'calc(100vh - 200px - 68px)' }}
		>
			{/* 호가창 */}
			<div className="w-2/5 bg-white border-r border-gray-200 flex flex-col h-full">
				<div
					ref={scrollRef}
					className="flex-1 overflow-x-hidden overflow-y-auto"
				>
					{orderBookData.map((item) => (
						<div
							key={item.price}
							className={`flex justify-between items-center my-1 h-10 cursor-pointer  hover:bg-gray-50 ${
								item.price === currentPrice
									? 'border border-black rounded-[4px]'
									: ''
							} ${orderPrice === item.price ? 'bg-blue-50' : ''}`}
							onClick={() => setOrderPrice(item.price)}
						>
							<div className="w-1/2 text-left">
								<div
									className={`text-xs font-medium ${item.price === stockInfo?.prePreviousClose ? 'text-black' : item.price > (stockInfo?.prePreviousClose || 0) ? 'text-red-600' : 'text-blue-600'}`}
								>
									<p>{item.price.toLocaleString()}</p>
									<p>{item.changeRate.toFixed(2)}%</p>
								</div>
							</div>
							<div
								className={`w-1/2 text-right relative text-xs ${item.price <= currentPrice ? 'text-red-600' : 'text-blue-600'}`}
							>
								<div
									className={`absolute right-0 top-0 h-full rounded ${item.price <= currentPrice ? 'bg-red-100' : 'bg-blue-100'}`}
									style={{
										width: getQuantityWidth(item.quantity),
									}}
								/>
								<span
									className={`relative z-10 text-sm px-2 py-1 ${item.price <= currentPrice ? 'text-red-600' : 'text-blue-600'}`}
								>
									{item.quantity.toLocaleString()}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
			{/* 주문 탭 */}
			<div className="w-3/5 flex flex-col pl-[10px] h-full justify-between">
				<div className="flex-shrink-0">
					<div className="flex relative">
						<div
							className={`w-1/2 py-2 text-center cursor-pointer font-bold ${
								tradeType === 'buy' ? 'text-black' : 'text-gray-400'
							}`}
							onClick={() => {
								setTradeType('buy');
								setOrderQuantity(0);
								setOrderPrice(currentPrice);
							}}
						>
							구매
						</div>
						<div
							className={`w-1/2 py-2 text-center cursor-pointer font-bold ${
								tradeType === 'sell' ? 'text-black' : 'text-gray-400'
							}`}
							onClick={() => {
								setTradeType('sell');
								setOrderQuantity(0);
								setOrderPrice(currentPrice);
							}}
						>
							판매
						</div>
						{/* 밑줄 */}
						<div
							className="absolute bottom-0 h-0.5 bg-black transition-all duration-300 ease-in-out"
							style={{
								left: tradeType === 'buy' ? '0%' : '50%',
								width: '50%',
							}}
						/>
					</div>
					<div className="flex flex-col mt-4">
						<p className="text-[16px] font-bold pl-[5px]">가격</p>
						<div
							className={`border ${tradeType === 'buy' ? 'bg-red-200' : 'bg-blue-200'} rounded-lg p-2 text-center mb-[10px]`}
						>
							{orderPrice.toLocaleString()}원
						</div>
						<p className="text-[16px] font-bold pl-[5px]">수량</p>
						<div className="flex items-center gap-2 border justify-between border-black rounded-lg p-2">
							<Minus onClick={() => setOrderQuantity(orderQuantity - 1)} />
							<p>{orderQuantity.toLocaleString()}주</p>
							<Plus onClick={() => setOrderQuantity(orderQuantity + 1)} />
						</div>
					</div>
				</div>

				<div className="flex-shrink-0 mt-6">
					<div className="flex flex-col gap-[10px]">
						<div className="flex items-center">
							<p className="w-1/4 text-right text-[13px] text-gray-500">수량</p>
							<p className="w-3/4 text-right text-[23px] font-bold">
								{orderQuantity.toLocaleString()}개
							</p>
						</div>
						<div className="flex items-center mb-4">
							<p className="w-1/4 text-right text-[13px] text-gray-500">
								주문금액
							</p>
							<p className="w-3/4 text-right text-[23px] font-bold">
								{(orderPrice * orderQuantity).toLocaleString()}원
							</p>
						</div>
						<button
							className={`w-full h-[50px] text-white rounded-lg ${tradeType === 'buy' ? 'bg-red-500' : 'bg-blue-500'}`}
							onClick={async () => {
								if (stockInfo) {
									try {
										if (tradeType === 'buy') {
											const response = await orderBuyStock(
												stockInfo.symbol,
												orderPrice,
												orderQuantity
											);
											if (response.status === 'SUCCESS') {
												toast.success(response.message);
											} else {
												toast.error(response.message);
											}
										} else {
											const response = await orderSellStock(
												stockInfo.symbol,
												orderPrice,
												orderQuantity
											);
											if (response.status === 'SUCCESS') {
												toast.success(response.message);
											} else {
												toast.error(response.message);
											}
										}
									} catch (error) {
										console.error('주문 처리 중 오류:', error);
										toast.error(
											'주문 처리 중 오류가 발생했습니다. 다시 시도해주세요.'
										);
									}
								}
							}}
						>
							{tradeType === 'buy' ? '구매하기' : '판매하기'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
