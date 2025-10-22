// src/components/layout/Footer.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
	getStockCodeFromLocalStorage,
	setStockCodeToLocalStorage,
} from '@/utils/stockCodeStorage';

export default function Footer() {
	const [recentStockCode, setRecentStockCode] = useState<string>('');
	const [showGradient, setShowGradient] = useState(true);
	const pathname = usePathname();

	useEffect(() => {
		// 현재 URL에서 종목 코드 가져오기
		const currentStockCode = pathname.split('/')[1];

		// 유효한 종목 코드인지 확인하는 함수
		const isValidStockCode = async (stockCode: string): Promise<boolean> => {
			try {
				const response = await fetch('/stocks.json');
				const stocks = await response.json();
				return stocks.some(
					(stock: { symbol: string }) => stock.symbol === stockCode
				);
			} catch (error) {
				console.error('종목 코드 검증 실패:', error);
				return false;
			}
		};

		const handleStockCode = async () => {
			if (
				currentStockCode &&
				currentStockCode !== 'dashboard' &&
				currentStockCode !== 'menu'
			) {
				const isValid = await isValidStockCode(currentStockCode);
				if (isValid) {
					setRecentStockCode(currentStockCode);
					setStockCodeToLocalStorage(currentStockCode);
				} else {
					const stockCode = getStockCodeFromLocalStorage();
					if (stockCode) setRecentStockCode(stockCode);
				}
			} else {
				const stockCode = getStockCodeFromLocalStorage();
				if (stockCode) setRecentStockCode(stockCode);
			}
		};

		handleStockCode();

		// pathname 기준으로 currentTab 설정
		if (pathname.startsWith('/dashboard')) {
			setCurrentTab('홈');
		} else if (/^\/\d{6}(\/)?$/.test(pathname)) {
			setCurrentTab('현재가');
		} else if (/^\/\d{6}\/order/.test(pathname)) {
			setCurrentTab('주문');
		} else if (/^\/\d{6}\/guru/.test(pathname)) {
			setCurrentTab('');
		}
	}, [pathname]);

	// 스크롤 위치 감지하여 그라데이션 제어
	useEffect(() => {
		const checkScrollPosition = () => {
			const scrollTop =
				window.pageYOffset || document.documentElement.scrollTop;
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;

			// 페이지 끝에서 100px 이내에 있으면 그라데이션 숨김
			const isNearBottom = scrollTop + windowHeight >= documentHeight - 100;
			setShowGradient(!isNearBottom);
		};

		// 초기 로드 시 체크
		checkScrollPosition();

		// 스크롤 이벤트 리스너
		window.addEventListener('scroll', checkScrollPosition);

		// 리사이즈 이벤트도 추가 (화면 크기 변경 시)
		window.addEventListener('resize', checkScrollPosition);

		return () => {
			window.removeEventListener('scroll', checkScrollPosition);
			window.removeEventListener('resize', checkScrollPosition);
		};
	}, []);

	const tabs = [
		{ href: '/dashboard', label: '홈' },
		{
			href: `/${recentStockCode ? recentStockCode : '005930'}`,
			label: '현재가',
		},
		{
			href: `/${recentStockCode ? recentStockCode : '005930'}/order`,
			label: '주문',
		},
	];

	const [currentTab, setCurrentTab] = useState('홈');

	return (
		<>
			{/* 그라데이션 오버레이 */}
			{showGradient && (
				<div className="fixed bottom-[58px] w-full h-8 max-w-[430px] left-1/2 transform -translate-x-1/2 z-40 bg-gradient-to-t from-black/10 to-transparent pointer-events-none transition-opacity duration-300" />
			)}

			<nav className="fixed bottom-0 border-t border-gray-200 bg-white w-full h-[58px] max-w-[430px] left-1/2 transform -translate-x-1/2 z-50">
				<div className="flex justify-between items-center">
					<ul className="flex px-8 gap-10 pb-2">
						{tabs.map((tab) => (
							<li key={tab.href}>
								<Link
									href={tab.href}
									className={`${currentTab === tab.label ? 'text-[#293FEB] font-semibold' : 'text-gray-500'} font-medium text-sm`}
									onClick={() => {
										setCurrentTab(tab.label);
									}}
								>
									{tab.label}
								</Link>
							</li>
						))}
					</ul>
					<Link href="/menu">
						<Image src="/menu.jpg" alt="메뉴" height={58} width={58} />
					</Link>
				</div>
			</nav>
		</>

	);
}
