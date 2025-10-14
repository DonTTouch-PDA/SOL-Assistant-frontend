'use client';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { getStockCodeFromLocalStorage } from '@/utils/storage';

export default function Header() {
	const [isDashboard, setIsDashboard] = useState(true);
	const router = useRouter();
	const pathname = usePathname();
	const focusColor = ['text-black', 'text-gray-400'];

	// 현재 경로에 따라 탭 상태 바꾸기
	useEffect(() => {
		if (pathname.startsWith('/dashboard')) {
			setIsDashboard(true);
		} else {
			setIsDashboard(false);
		}
	}, [pathname]);

	return (
		<header className="fixed top-0 left-1/2 transform -translate-x-1/2 flex justify-between items-center pt-5 px-6 pb-[16px] w-full max-w-[430px] min-w-[375px] bg-white z-10">
			<div className="flex gap-6">
				<button
					className={`font-bold text-xl ${isDashboard ? focusColor[0] : focusColor[1]}`}
					onClick={() => {
						setIsDashboard(true);
						router.push('/dashboard');
					}}
				>
					대시보드
				</button>
				<button
					className={`font-bold text-xl ${isDashboard ? focusColor[1] : focusColor[0]}`}
					onClick={() => {
						setIsDashboard(false);
						const stockCode = getStockCodeFromLocalStorage();
						if (stockCode) {
							router.push(`/${stockCode}`);
						} else {
							router.push('/005930');
						}
					}}
				>
					차트
				</button>
			</div>

			<Search
				className="w-6 h-6 cursor-pointer"
				onClick={() => {
					console.log('search');
				}}
			/>
		</header>
	);
}
