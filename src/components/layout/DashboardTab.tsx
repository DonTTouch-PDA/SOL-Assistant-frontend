'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const tabs = [
	{ id: '', label: 'For Me' },
	{ id: 'guru', label: '고수의 Pick' },
	{ id: 'sector-news', label: '섹터 뉴스' },
	{ id: 'similar-chart', label: '유사 차트' },
	{ id: 'reports', label: '리포트' },
	{ id: 'my-stock', label: '보유 종목' },
];

export default function DashboardTab() {
	const [activeTab, setActiveTab] = useState('');
	const [isDragging, setIsDragging] = useState(false);
	const [hasDragged, setHasDragged] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const currentPath = pathname.replace('/dashboard/', '');
		const topLevelPath = currentPath.split('/')[0];
		setActiveTab(topLevelPath);
	}, [pathname]);

	const handleMouseDown = (e: React.MouseEvent) => {
		if (!scrollContainerRef.current) return;
		setIsDragging(true);
		setHasDragged(false);
		setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
		setScrollLeft(scrollContainerRef.current.scrollLeft);
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging || !scrollContainerRef.current) return;
		e.preventDefault();
		const x = e.pageX - scrollContainerRef.current.offsetLeft;
		const walk = (x - startX) * 2;
		scrollContainerRef.current.scrollLeft = scrollLeft - walk;

		// 드래그 거리가 5px 이상이면 실제 드래그로 간주
		if (Math.abs(x - startX) > 5) {
			setHasDragged(true);
		}
	};

	const handleMouseUp = () => {
		setIsDragging(false);
		// 드래그가 끝난 후 잠시 후에 hasDragged 리셋
		setTimeout(() => setHasDragged(false), 100);
	};

	const handleMouseLeave = () => {
		setIsDragging(false);
		setTimeout(() => setHasDragged(false), 100);
	};

	const handleTouchStart = (e: React.TouchEvent) => {
		if (!scrollContainerRef.current) return;
		setIsDragging(true);
		setHasDragged(false);
		setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
		setScrollLeft(scrollContainerRef.current.scrollLeft);
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (!isDragging || !scrollContainerRef.current) return;
		const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
		const walk = (x - startX) * 2;
		scrollContainerRef.current.scrollLeft = scrollLeft - walk;

		// 드래그 거리가 5px 이상이면 실제 드래그로 간주
		if (Math.abs(x - startX) > 5) {
			setHasDragged(true);
		}
	};

	const handleTouchEnd = () => {
		setIsDragging(false);
		setTimeout(() => setHasDragged(false), 100);
	};

	return (
		<div className="w-full bg-white">
			<div
				ref={scrollContainerRef}
				className="flex overflow-x-auto scrollbar-hide"
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseLeave}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				style={{
					userSelect: 'none',
					cursor: isDragging ? 'grabbing' : 'grab',
				}}
			>
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => {
							if (!isDragging && !hasDragged) {
								setActiveTab(tab.id);
								router.push(`/dashboard/${tab.id}`);
							}
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
