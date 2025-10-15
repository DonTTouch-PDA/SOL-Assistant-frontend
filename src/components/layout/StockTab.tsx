'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { getStockCodeFromLocalStorage } from '@/utils/stockCodeStorage';

const tabMenus = [
	{ id: '', label: '차트' },
	{ id: 'orderbook', label: '호가' },
	{ id: 'order', label: '주문' },
	{ id: 'guru', label: '고수 거래량' },
];
export default function StockTab() {
	const router = useRouter();
	const stockCode = getStockCodeFromLocalStorage();
	const [currentTab, setCurrentTab] = useState('');
	const pathname = usePathname();
	useEffect(() => {
		const segments = pathname.split('/').filter(Boolean);
		const lastSegment = segments[1] || '';
		setCurrentTab(lastSegment);
	}, [pathname]);

	const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
	const tabRefs = useRef<Record<string, HTMLParagraphElement | null>>({});
	useEffect(() => {
		const el = tabRefs.current[currentTab];
		if (el) {
			setUnderlineStyle({
				left: el.offsetLeft,
				width: el.offsetWidth,
			});
		}
	}, [currentTab]);

	return (
		<>
			<div className="relative flex border-b border-gray-200 pb-2 -mx-5">
				{/* 탭 */}
				{tabMenus.map((tab) => (
					<p
						key={tab.id}
						ref={(el) => {
							tabRefs.current[tab.id] = el;
						}}
						onClick={() => router.push(`/${stockCode}/${tab.id}`)}
						className={`font-semibold pl-2 ml-3 cursor-pointer transition-colors ${
							currentTab === tab.id ? 'text-black' : 'text-[#888E98]'
						}`}
					>
						{tab.label}
					</p>
				))}

				{/* 밑줄 */}
				<div
					className="absolute bottom-0 h-0.5 bg-black transition-all duration-300 ease-in-out"
					style={{
						left: underlineStyle.left + 12, // ml-3 보정
						width: underlineStyle.width - 16, // padding 감안
					}}
				/>
			</div>
		</>
	);
}
