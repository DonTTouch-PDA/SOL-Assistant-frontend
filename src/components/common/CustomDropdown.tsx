import React from 'react';
import { ChevronDown } from 'lucide-react';

interface customDropdownProps<T = string> {
	options: string[];
	setSortedBy: T;
	isOpen: boolean;
	onToggle: () => void;
	fetchSortedBy: (value: T) => void;
}

export default function CustomDropdown<T = string>({
	options,
	setSortedBy,
	isOpen,
	onToggle,
	fetchSortedBy,
}: customDropdownProps<T>) {
	return (
		<div className="relative">
			<button
				className="flex flex-row px-[10px] py-[4.5px] gap-2 text-sm rounded-[8px] bg-[#F7F7F7] text-[#111111]"
				onClick={onToggle}
			>
				<span className="font-medium text-[12px] ">{String(setSortedBy)}</span>
				<span
					className={`flex items-center font-semibold transform ${isOpen ? 'rotate-180' : ''}`}
				>
					<ChevronDown size={14} />
				</span>
			</button>
			{isOpen && (
				<div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-[8px] shadow-lg z-10 min-w-[80px]">
					{options.map((option) => (
						<button
							key={option}
							className="w-full text-left p-2 text-[12px] hover:bg-gray-50 first:rounded-t-[8px] last:rounded-b-[8px]"
							onClick={() => fetchSortedBy(option as T)}
						>
							{option}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
