import React from 'react';

export default function StockItemSkeleton() {
	return (
		<div className="bg-white border-b pt-[12px] pb-[12px] border-gray-100">
			{/* 상단 행 */}
			<div className="flex items-center justify-between mb-2 h-[48px]">
				<div className="flex items-center gap-3">
					{/* 종목 아이콘 */}
					<div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>

					{/* 종목 정보 */}
					<div className="h-[48px] flex flex-col justify-center">
						<div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-1"></div>
						<div className="flex gap-1">
							<div className="h-3 w-8 bg-gray-200 rounded animate-pulse"></div>
							<div className="h-3 w-6 bg-gray-200 rounded animate-pulse"></div>
						</div>
					</div>
				</div>

				{/* 가격 정보 */}
				<div className="flex flex-col items-end text-right h-[48px] justify-center">
					<div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-1"></div>
					<div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
				</div>
			</div>

			{/* 내 보유 정보 */}
			<div className="flex justify-between items-center -mx-[22px] pr-[22px] pl-[65px] bg-gray-100 py-[8px] h-[32px]">
				<div className="w-1/3">
					<div className="h-3 w-24 bg-gray-300 rounded animate-pulse"></div>
				</div>
				<div className="w-2/3 flex text-right gap-2">
					<div className="w-1/2 h-3 bg-gray-300 rounded animate-pulse"></div>
					<div className="w-1/2 h-3 bg-gray-300 rounded animate-pulse"></div>
				</div>
			</div>
		</div>
	);
}
