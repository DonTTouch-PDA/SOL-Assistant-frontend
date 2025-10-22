'use client';
import { useState } from 'react';
import BottomSheet from '@/components/common/BottomSheet';
import {
	INVESTMENT_TYPES,
	INVESTMENT_TYPES_ADD,
} from '@/constants/descriptions';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';

export default function MyType() {
	const { userData } = useAuth();
	const investmentType = userData?.investmentType;
	const [open, setOpen] = useState(false);

	const typeCharacters = ['플리', '도레미', '몰리'];
	const investmentTypes = ['DAY', 'SWING', 'HOLD'];
	const typeDescriptions = ['DAY Trading', 'Swing Trading', 'Buy and Hold'];

	// investmentType을 인덱스로 변환
	const getTypeIndex = (type: string | undefined): number => {
		if (!type) return 0;
		const index = investmentTypes.indexOf(type);
		return index >= 0 ? index : 0;
	};

	const typeIndex = getTypeIndex(investmentType);

	return (
		<div>
			<div className="p-10 flex flex-row items-center gap-5">
				<Image
					src={`/type${typeIndex + 1}.png`}
					width={83}
					height={83}
					alt="type"
				/>
				<div>
					<h2 className="text-xl font-semibold">
						{userData?.name}님은 <br />
						<b className="font-bold text-[#2a3fec]">
							{typeCharacters[typeIndex]}
						</b>{' '}
						형이에요
					</h2>
					<span className="text-sm inline-flex gap-2">
						{typeDescriptions[typeIndex]}
						<Image
							src="/question.png"
							width={20}
							height={20}
							onClick={() => setOpen(true)}
							alt="info"
						/>
					</span>
				</div>
			</div>
			<BottomSheet
				title="투자성향"
				content={INVESTMENT_TYPES}
				additionalContent={INVESTMENT_TYPES_ADD}
				isOpen={open}
				onClose={() => setOpen(false)}
			/>
		</div>
	);
}
