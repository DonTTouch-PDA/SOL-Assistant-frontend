'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import GuruViewingTab from '@/components/guru/GuruViewingTab';
import {
	fetchGetGuruByViewing,
	fetchGetMyByViewing,
} from '@/services/guruServices';
import { GuruType, GuruTrade, UserFilterType } from '@/types/guru';

//
export default function GuruViewContainer() {
	const [guruType, setGuruType] = useState<GuruType>('DAY');
	const [isOpenViewing, setIsOpenViewing] = useState(false);
	const [userFilter, setUserFilter] = useState<UserFilterType>('고수');
	const [isOpenMoreInfo, setIsOpenMoreInfo] = useState(false);
	const [myStocks, setMyStocks] = useState<GuruTrade[]>([]);
	const [gosuStocks, setGosuStocks] = useState<GuruTrade[]>([]);
	const [recommendStocks, setRecommendStocks] = useState<GuruTrade[]>([]);
	const popoverRef = useRef<HTMLDivElement>(null);

	const getGuruViewingList = useCallback(async () => {
		// 한 번에 fetch하기
		const [myData, gosuData] = await Promise.all([
			fetchGetMyByViewing(),
			fetchGetGuruByViewing(guruType),
		]);

		const myStocksData = myData.stockVolumeList;
		const gosuStocksData = gosuData.stockVolumeList;

		setMyStocks(myStocksData);
		setGosuStocks(gosuStocksData);

		// myStocks에 없는 종목만 recommendStocks에 추가
		const filteredStocks = gosuStocksData.filter(
			(stock) =>
				!myStocksData.some(
					(myStock) => myStock.stockSymbol === stock.stockSymbol
				)
		);
		setRecommendStocks(filteredStocks.slice(0, 5));
	}, [guruType, userFilter]);

	useEffect(() => {
		getGuruViewingList();
	}, [getGuruViewingList]);

	// 외부 클릭 시 팝오버 닫기
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				popoverRef.current &&
				!popoverRef.current.contains(event.target as Node)
			) {
				if (isOpenMoreInfo) {
					setIsOpenMoreInfo(false);
				}
			}
		};
		if (isOpenMoreInfo) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpenMoreInfo]);

	// 고수 타입이 바뀌면 새롭게 조회
	const handleGuruTypeChange = (value: GuruType) => {
		setGuruType(value);
		setIsOpenViewing(false);
	};

	const handleToggleViewing = () => {
		setIsOpenViewing(!isOpenViewing);
	};

	const handleUserFilterChange = (filter: UserFilterType) => {
		setUserFilter(filter);
	};

	const handleMoreInfo = () => {
		setIsOpenMoreInfo(!isOpenMoreInfo);
	};

	return (
		<GuruViewingTab
			guruType={guruType}
			onGuruTypeChange={handleGuruTypeChange}
			isOpen={isOpenViewing}
			onToggle={handleToggleViewing}
			userFilter={userFilter}
			onUserFilterChange={handleUserFilterChange}
			viewingStocks={userFilter === '고수' ? gosuStocks : myStocks}
			viewingStocks2={userFilter === '고수' ? gosuStocks : recommendStocks}
			isOpenMoreInfo={isOpenMoreInfo}
			onMoreInfo={handleMoreInfo}
			popoverRef={popoverRef}
		/>
	);
}
