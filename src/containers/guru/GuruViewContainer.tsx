'use client';
import { useState, useEffect, useRef } from 'react';
import GuruViewingTab from '@/components/guru/GuruViewingTab';
import { fetchGetGuruByViewing } from '@/services/guruServices';
import { GuruType, GuruView, UserFilterType } from '@/types/guru';

//
export default function GuruViewContainer() {
	const [guruType, setGuruType] = useState('단기 고수');
	const [isOpenViewing, setIsOpenViewing] = useState(false);
	const [userFilter, setUserFilter] = useState<UserFilterType>('고수');
	const [viewingStocks, setViewingStocks] = useState<GuruView[]>([]);
	const [isOpenMoreInfo, setIsOpenMoreInfo] = useState(false);
	const popoverRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		getGuruViewingList();
	}, []);

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

	const handleGuruTypeChange = (value: string) => {
		setGuruType(value);
		setIsOpenViewing(false);
		getGuruViewingList();
	};

	const handleToggleViewing = () => {
		setIsOpenViewing(!isOpenViewing);
	};

	const handleUserFilterChange = (filter: UserFilterType) => {
		setUserFilter(filter);
		getGuruViewingList();
	};

	const getGuruViewingList = async () => {
		const data = await fetchGetGuruByViewing(userFilter, guruType as GuruType);
		setViewingStocks(data.stocks);
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
			isOpenMoreInfo={isOpenMoreInfo}
			onMoreInfo={handleMoreInfo}
			popoverRef={popoverRef}
		/>
	);
}
