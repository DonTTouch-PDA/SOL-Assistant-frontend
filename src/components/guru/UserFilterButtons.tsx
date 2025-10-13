import React from 'react';
import FilterButtons, { FilterOption } from '@/components/common/FilterButtons';
import { UserFilterType } from '@/types/guru';

interface UserFilterButtonsProps {
	activeFilter: UserFilterType;
	onFilterChange: (filter: UserFilterType) => void;
}

const userFilterOptions: FilterOption<UserFilterType>[] = [
	{ value: '고수', label: '고수' },
	{ value: '나', label: '나' },
];

export default function UserFilterButtons({
	activeFilter,
	onFilterChange,
}: UserFilterButtonsProps) {
	return (
		<FilterButtons<UserFilterType>
			activeFilter={activeFilter}
			onFilterChange={onFilterChange}
			options={userFilterOptions}
		/>
	);
}
