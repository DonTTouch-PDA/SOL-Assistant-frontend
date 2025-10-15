// 파란색 긴 공통 버튼
'use client';

import React from 'react';

interface ButtonProps {
	text: string;
	onClick: () => void;
	disabled?: boolean;
	variant?: 'primary' | 'secondary';
}

export default function CustomButton({
	text,
	onClick,
	disabled = false,
	variant = 'primary',
}: ButtonProps) {
	const baseClasses = 'w-full h-12 rounded-lg font-medium transition-colors';

	const variantClasses = {
		primary: disabled
			? 'bg-blue-200 text-gray-400 cursor-not-allowed'
			: 'bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-800',
		secondary: disabled
			? 'bg-gray-200 text-gray-400 cursor-not-allowed'
			: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
	};

	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`${baseClasses} ${variantClasses[variant]}`}
		>
			{text}
		</button>
	);
}
