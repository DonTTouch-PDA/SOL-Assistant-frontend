export default function RiskItemBadge({ riskType }: { riskType: string }) {
	return (
		<div
			className={`flex ${riskType === '관리종목' ? 'text-yellow-500 bg-yellow-100' : 'text-red-500 bg-red-100'} rounded-[6px] px-[7px] py-[3px] font-bold text-[13px] justify-center `}
		>
			{riskType}
		</div>
	);
}
