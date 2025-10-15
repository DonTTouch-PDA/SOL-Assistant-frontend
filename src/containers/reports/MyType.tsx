'use client';
import { useState } from 'react';
import BottomSheet from '@/components/common/BottomSheet';
import {
	INVESTMENT_TYPES,
	INVESTMENT_TYPES_ADD,
} from '@/constants/descriptions';
import Image from 'next/image';

const user = { type: 3, name: '프디아' };
const typeCharacters = ['플리', '도레미', '몰리'];
const types = ['Day Trading', 'Swing Trading', 'Buy and Hold'];

export default function MyType() {
	const type = user.type;
	const [open, setOpen] = useState(false);

	return (
		<div>
			<div className="p-10 flex flex-row items-center gap-5">
				<Image src={`/type${type}.png`} width={83} height={83} alt="type" />
				<div>
					<h2 className="text-xl font-semibold">
						{user.name}님은 <br />
						<b className="font-bold text-[#2a3fec]">
							{typeCharacters[type - 1]}
						</b>{' '}
						형이에요
					</h2>
					<span className="text-sm inline-flex gap-2">
						{types[type - 1]}
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
