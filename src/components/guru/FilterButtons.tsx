import React from 'react';
import FilterButtons, { FilterOption } from '@/components/common/FilterButtons';
import { FilterType } from '@/types/guru';

interface GuruFilterButtonsProps {
	activeFilter: FilterType;
	onFilterChange: (filter: FilterType) => void;
}

const filterOptions: FilterOption<FilterType>[] = [
	{ value: 'BUY', label: '많이 산' },
	{ value: 'SELL', label: '많이 판' },
];

export default function GuruFilterButtons({
	activeFilter,
	onFilterChange,
}: GuruFilterButtonsProps) {
	return (
		<FilterButtons<FilterType>
			activeFilter={activeFilter}
			onFilterChange={onFilterChange}
			options={filterOptions}
		/>
	);
}
