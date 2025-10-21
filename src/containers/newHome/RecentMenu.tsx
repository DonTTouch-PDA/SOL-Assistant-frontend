'use client';
import { useEffect, useState } from 'react';
import { getStockCodeFromLocalStorage } from '@/utils/stockCodeStorage';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
interface MenuItem {
	id: string;
	label: string;
}

export default function RecentMenu() {
	const [recentMenu, setRecentMenu] = useState<MenuItem[]>([]);
	useEffect(() => {
		const stockCode = getStockCodeFromLocalStorage() || '005930';
		const defaultMenu = [
			{ label: '리포트', id: 'dashboard/reports' },
			{ label: '고수의 Pick', id: 'dashboard/guru' },
			{
				label: '고수 거래량',
				id: `${stockCode}/guru`,
			},
		];
		setRecentMenu(defaultMenu);
	}, []);

	return (
		<div className="p-3">
			<h1 className="text-xl py-3 font-medium">프디아님의 맞춤 메뉴</h1>
			<ul className="flex flex-col gap-1">
				{recentMenu.map((menu) => (
					<Link key={menu.id} href={menu.id}>
						<li className="text-lg flex justify-between px-3">
							<p>{menu.label}</p>
							<ChevronRight />
						</li>
					</Link>
				))}
			</ul>
		</div>
	);
}
