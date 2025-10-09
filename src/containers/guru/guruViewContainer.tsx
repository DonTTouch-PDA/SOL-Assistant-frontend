'use client';
import { useState, useEffect } from 'react';
import GuruViewingTab from '@/components/guru/GuruViewingTab';
import { fetchGetGuruByViewing } from '@/services/guruServices';
import { GuruType, GuruView, UserFilterType } from '@/types/guru';

export default function GuruViewContainer() {
	const [guruType, setGuruType] = useState('단기 고수');
	const [isOpenViewing, setIsOpenViewing] = useState(false);
	const [userFilter, setUserFilter] = useState<UserFilterType>('guru');
	const [viewingStocks, setViewingStocks] = useState<GuruView[]>([]);

	useEffect(() => {
		getGuruViewingList();
	}, []);

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

	return (
		<GuruViewingTab
			guruType={guruType}
			onGuruTypeChange={handleGuruTypeChange}
			isOpen={isOpenViewing}
			onToggle={handleToggleViewing}
			userFilter={userFilter}
			onUserFilterChange={handleUserFilterChange}
			viewingStocks={viewingStocks}
		/>
	);
}
