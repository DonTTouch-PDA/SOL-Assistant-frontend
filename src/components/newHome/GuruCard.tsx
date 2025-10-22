interface GuruCardProps {
	type: '매수' | '매도';
	diff: number;
}
export default function GuruCard({ type, diff }: GuruCardProps) {
	const hasFallen = diff < 0;
	return (
		<div
			className={`px-5 py-4 w-full rounded-xl cursor-pointer ${type === '매수' ? 'bg-[#FFF3F2]' : 'bg-[#E6EDFF]'}`}
		>
			<p className="text-sm pb-1">고수의 {type}량</p>
			<p className="font-medium leading-5">
				어제보다{' '}
				<b className={`${hasFallen ? 'text-[#2D77FA]' : 'text-[#FA2D42]'}`}>
					{hasFallen ? -diff : diff}%
				</b>
				<br />
				{hasFallen ? '적게' : '많이'} {type == '매수' ? '샀어요' : '팔았어요'}
			</p>
		</div>
	);
}
