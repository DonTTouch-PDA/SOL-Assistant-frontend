'use client';
import BottomSheet from '@/components/common/bottomSheet';
import CustomButton from '@/components/common/custombutton';
import React, { useState } from 'react';

export default function TestPage() {
	const [open, setOpen] = useState(false);

	return (
		<div>
			<CustomButton
				text="누르면올라옴"
				onClick={() => {
					setOpen(true);
				}}
			/>
			<BottomSheet
				title="제목"
				content="내용"
				additionalContent="유의사항"
				isOpen={open}
				onClose={() => setOpen(false)}
			/>
		</div>
	);
}
