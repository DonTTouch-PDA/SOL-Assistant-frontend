import { CircleCheck, CircleX } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CustomToastProps {
	message: string;
	type: 'success' | 'fail';
	onClose?: () => void;
}
export default function CustomToast({
	message,
	type,
	onClose,
}: CustomToastProps) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);

		const timer = setTimeout(() => {
			setIsVisible(false);
			setTimeout(() => {
				onClose?.();
			}, 300);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div
			className={`fixed bottom-30 left-1/2 transform -translate-x-1/2 z-100 flex items-center px-6 py-3 rounded-[16px] bg-black/70 gap-3 min-w-[250px] max-w-[400px] transition-all duration-300 ease-in-out ${
				isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
			}`}
		>
			{type === 'success' ? (
				<CircleCheck size={25} className="text-green-500" />
			) : (
				<CircleX size={25} className="text-red-500" />
			)}
			<div>
				<p className="text-white text-[16px]">
					{type === 'success' ? '주문 성공' : '주문 실패'}
				</p>
				<p className="text-white text-[16px]">{message}</p>
			</div>
		</div>
	);
}
