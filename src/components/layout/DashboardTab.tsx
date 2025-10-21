'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const tabs = [
	{ id: '', label: '내 종목 요약' },
	{ id: 'guru', label: '고수의 Pick' },
	{ id: 'sector-news', label: '섹터 뉴스' },
	{ id: 'similar-chart', label: '유사 차트' },
	{ id: 'reports', label: '리포트' },
	{ id: 'my-stock', label: '보유종목' },
];

export default function DashboardTab() {
	const [activeTab, setActiveTab] = useState('');
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const currentPath = pathname.replace('/dashboard/', '');
		const topLevelPath = currentPath.split('/')[0];
		setActiveTab(topLevelPath);
	}, [pathname]);

	return (
		<div className="w-full bg-white">
			<div className="flex overflow-x-auto scrollbar-hide">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => {
							setActiveTab(tab.id);
							router.push(`/dashboard/${tab.id}`);
						}}
						className={`flex-shrink-0 px-[12px] py-2 rounded-[40px] text-sm font-medium transition-colors ${
							activeTab === tab.id
								? 'bg-gradient-to-r from-[#4A2DEC] to-[#3A5CFE] text-white'
								: 'text-gray-400 hover:bg-gray-50'
						}`}
					>
						{tab.label}
					</button>
				))}
			</div>
		</div>
	);
}
