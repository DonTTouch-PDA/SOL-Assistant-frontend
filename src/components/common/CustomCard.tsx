// 기본 카드
import { ReactNode } from 'react';

interface CustomCardProps {
	children: ReactNode;
}
export default function CustomCard({ children }: CustomCardProps) {
	return (
		<div className="border border-gray-100 rounded-xl shadow-[0_0_5px_3px_rgba(0,0,0,0.05)] shadow-gray-100 p-7 mb-3">
			<div>{children}</div>
		</div>
	);
}
