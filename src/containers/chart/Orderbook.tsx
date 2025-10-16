'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useStock } from '@/contexts/StockContext';

interface OrderbookData {
	price: number;
	askQuantity: number;
	bidQuantity: number;
	changeRate: number;
}

export default function Orderbook() {
	const [orderbookData, setOrderbookData] = useState<OrderbookData[]>([]);
	const [currentPrice, setCurrentPrice] = useState(0); // 현재가 기준
	const { stockInfo, isLoading } = useStock();
	const scrollRef = useRef<HTMLDivElement>(null);

	// 주식 가격대에 따른 호가단위 계산
	const getPriceUnit = (price: number): number => {
		if (price < 2000) return 1;
		if (price < 5000) return 5;
		if (price < 20000) return 10;
		if (price < 50000) return 50;
		if (price < 200000) return 100;
		if (price < 500000) return 500;
		return 1000;
	};

	// 호가 데이터 생성 함수
	const generateOrderbookData = useCallback(
		(basePrice: number, prePrice: number) => {
			const data: OrderbookData[] = [];
			const priceUnit = getPriceUnit(basePrice);

			// 현재가 기준으로 위아래 호가 생성 (현재가가 중앙에 오도록)
			for (let i = 10; i >= -10; i--) {
				const price = basePrice + i * priceUnit;
				const changeRate = ((price - prePrice) / prePrice) * 100;

				// 매도호가 (현재가보다 높은 가격)
				const askQuantity =
					i > 0 ? Math.floor(Math.random() * 1000000) + 5000 : 0;
				// 매수호가 (현재가보다 낮거나 같은 가격)
				const bidQuantity =
					i < 0 ? Math.floor(Math.random() * 1000000) + 5000 : 0;

				data.push({
					price,
					askQuantity,
					bidQuantity,
					changeRate,
				});
			}

			setOrderbookData(data);
		},
		[]
	);

	useEffect(() => {
		if (stockInfo && !isLoading) {
			const nowPrice = stockInfo.previousClose || 0;
			const prevPrice = stockInfo.prePreviousClose || 0;
			setCurrentPrice(nowPrice);
			generateOrderbookData(nowPrice, prevPrice);

			// 데이터 로드 후 현재가를 중앙으로 스크롤
			setTimeout(() => {
				if (scrollRef.current) {
					const containerHeight = scrollRef.current.clientHeight;
					const itemHeight = 45; // 각 호가 행의 높이 (h-10 = 40px)
					const currentPriceIndex = 10; // 현재가는 중앙(인덱스 10)에 위치
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

	// 1초마다 수량 업데이트
	useEffect(() => {
		const interval = setInterval(() => {
			setOrderbookData((prev) =>
				prev.map((item) => ({
					...item,
					askQuantity:
						item.price > currentPrice
							? Math.floor(Math.random() * 1000000) + 5000
							: 0,
					bidQuantity:
						item.price <= currentPrice
							? Math.floor(Math.random() * 1000000) + 5000
							: 0,
				}))
			);
		}, 1000);

		return () => clearInterval(interval);
	}, [currentPrice]);

	const formatQuantity = (quantity: number) => {
		if (quantity === 0) return '';
		return quantity.toLocaleString();
	};

	// 수량에 따른 배경 너비 계산
	const getQuantityWidth = (quantity: number) => {
		if (quantity === 0) return '0%';
		const maxQuantity = 1000000; // 100만개를 최대 기준으로 설정
		const percentage = (quantity / maxQuantity) * 100;
		return `${Math.min(percentage, 100)}%`;
	};

	const getPriceColor = (changeRate: number) => {
		if (changeRate > 0) return 'text-red-500';
		if (changeRate < 0) return 'text-blue-500';
		return 'text-black';
	};

	const getChangePercentText = (changeRate: number) => {
		if (changeRate > 0) return `+${changeRate.toFixed(2)}%`;
		if (changeRate < 0) return `${changeRate.toFixed(2)}%`;
		return '0.00%';
	};

	if (isLoading) {
		return (
			<div className="w-full h-full flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-gray-600">호가 데이터 로딩 중...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full h-full flex flex-col">
			<div
				ref={scrollRef}
				className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)]"
			>
				{orderbookData.map((item) => {
					// 현재가인지 확인
					const isCurrentPrice = item.price === currentPrice;

					return (
						<div
							key={item.price}
							className={'flex items-center h-10  border-blue-500'}
						>
							{/* 매도수량 */}
							<div className="w-1/3 text-right pr-2 relative">
								{item.askQuantity > 0 && (
									<div className="relative">
										{/* 배경 바 */}
										<div
											className="absolute right-0 top-0 h-full bg-blue-100 rounded"
											style={{
												width: getQuantityWidth(item.askQuantity),
											}}
										/>
										{/* 수량 텍스트 */}
										<span className="relative z-10 text-sm px-2 py-1 text-blue-600">
											{formatQuantity(item.askQuantity)}
										</span>
									</div>
								)}
							</div>

							{/* 호가 */}
							<div
								className={`w-1/3 text-center ${isCurrentPrice ? 'border border-black rounded-[8px]' : ''}`}
							>
								<div
									className={`text-sm font-medium ${getPriceColor(item.changeRate)}`}
								>
									{item.price.toLocaleString()}원
								</div>
								<div className={`text-xs ${getPriceColor(item.changeRate)}`}>
									{getChangePercentText(item.changeRate)}
								</div>
							</div>

							{/* 매수수량 */}
							<div className="w-1/3 text-left pl-2 relative">
								{item.bidQuantity > 0 && (
									<div className="relative">
										{/* 배경 바 */}
										<div
											className="absolute left-0 top-0 h-full bg-red-100 rounded"
											style={{
												width: getQuantityWidth(item.bidQuantity),
											}}
										/>
										{/* 수량 텍스트 */}
										<span className="relative z-10 text-sm px-2 py-1 text-red-600">
											{formatQuantity(item.bidQuantity)}
										</span>
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
