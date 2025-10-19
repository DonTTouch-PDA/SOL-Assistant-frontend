// src/components/layout/Footer.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
	getStockCodeFromLocalStorage,
	setStockCodeToLocalStorage,
} from '@/utils/stockCodeStorage';

export default function Footer() {
	const [recentStockCode, setRecentStockCode] = useState<string>('');
	const pathname = usePathname();

	useEffect(() => {
		// 현재 URL에서 종목 코드 가져오기
		const currentStockCode = pathname.split('/')[1];

		if (
			currentStockCode &&
			currentStockCode !== 'dashboard' &&
			currentStockCode !== 'menu'
		) {
			setRecentStockCode(currentStockCode);
			setStockCodeToLocalStorage(currentStockCode);
		} else {
			const stockCode = getStockCodeFromLocalStorage();
			if (stockCode) {
				setRecentStockCode(stockCode);
			}
		}
	}, [pathname]);

	const tabs = [
		{ href: '/dashboard', label: '홈' },
		{ href: `/${recentStockCode}`, label: '현재가' },
		{ href: `/${recentStockCode}/order`, label: '주문' },
	];

	return (
		<nav className="fixed bottom-0 border-t border-gray-200 bg-white w-full h-[58px] max-w-[430px] left-1/2 transform -translate-x-1/2 z-10">
			<div className="flex justify-between items-center">
				<ul className="flex px-8 gap-10 pb-2">
					{tabs.map((tab) => (
						<li key={tab.href}>
							<Link
								href={tab.href}
								className="text-gray-500 font-medium text-sm"
							>
								{tab.label}
							</Link>
						</li>
					))}
				</ul>
				<Link href="/menu">
					<Image src="/menu.jpg" alt="메뉴" height={58} width={58} />
				</Link>
			</div>
		</nav>
	);
}
