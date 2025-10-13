'use client';

import BottomSheet from '@/components/common/bottomSheet';
import CustomButton from '@/components/common/custombutton';
import CustomPopOver from '@/components/common/customPopover';
import React, { useState, useEffect } from 'react';


export default function TestPage() {
	const [open, setOpen] = useState(false);
	const [showPopover, setShowPopover] = useState(false);

	useEffect(() => {
		if (!showPopover) return;
		const timer = setTimeout(() => setShowPopover(false), 1000);
		return () => clearTimeout(timer);
	}, [showPopover]);

	return (
		<div>
			<button onClick={() => setShowPopover(true)}>팝오버</button>
			<CustomPopOver text="hi" isShowPopover={showPopover} />
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
