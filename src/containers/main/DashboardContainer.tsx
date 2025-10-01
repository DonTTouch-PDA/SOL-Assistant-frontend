export default function DashboardContainer() {
	return (
		<div className="pt-6">
			<div className="space-y-4">
				<div className="p-4 bg-gray-50 rounded-lg">
					<h2 className="font-semibold">포트폴리오</h2>
					<p className="text-sm text-gray-600">현재 보유 자산을 확인하세요</p>
				</div>
				<div className="p-4 bg-gray-50 rounded-lg">
					<h2 className="font-semibold">최근 거래</h2>
					<p className="text-sm text-gray-600">최근 거래 내역을 확인하세요</p>
				</div>
			</div>
		</div>
	);
}
