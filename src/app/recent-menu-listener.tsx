// app/recent-menu-listener.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { saveRecentMenu } from '@/utils/recentMenuStorage';

const MENU_MAP = [
	{ id: 'dashboard/guru', label: '고수의 Pick', icon: '📌' },
	{ id: 'dashboard/sector-news', label: '섹터 뉴스', icon: '🗞️' },
	{ id: 'dashboard/similar-chart', label: '유사 차트', icon: '🧐' },
	{ id: 'dashboard/reports', label: '리포트', icon: '📋' },
	{ id: 'dashboard/my-stock', label: '보유 종목', icon: '📥' },
	// { label: '실시간 차트', id: ':stockCode', icon: '⏰' },
	{ label: '호가', id: ':stockCode/orderbook', icon: '📊' },
	{ label: '주문', id: ':stockCode/order', icon: '🧾' },
	{ label: '고수의 거래량', id: ':stockCode/guru', icon: '📈' },
];

export default function RecentMenuListener() {
	const pathname = usePathname();

	useEffect(() => {
		if (!pathname) return;

		const segments = pathname.split('/').filter(Boolean);
		const stockCode = /^\d+$/.test(segments[0]) ? segments[0] : null;
		let normalizedPath = pathname.replace(/^\/|\/$/g, '');
		if (stockCode)
			normalizedPath = normalizedPath.replace(stockCode, ':stockCode');
		const matched = MENU_MAP.find((m) => normalizedPath.endsWith(m.id));
		if (matched) {
			const menuToSave = {
				...matched,
				id: matched.id.includes(':stockCode')
					? matched.id.replace(':stockCode', stockCode!)
					: matched.id,
			};
			saveRecentMenu(menuToSave);
		}
	}, [pathname]);

	return null;
}
