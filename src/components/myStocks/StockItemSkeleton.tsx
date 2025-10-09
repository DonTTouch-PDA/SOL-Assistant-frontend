import React from 'react';

export default function StockItemSkeleton() {
	return (
		<div className="bg-white border-b pt-[12px] border-gray-100">
			{/* 종목 정보 */}
			<div className="flex items-center justify-between mb-2">
				<div className="flex items-center gap-3">
					<div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>

					<div>
						<div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-1"></div>
						<div className="flex gap-1">
							<div className="h-3 w-8 bg-gray-200 rounded animate-pulse"></div>
							<div className="h-3 w-6 bg-gray-200 rounded animate-pulse"></div>
						</div>
					</div>
				</div>

				<div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>

				<div className="text-right">
					<div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-1"></div>
					<div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
				</div>
			</div>

			{/* 내 보유 정보 */}
			<div className="flex justify-between items-center bg-gray-200 p-2">
				<div className="h-3 w-24 bg-gray-300 rounded animate-pulse"></div>
				<div className="flex gap-4">
					<div className="h-3 w-12 bg-gray-300 rounded animate-pulse"></div>
					<div className="h-3 w-16 bg-gray-300 rounded animate-pulse"></div>
				</div>
			</div>
		</div>
	);
}
