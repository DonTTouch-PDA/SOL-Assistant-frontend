import { motion } from 'framer-motion';
import { fetchGetSimilarChart } from '@/services/signalServices';
import { useEffect, useState } from 'react';
import { ChevronLeft, CircleAlert } from 'lucide-react';
import { SIMILAR_DETAIL_BOLLINGER_BANDS } from '@/constants/descriptions';
import { SimilarChartDetail } from '@/types/similar';
import { useRouter } from 'next/navigation';

interface StockNameProps {
	stockCode: string;
	stockName: string;
	onclose: () => void;
}
export default function SimilarDetailContainer({
	stockCode,
	stockName,
	onclose,
}: StockNameProps) {
	const router = useRouter();
	const [similarChart, setSimilarChart] = useState<SimilarChartDetail | null>(
		null
	);
	const getSimilarChart = async () => {
		const data = await fetchGetSimilarChart(stockCode);
		setSimilarChart(data as SimilarChartDetail);
	};
	useEffect(() => {
		getSimilarChart();
	}, []);
	return (
		<motion.div
			className="absolute inset-0 z-50 bg-white flex flex-col"
			initial={{ x: '100%' }}
			animate={{ x: 0 }}
			exit={{ x: '100%' }}
			transition={{ type: 'tween', duration: 0.3 }}
		>
			<div className="flex items-center -ml-[10px]">
				<ChevronLeft size={30} onClick={onclose} />
				<p>과거 유사 차트</p>
			</div>
			<div className="flex justify-between items-center border-b border-gray-200 py-4">
				<p className="text-[30px] pl-[10px] font-bold">{stockName}</p>
				<button
					className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
					onClick={() => {
						router.push(`/${stockCode}`);
					}}
				>
					주문
				</button>
			</div>
			<div className="flex flex-col items-center">
				<div className="flex items-center gap-1">
					<CircleAlert size={16} />
					<p className="text-[12px] py-[12px]">
						{stockName}과 유사한 매매 신호가 나타난 과거 다른 종목의 차트예요.
					</p>
				</div>
				<div className="w-full mb-[16px] h-[250px] pt-[16px] bg-gray-200">
					d
				</div>
				<div className="w-full  border-gray-100 border shadow-md p-4 rounded-xl">
					<p className="text-[20px] font-bold">{similarChart?.signalType}</p>
					<p className="text-[16px] leading-5">
						{SIMILAR_DETAIL_BOLLINGER_BANDS}
					</p>
				</div>
			</div>
		</motion.div>
	);
}
