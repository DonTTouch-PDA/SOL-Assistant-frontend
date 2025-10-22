'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getRecentMenus } from '@/utils/recentMenuStorage';
import { useAuth } from '@/hooks/useAuth';
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
	const { userData, isLoading } = useAuth();

	useEffect(() => {
		const savedMenus = getRecentMenus();
		if (!savedMenus || savedMenus.length === 0) {
			setRecentMenu(defaultMenu);
		} else {
			setRecentMenu(savedMenus);
		}
	}, []);

	return (
		<div className="p-3">
			<h1 className="text-lg py-3 font-semibold">
				{isLoading
					? '로딩 중...'
					: `${userData?.name || '사용자'}님의 맞춤 메뉴`}
			</h1>
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
