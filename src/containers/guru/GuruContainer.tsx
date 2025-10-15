'use client';
import { useState } from 'react';
import GuruViewContainer from './GuruViewContainer';
import GuruTradeContainer from './GuruTradeContainer';

//
export default function GuruContainer() {
	const [activeTab, setActiveTab] = useState<string>('거래 순');

	const handleTabChange = (tab: string) => {
		setActiveTab(tab);
	};

	return (
		<div className="w-full mt-[26px]">
			<div className="flex border-b mb-[16px] border-gray-200 relative">
				<button
					onClick={() => handleTabChange('거래 순')}
					className={`flex-1 pb-1 text-center transition-colors duration-300 ${
						activeTab === '거래 순' ? 'text-black' : 'text-gray-500'
					}`}
				>
					고수의 거래종목
				</button>
				<button
					onClick={() => handleTabChange('조회 순')}
					className={`flex-1 pb-1 text-center transition-colors duration-300 ${
						activeTab === '조회 순' ? 'text-black' : 'text-gray-500'
					}`}
				>
					고수의 조회종목
				</button>

				<div
					className={`absolute bottom-0 h-0.5 bg-black transition-all duration-300 ease-in-out ${
						activeTab === '거래 순' ? 'left-0 w-1/2' : 'left-1/2 w-1/2'
					}`}
				/>
			</div>

			<div className="transition-all duration-300 ease-in-out">
				{activeTab === '거래 순' ? (
					<GuruTradeContainer />
				) : (
					<GuruViewContainer />
				)}
			</div>
		</div>
	);
}
