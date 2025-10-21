'use client';
import { Search, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CustomPopOver from '@/components/common/customPopover';
export default function Menu() {
	const [currentTab, setCurrentTab] = useState('dashboard');
	const tabs = [
		{ id: 'dashboard', label: '대시보드' },
		{ id: 'chart', label: '차트' },
	];
	const menus: Record<string, Array<{ id: string; label: string }>> = {
		dashboard: [
			{ id: '', label: '내 종목 요약' },
			{ id: 'guru', label: '고수의 Pick' },
			{ id: 'sector-news', label: '섹터 뉴스' },
			{ id: 'similar-chart', label: '차트 분석' },
			{ id: 'reports', label: '리포트' },
			{ id: 'my-stock', label: '보유종목' },
		],
		chart: [
			{ id: '', label: '실시간 차트' },
			{ id: 'orderbook', label: '호가' },
			{ id: 'order', label: '주문' },
			{ id: 'guru', label: '고수의 거래량' },
		],
	};
	const shinhanTabs = ['국내/해외주식', 'ETF/ETN', '종목찾기'];
	const shinhanMenus = {
		'국내/해외주식': [
			'주식종목검색',
			'관심',
			'현재가',
			'차트',
			'주문',
			'잔고',
			'물타기 계산기',
			'매매다이어리',
		],

		'ETF/ETN': [],

		종목찾기: [],
	};

	const [assistMode, setAssistMode] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const savedMode = localStorage.getItem('assistMode');
		if (savedMode !== null) {
			setAssistMode(savedMode === 'true');
		}
		setMounted(true);
	}, []);

	useEffect(() => {
		localStorage.setItem('assistMode', assistMode.toString());
	}, [assistMode]);

	const router = useRouter();

	const buttonRef = useRef<HTMLDivElement>(null);
	const [showPopover, setShowPopover] = useState(false);

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			const target = e.target as Node;
			if (
				!assistMode &&
				buttonRef.current &&
				!buttonRef.current.contains(target)
			) {
				setShowPopover(true);
				setTimeout(() => setShowPopover(false), 1000);
			}
		};

		document.addEventListener('click', handleClick);
		return () => document.removeEventListener('click', handleClick);
	}, [assistMode]);

	const [recentStockCode, setRecentStockCode] = useState('');
	useEffect(() => {
		const storedCode = localStorage.getItem('recent_stock_code');
		if (storedCode) {
			setRecentStockCode(storedCode);
		} else {
			setRecentStockCode('005930');
		}
	}, []);

	return (
		<div>
			<header className="fixed pt-5 top-0 left-1/2 transform -translate-x-1/2 flex justify-between items-center  px-6 pb-[16px] w-full max-w-[430px] min-w-[375px] bg-white z-10">
				<div
					className="flex gap-6 underline font-semibold"
					onClick={() => {
						console.log('logout');
					}}
				>
					로그아웃
				</div>
				<div className="flex gap-3">
					<Search
						onClick={() => {
							if (assistMode) {
								router.push('/search');
							}
						}}
					/>

					<X
						onClick={() => {
							if (assistMode) {
								router.back();
							}
						}}
					/>
				</div>
			</header>

			<div className="pt-[50px]">
				{/* 상단바 주식/파생*/}
				<div className="relative flex border-b border-gray-200 pb-2 -mx-4">
					<p className="text-[#0046FF] font-semibold pl-2 ml-3">주식/파생</p>
					<div className="absolute bottom-0 h-0.5 bg-[#0046FF] ml-3 transition-all duration-300 ease-in-out left-0 w-20" />
				</div>

				<div className="flex -mx-6">
					{/* 왼쪽탭 */}
					<section className="relative bg-[#F2F4F8] w-1/3 h-screen font-medium flex flex-col">
						{mounted && (
							<div>
								{assistMode ? (
									<div>
										{tabs.map((tab) => (
											<button
												key={tab.id}
												onClick={() => {
													setCurrentTab(tab.id);
												}}
												className={`${currentTab == tab.id ? 'bg-white font-semibold' : 'text-[#333950]'} w-full py-3 px-6 text-left`}
											>
												{tab.label}
											</button>
										))}
									</div>
								) : (
									<div>
										{shinhanTabs.map((tab) => (
											<button
												key={tab}
												className={`${tab == '국내/해외주식' ? 'bg-white font-semibold' : 'text-[#333950]'} w-full py-3 px-6 text-left`}
											>
												{tab}
											</button>
										))}
									</div>
								)}

								{/* 어시스트모드 토글 */}
								<div
									className="fixed left-[calc((100%-430px)/2)] bottom-3 px-6 bg-[#F2F4F8] pt-2"
									ref={buttonRef}
								>
									<div className="absolute bottom-full mb-2 left-[60%] -translate-x-1/2">
										<CustomPopOver
											text="어시스트 모드를 켜 보세요!"
											isShowPopover={showPopover}
										/>
									</div>
									<p className="text-sm">어시스트 모드</p>
									<div
										className="flex items-center justify-between rounded-lg py-2 cursor-pointer"
										onClick={() => {
											setAssistMode((prev) => !prev);
										}}
									>
										<div
											className={`w-10 h-5 rounded-full p-[2px] transition-colors duration-300 ${
												assistMode ? 'bg-[#0046FF]' : 'bg-gray-300'
											}`}
										>
											<div
												className={`h-4 w-4 bg-white rounded-full shadow transform transition-transform duration-300 ${
													assistMode ? 'translate-x-5' : 'translate-x-0'
												}`}
											/>
										</div>
									</div>
								</div>
							</div>
						)}
					</section>
					<section className="w-2/3 p-3">
						{mounted && (
							<div>
								{assistMode ? (
									<div>
										<h1 className="p-2 font-semibold">
											{tabs.find((tab) => tab.id === currentTab)?.label}
										</h1>
										<div className="w-full border-[0.5px] border-[#EEEEEE]" />
										<div className="flex flex-col pt-1">
											{menus[currentTab]?.map((menu) => (
												<button
													key={menu.id}
													className="text-left p-2 text-[#333950] text-lg"
													onClick={() => {
														router.push(
															`${currentTab === 'dashboard' ? 'dashboard' : recentStockCode}/${menu.id}`
														);
													}}
												>
													{menu.label}
												</button>
											))}
										</div>
									</div>
								) : (
									<div>
										<h1 className="p-2 font-semibold">국내/해외주식</h1>
										<div className="w-full border-[0.5px] border-[#EEEEEE]" />
										<div className="flex flex-col pt-1">
											{shinhanMenus['국내/해외주식'].map((menu) => (
												<button
													key={menu}
													className="text-left p-2 text-[#333950] text-lg"
												>
													{menu}
												</button>
											))}
										</div>
									</div>
								)}
							</div>
						)}
					</section>
				</div>
			</div>
		</div>
	);
}
