import { motion } from 'framer-motion';
import { fetchSimilarChartDetail } from '@/services/similarServices';
import { useEffect, useState } from 'react';
import { ChevronLeft, CircleAlert } from 'lucide-react';
import { SignalType, SimilarChartDetail } from '@/types/similar';
import { useRouter } from 'next/navigation';
import SimilarChart from '@/components/similar/SimilarChart';
import CustomCard from '@/components/common/CustomCard';
import CustomPopOver from '@/components/common/customPopover';

interface StockNameProps {
	stockCode: string;
	stockName: string;
	signalType: SignalType;
	onclose: () => void;
}
export default function SimilarDetailContainer({
	stockCode,
	stockName,
	onclose,
	signalType,
}: StockNameProps) {
	const router = useRouter();
	const [similarChart, setSimilarChart] = useState<SimilarChartDetail | null>(
		null
	);
	const getSimilarChartDetail = async () => {
		const data = await fetchSimilarChartDetail(stockCode, signalType);
		setSimilarChart(data as SimilarChartDetail);
	};
	useEffect(() => {
		getSimilarChartDetail();
	}, [stockCode, signalType]);

	const [showPopover, setShowPopover] = useState(false);

	useEffect(() => {
		const showTimer = setTimeout(() => {
			setShowPopover(true);

			const hideTimer = setTimeout(() => {
				setShowPopover(false);
			}, 2000);

			return () => clearTimeout(hideTimer);
		}, 500);

		return () => clearTimeout(showTimer);
	}, []);

	return (
		<motion.div
			className="absolute inset-0 z-50 bg-white flex flex-col mt-11"
			initial={{ x: '100%' }}
			animate={{ x: 0 }}
			exit={{ x: '100%' }}
			transition={{ type: 'tween', duration: 0.3 }}
		>
			{/* 상단 */}
			<div className="flex items-center -ml-[10px]">
				<ChevronLeft size={30} onClick={onclose} />
				<p>과거 유사 차트</p>
			</div>
			{/* 헤더 */}
			<div className="flex justify-between items-center border-b border-gray-200 py-4 -mx-5 px-5 bg-white">
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
			<div className="flex flex-col items-center px-2 gap-2">
				<div className="flex items-center gap-1">
					<CircleAlert size={16} />
					<p className="text-[12px] py-[12px]">
						오늘과 유사한 매매 신호가 나타났던 과거 {stockName}의 차트예요.
					</p>
				</div>
				<div
					className="w-full mb-[16px] h-[250px]"
					onClick={() => {
						setShowPopover(true);

						const hideTimer = setTimeout(() => {
							setShowPopover(false);
						}, 2000);

						return () => clearTimeout(hideTimer);
					}}
				>
					<SimilarChart
						data={{
							stockName: similarChart?.stockName || stockName,
							trendPastScaled: similarChart?.trendPastScaled || [],
							trendToday: similarChart?.trendToday || [],
							todayDate: similarChart?.todayDate || '',
							pastDate: similarChart?.pastDate || '',
						}}
					/>
				</div>
				<div className="relative">
					<div className="absolute top-0 right-0 translate-x-[10px] -translate-y-[15px]">
						<CustomPopOver
							text={`${similarChart?.description}`}
							upSideDown={true}
							isShowPopover={showPopover}
						/>
					</div>
				</div>
				<CustomCard>
					<div>
						<p className="text-[20px] font-bold pb-1">
							{similarChart?.signalType}
						</p>
						<p className="text-[16px] leading-5">
							{similarChart?.descriptionDetail}
						</p>
					</div>
				</CustomCard>
			</div>
		</motion.div>
	);
}
