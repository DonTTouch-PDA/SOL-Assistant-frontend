'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface OrderbookModalProps {
	price: number;
	changeRate: number;
	needWarning: boolean;
	coordinateY: number;
	onClose: () => void;
}
export default function OrderbookModal({
	price,
	changeRate,
	onClose,
	needWarning,
	coordinateY,
}: OrderbookModalProps) {
	const router = useRouter();
	const pathname = usePathname();

	const stockCode = pathname.split('/')[1];

	const preventOffModal = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	const handleSellClick = () => {
		router.push(`/${stockCode}/order?tradeType=sell&price=${price}`);
		onClose();
	};

	const handleBuyClick = () => {
		router.push(`/${stockCode}/order?tradeType=buy&price=${price}`);
		onClose();
	};
	return (
		<div
			onClick={onClose}
			className="absolute -mx-[22px] px-[22px] -mt-[22px] inset-0 z-10 bg-black/60"
		>
			<div
				onClick={preventOffModal}
				className="absolute  rounded-lg shadow-lg"
				style={{
					maxWidth: '406px',
					minWidth: '331px',
					top: `${Math.min(coordinateY - 80, window.innerHeight - 220)}px`,
					left: '50%',
					transform: 'translateX(-50%)',
				}}
			>
				<div className="mb-[28px] text-center text-[20px] text-white">
					{!needWarning && (
						<p>
							거래에 주의가 필요한 종목이에요.
							<br />
							매매하시겠어요?
						</p>
					)}
				</div>
				<div>
					<div className="flex text-center items-center h-[55px] bg-white rounded-[8px]">
						<button
							onClick={handleSellClick}
							className="w-1/4 bg-blue-500 text-white h-full rounded-l-[8px]"
						>
							판매
						</button>
						<div className="flex flex-col w-1/2">
							<p className="font-bold">{price.toLocaleString()}원</p>
							<p>{changeRate.toFixed(2)}%</p>
						</div>
						<button
							onClick={handleBuyClick}
							className="w-1/4 bg-red-500 text-white h-full rounded-r-[8px]"
						>
							구매
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
