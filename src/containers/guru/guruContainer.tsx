'use client';
import { useState } from 'react';
import GuruViewContainer from './guruViewContainer';
import GuruTradeContainer from './guruTradeContainer';

export default function GuruContainer() {
	const [activeTab, setActiveTab] = useState<string>('trading');

	const handleTabChange = (tab: string) => {
		setActiveTab(tab);
	};

	return (
		<div className="w-full mt-[26px]">
			<div className="flex border-b mb-[16px] border-gray-200 relative">
				<button
					onClick={() => handleTabChange('trading')}
					className={`flex-1 pb-1 text-center transition-colors duration-300 ${
						activeTab === 'trading' ? 'text-black' : 'text-gray-500'
					}`}
				>
					고수의 거래종목
				</button>
				<button
					onClick={() => handleTabChange('viewing')}
					className={`flex-1 pb-1 text-center transition-colors duration-300 ${
						activeTab === 'viewing' ? 'text-black' : 'text-gray-500'
					}`}
				>
					고수의 조회종목
				</button>

				<div
					className={`absolute bottom-0 h-0.5 bg-black transition-all duration-300 ease-in-out ${
						activeTab === 'trading' ? 'left-0 w-1/2' : 'left-1/2 w-1/2'
					}`}
				/>
			</div>

			<div className="transition-all duration-300 ease-in-out">
				{activeTab === 'trading' ? (
					<GuruTradeContainer />
				) : (
					<GuruViewContainer />
				)}
			</div>
		</div>
	);
}
