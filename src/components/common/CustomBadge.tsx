interface EmotionBadgeProps {
	emotion: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
}
export function EmotionBadge({ emotion }: EmotionBadgeProps) {
	const emotionColors: Record<string, string> = {
		POSITIVE: 'bg-[#EAF5F0] text-[#169F6E] ',
		NEGATIVE: 'bg-[#FCF4F4] text-[#FA2D42]',
		NEUTRAL: 'bg-[#FFF9E8] text-[#EA9635] ',
	};
	return (
		<span
			className={`rounded-lg px-2 py-0.5 text-sm font-semibold ${emotionColors[emotion]}`}
		>
			{emotion === 'POSITIVE'
				? '긍정'
				: emotion === 'NEGATIVE'
					? '부정'
					: '중립'}
		</span>
	);
}

interface BuySellBadgeProps {
	type: 'BUY' | 'SELL' | 'NONE';
}

export function BuySellBadge({ type }: BuySellBadgeProps) {
	const buySellColors: Record<string, string> = {
		SELL: 'bg-[#E6EDFF] text-[#2D77FA] ',
		BUY: 'bg-[#FCF4F4] text-[#FA2D42]',
		NONE: 'bg-[#F4F6F9] text-[#999DA5]',
	};
	return (
		<span
			className={`rounded-lg px-2 py-0.5 text-sm font-semibold ${buySellColors[type]}`}
		>
			{type === 'BUY' ? '매수' : type === 'SELL' ? '매도' : '없음'}
		</span>
	);
}
