import React from 'react';
import { X } from 'lucide-react';
// import { GURU_MORE_INFO_DESCRIPTION } from '@/constants/descriptions';

interface GuruMoreInfoCardProps {
	onClose: () => void;
}

export default function GuruMoreInfoCard({ onClose }: GuruMoreInfoCardProps) {
	return (
		<div className="bg-white rounded-lg shadow-lg p-4 max-w-xs border border-gray-200">
			<div className="flex justify-between items-start">
				<div className="flex-1">
					{/*<p className="text-sm text-gray-700 leading-relaxed">*/}
					{/*	{GURU_MORE_INFO_DESCRIPTION}*/}
					{/*</p>*/}
				</div>
				<button onClick={onClose} className="ml-2 flex-shrink-0">
					<X size={16} />
				</button>
			</div>
		</div>
	);
}
