import React from 'react';

interface ProfitRateProps {
	profitRate: number;
}

export default function ProfitRate({ profitRate }: ProfitRateProps) {
	return (
		<div
			className={`flex px-1 justify-center rounded-[4px]  ${profitRate >= 0 ? 'text-red-500 bg-red-100' : 'text-blue-500 bg-blue-100'}`}
		>
			{profitRate > 0 ? '+' : ''}
			{profitRate}%
		</div>
	);
}
