'use client';
import { useState } from 'react';
import { Bell, Search } from 'lucide-react';

export default function Header() {
	const [isDashboard, setIsDashboard] = useState(true);
	const focusColor = ['text-black', 'text-gray-400'];
	return (
		<header className="fixed top-0 left-1/2 transform -translate-x-1/2 flex justify-between items-center pt-5 px-6 w-full max-w-[430px] min-w-[375px] bg-white z-10">
			<div className="flex gap-6">
				<button
					className={`font-bold text-xl ${isDashboard ? focusColor[0] : focusColor[1]}`}
					onClick={() => setIsDashboard(true)}
				>
					대시보드
				</button>
				<button
					className={`font-bold text-xl ${isDashboard ? focusColor[1] : focusColor[0]}`}
					onClick={() => setIsDashboard(false)}
				>
					차트
				</button>
			</div>

			<Search
				className="w-24px h-24px"
				onClick={() => {
					console.log('search');
				}}
			/>
		</header>
	);
}
