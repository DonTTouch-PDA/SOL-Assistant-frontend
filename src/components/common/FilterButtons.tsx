import React from 'react';

export interface FilterOption<T = string> {
	value: T;
	label: string;
}

interface FilterButtonsProps<T = string> {
	activeFilter: T;
	onFilterChange: (filter: T) => void;
	options: FilterOption<T>[];
	className?: string;
}

export default function FilterButtons<T = string>({
	activeFilter,
	onFilterChange,
	options,
	className = '',
}: FilterButtonsProps<T>) {
	return (
		<div className={`flex gap-2 ${className}`}>
			{options.map((option) => (
				<button
					key={String(option.value)}
					onClick={() => {
						onFilterChange(option.value);
					}}
					className={`rounded-[10px] px-4 py-[6px] text-sm font-medium ${
						activeFilter === option.value
							? 'bg-blue-700 text-white'
							: 'bg-transparent text-gray-500'
					}`}
				>
					{option.label}
				</button>
			))}
		</div>
	);
}
