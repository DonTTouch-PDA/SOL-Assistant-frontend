'use client';
import CustomDropdown from '@/components/common/customDropdown';
import { useState, useEffect } from 'react';
import { fetchGetStocksSortedBy } from '@/services/myStocksServices';
import { MyStock } from '@/types/myStock';
import StockItem from '@/components/myStocks/stockItem';
import StockItemSkeleton from '@/components/myStocks/StockItemSkeleton';

export default function MyStocksContainer() {
	const [sortedBy, setSortedBy] = useState('등록 순');
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [stocks, setStocks] = useState<MyStock[]>([]);

	const fetchData = async (sortBy: string) => {
		setIsLoading(true);
		try {
			const data = await fetchGetStocksSortedBy(sortBy);
			setStocks(data as MyStock[]);
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
			{isLoading ? (
				<div>
					{Array.from({ length: 3 }).map((_, index) => (
						<StockItemSkeleton key={index} />
					))}
				</div>
			) : (
				<div>
					{stocks.map((stock) => (
						<StockItem key={stock.id} stock={stock} />
					))}
				</div>
			)}
		</div>
	);
}
