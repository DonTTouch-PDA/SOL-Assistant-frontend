'use client';
import CustomDropdown from '@/components/common/CustomDropdown';
import { useState, useEffect } from 'react';
import { fetchGetMyStocks } from '@/services/myStocksServices';
import { MyStock } from '@/types/myStock';
import StockItem from '@/components/myStocks/StockItem';
import StockItemSkeleton from '@/components/myStocks/StockItemSkeleton';

export default function MyStocksContainer() {
	const [sortedBy, setSortedBy] = useState('등록 순');
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [stocks, setStocks] = useState<MyStock[]>([]);

	const fetchData = async (sortBy: string) => {
		setIsLoading(true);
		try {
			const data = await fetchGetMyStocks();
			setStocks(data);
		} catch (error) {
			console.error('fetch 실패:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSortedBy = (value: string) => {
		setSortedBy(value);
		setIsOpen(false);
		fetchData(value);
	};

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		fetchData(sortedBy);
	}, []);

	return (
		<div className="pt-6 w-full ">
			<CustomDropdown
				options={['등록 순', '현재가 순']}
				setSortedBy={sortedBy}
				isOpen={isOpen}
				onToggle={handleToggle}
				fetchSortedBy={handleSortedBy}
			/>
			<div className="border-b border-gray-200 mt-[12px]"></div>
			{isLoading ? (
				<div>
					{Array.from({ length: 3 }).map((_, index) => (
						<StockItemSkeleton key={index} />
					))}
				</div>
			) : stocks ? (
				<div>
					{stocks.map((stock, idx) => (
						<StockItem key={idx} stock={stock} />
					))}
				</div>
			) : (
				<div>종목이 없습니다.</div>
			)}
		</div>
	);
}
