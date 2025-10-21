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
	const [viewingStocks, setViewingStocks] = useState<GuruTrade[]>([]);
	const [isOpenMoreInfo, setIsOpenMoreInfo] = useState(false);
	const [viewingStocks2, setViewingStocks2] = useState<GuruTrade[]>([]);
	const popoverRef = useRef<HTMLDivElement>(null);

	const getGuruViewingList = useCallback(async () => {
		if (userFilter === '고수') {
			const data = await fetchGetGuruByViewing(guruType);
			setViewingStocks(data.stockVolumeList.slice(0, 10));
			setViewingStocks2(data.stockVolumeList.slice(10, 15));
		} else {
			const data = await fetchGetMyByViewing();
			setViewingStocks(data.stockVolumeList);
			const data2 = await fetchGetGuruByViewing(guruType);

			// data에 있는 종목들을 data2에서 제거
			const dataStockCodes = data.stockVolumeList.map(
				(stock) => stock.stockSymbol
			);
			const filteredData2 = data2.stockVolumeList.filter(
				(stock) => !dataStockCodes.includes(stock.stockSymbol)
			);

			setViewingStocks2(filteredData2.slice(0, 5));
		}
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
			viewingStocks={viewingStocks}
			viewingStocks2={viewingStocks2}
			isOpenMoreInfo={isOpenMoreInfo}
			onMoreInfo={handleMoreInfo}
			popoverRef={popoverRef}
		/>
	);
}
