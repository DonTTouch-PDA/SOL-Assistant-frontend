'use client';
import { useEffect, useState } from 'react';
import { getStockCodeFromLocalStorage } from '@/utils/stockCodeStorage';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getRecentMenus } from '@/utils/recentMenuStorage';

interface MenuItem {
	label: string;
	id: string;
	icon: string;
}
const defaultMenu = [
	{ label: '고수의 Pick', id: 'dashboard/guru', icon: '📌' },
	{ label: '섹터 뉴스', id: 'dashboard/sector-news', icon: '🗞️' },
	{ label: '유사 차트', id: 'similar-chart', icon: '🧐' },
];

export default function RecentMenu() {
	const [recentMenu, setRecentMenu] = useState<MenuItem[]>([]);
	const [stockCode, setStockCode] = useState('005930');

	const menuList: MenuItem[] = [
		{ label: '고수의 Pick', id: 'dashboard/guru', icon: '📌' },
		{ label: '섹터 뉴스', id: 'dashboard/sector-news', icon: '🗞️' },
		{ label: '유사 차트', id: 'similar-chart', icon: '🧐' },
		{ label: '리포트', id: 'dashboard/reports', icon: '📋' },
		{ label: '보유 종목', id: 'my-stock', icon: '📥' },
		{ label: '실시간 차트', id: `${stockCode}`, icon: '⏰' },
		{ label: '호가', id: `${stockCode}/guru`, icon: '📊' },
		{ label: '주문', id: `${stockCode}/orderbook`, icon: '🧾' },
		{ label: '고수의 거래량', id: `${stockCode}/guru`, icon: '📈' },
	];

	useEffect(() => {
		const stockCode = getStockCodeFromLocalStorage() || '005930';
		setStockCode(stockCode);
		const savedMenus = getRecentMenus();
		if (!savedMenus || savedMenus.length === 0) {
			setRecentMenu(defaultMenu);
		} else {
			setRecentMenu(savedMenus);
		}
	}, []);

	return (
		<div className="p-3">
			<h1 className="text-lg py-3 font-semibold">프디아님의 맞춤 메뉴</h1>
			<ul className="flex flex-col gap-3">
				{recentMenu.map((menu) => (
					<Link key={menu.id} href={menu.id}>
						<li className="flex justify-between items-center hover:bg-gray-100 rounded-lg transition font-medium">
							<span className="flex gap-2">
								<p>{menu.icon} </p>
								<p>{menu.label}</p>
							</span>
							<ChevronRight size={18} />
						</li>
					</Link>
				))}
			</ul>
		</div>
	);
}
