export default function RiskItemBadge({ riskType }: { riskType: string }) {
	return (
		<div
			className={`flex ${riskType === '관리종목' ? 'text-yellow-500 bg-yellow-100' : 'text-red-500 bg-red-100'} rounded-[8px] px-[9px] py-[5px] font-bold text-[13px] justify-center `}
		>
			{riskType}
		</div>
	);
}
