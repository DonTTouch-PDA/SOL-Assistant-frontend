import React from 'react';
import { UserFilterType } from '@/types/guru';

interface UserFilterButtonsProps {
	activeFilter: UserFilterType;
	onFilterChange: (filter: UserFilterType) => void;
}

export default function UserFilterButtons({
	activeFilter,
	onFilterChange,
}: UserFilterButtonsProps) {
	return (
		<div className="flex gap-2">
			<button
				onClick={() => onFilterChange('guru')}
				className={`rounded-[10px] px-4 py-[6px] text-sm font-medium ${
					activeFilter === 'guru'
						? 'bg-blue-700 text-white'
						: 'bg-transparent text-gray-500'
				}`}
			>
				고수
			</button>
			<button
				onClick={() => onFilterChange('me')}
				className={`rounded-[10px] px-4 py-[6px] text-sm font-medium ${
					activeFilter === 'me'
						? 'bg-blue-700 text-white'
						: 'bg-transparent text-gray-500'
				}`}
			>
				나
			</button>
		</div>
	);
}
