export default function StockSummaryCardSkeleton() {
	return (
		<div className="border rounded-xl p-7 mb-3 flex flex-col gap-3 animate-pulse border-gray-200">
			{/* 상단 */}
			<div className="flex items-center gap-2">
				<div className="w-8 h-8 rounded-full bg-gray-200" />
				<div className="flex flex-col gap-1">
					<div className="w-24 h-4 bg-gray-200 rounded" />
					<div className="w-16 h-3 bg-gray-200 rounded" />
				</div>
			</div>

			<div className="h-6 w-32 bg-gray-200 rounded mt-2" />
			<div className="flex justify-between mt-1">
				<div className="w-24 h-3 bg-gray-200 rounded" />
				<div className="w-16 h-3 bg-gray-200 rounded" />
			</div>

			<div className="border-t border-gray-100 my-3" />

			{/* 고수의 Pick */}
			<div className="flex flex-col gap-2 py-2">
				<div className="w-28 h-4 bg-gray-200 rounded" />
				<div className="flex gap-2">
					<div className="w-1/2 h-10 bg-gray-200 rounded" />
					<div className="w-1/2 h-10 bg-gray-200 rounded" />
				</div>
			</div>

			<div className="border-t border-gray-100 my-3" />

			{/* 하단 */}
			<div className="flex justify-around">
				<div className="w-20 h-4 bg-gray-200 rounded" />
				<div className="w-[1px] h-5 bg-gray-100" />
				<div className="w-20 h-4 bg-gray-200 rounded" />
			</div>
		</div>
	);
}
