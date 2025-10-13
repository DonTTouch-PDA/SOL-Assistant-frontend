import React from 'react';
import { FilterType } from '@/types/guru';

interface FilterButtonsProps {
	activeFilter: FilterType;
	onFilterChange: (filter: FilterType) => void;
}

export default function FilterButtons({
	activeFilter,
	onFilterChange,
}: FilterButtonsProps) {
	return (
		<div className="flex gap-2">
			<button
				onClick={() => onFilterChange('most_bought')}
				className={`rounded-[10px] px-4 py-[3px] ${
					activeFilter === 'most_bought'
						? 'bg-blue-700 text-white'
						: 'bg-transparent text-gray-500'
				}`}
			>
				많이 산
			</button>
			<button
				onClick={() => onFilterChange('most_sold')}
				className={`rounded-[10px] px-4 py-[3px] ${
					activeFilter === 'most_sold'
						? 'bg-blue-700 text-white'
						: 'bg-transparent text-gray-500'
				}`}
			>
				많이 판
			</button>
		</div>
	);
}
