'use client';
import GuruRetentionChart from '@/components/chart/GuruRetentionChart';
import GuruTradeChart from '@/components/chart/GuruTradeChart';
import CustomDropdown from '@/components/common/CustomDropdown';
import { useState, useEffect } from 'react';
import { fetchGuruTradeData } from '@/services/chartServices';
import { GuruStockData } from '@/types/chart';
import { useParams } from 'next/navigation';
const sampleData = [
	{ time: '2025-10-10', buyVolume: 2400, sellVolume: 1800, value: 20 },
	{ time: '2025-10-11', buyVolume: 2000, sellVolume: 2600, value: 22 },
	{ time: '2025-10-12', buyVolume: 2800, sellVolume: 2100, value: 25 },
	{ time: '2025-10-13', buyVolume: 3100, sellVolume: 1500, value: 18 },
];

export default function GuruTrade() {
	const [guruType, setGuruType] = useState('단기 고수');
	const [isOpenTrading, setIsOpenTrading] = useState(false);
	const [data, setData] = useState<GuruStockData[]>([]);
	const { blob } = useParams<{ blob: string }>();
	const stockCode = blob;
	const handleGuruTypeChange = (value: string) => {
		setGuruType(value);
		setIsOpenTrading(false);
	};
	const handleToggleTrading = () => {
		setIsOpenTrading(!isOpenTrading);
	};

	useEffect(() => {
		console.log(stockCode, guruType);
		fetchGuruTradeData(stockCode, guruType).then((res) => setData(res));
	}, [guruType, stockCode]);

	return (
		<div>
			<div className="pt-2">
				<CustomDropdown
					options={['단기 고수', '중기 고수', '장기 고수']}
					setSortedBy={guruType}
					isOpen={isOpenTrading}
					onToggle={handleToggleTrading}
					fetchSortedBy={handleGuruTypeChange}
				/>
				<div className="w-[100%] border-[0.5px] border-[#EEEEEE] my-2" />
			</div>

			<h1 className="text-lg font-semibold">고수의 매매량</h1>
			<div className="flex justify-center -mx-5">
				<GuruTradeChart data={data} height={250} />
			</div>

			<h1 className="text-lg font-semibold">고수의 보유율</h1>
			<div className="flex justify-center -mx-5">
				<GuruRetentionChart data={data} height={250} />
			</div>
		</div>
	);
}
