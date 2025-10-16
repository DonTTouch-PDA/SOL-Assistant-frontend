'use client';
import { useState, useEffect, useRef } from 'react';

export default function UnderLinedTab({
	tabList,
	onClick,
	currentTab,
}: {
	tabList: { id: string; label: string }[];
	onClick: (tab: string) => void;
	currentTab: string;
}) {
	const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
	const tabRefs = useRef<Record<string, HTMLParagraphElement | null>>({});
	useEffect(() => {
		const el =
			tabRefs.current[currentTab] ||
			Object.values(tabRefs.current).find((e) => e?.textContent === currentTab);
		if (el) {
			setUnderlineStyle({
				left: el.offsetLeft,
				width: el.offsetWidth,
			});
		}
	}, [currentTab]);

	return (
		<>
			<div className="pb-4">
				<div className="relative flex border-b border-gray-200 pb-2 -mx-5">
					{/* 탭 */}
					{tabList.map((tab) => (
						<p
							key={tab.id}
							ref={(el) => {
								tabRefs.current[tab.id] = el;
							}}
							onClick={() => onClick(tab.id)}
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
							left: underlineStyle.left + 12,
							width: underlineStyle.width - 16,
						}}
					/>
				</div>
			</div>
		</>
	);
}
