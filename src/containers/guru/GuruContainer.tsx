'use client';
import { useState } from 'react';
import GuruViewContainer from './GuruViewContainer';
import GuruTradeContainer from './GuruTradeContainer';
import UnderLinedTab from '@/components/layout/UnderLinedTab';
import { useAuth } from '@/hooks/useAuth';
import { GuruType } from '@/types/guru';

const tabList = [
	{ id: '거래 순', label: '고수의 거래종목' },
	{ id: '조회 순', label: '고수의 조회종목' },
];
//
export default function GuruContainer() {
	const [activeTab, setActiveTab] = useState<string>('거래 순');
	const { userData } = useAuth();

	const handleTabChange = (tab: string) => {
		setActiveTab(tab);
	};

	return (
		<div className="w-full mt-[26px]">
			<UnderLinedTab
				tabList={tabList}
				currentTab={activeTab}
				onClick={handleTabChange}
			/>

			<div className="transition-all duration-300 ease-in-out">
				{activeTab === '거래 순' ? (
					<GuruTradeContainer
						guruFilter={userData?.investmentType as GuruType}
					/>
				) : (
					<GuruViewContainer
						guruFilter={userData?.investmentType as GuruType}
					/>
				)}
			</div>
		</div>
	);
}
