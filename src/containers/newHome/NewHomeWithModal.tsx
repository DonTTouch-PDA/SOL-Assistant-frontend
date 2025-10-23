'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import NewHomeContainer from './NewHomeContainer';
import SectorNewsDetailContainer from './SectorNewsDetailContainer';

export default function NewHomeWithModal() {
	const [showSectorNews, setShowSectorNews] = useState(false);
	const [sectorNewsData, setSectorNewsData] = useState<{
		stockName: string;
		stockCode: string;
		sectorId: string;
	} | null>(null);

	const handleSectorNewsClick = (
		stockName: string,
		stockCode: string,
		sectorId: string
	) => {
		setSectorNewsData({ stockName, stockCode, sectorId });
		setShowSectorNews(true);
	};

	const handleClose = () => setShowSectorNews(false);

	return (
		<>
			<NewHomeContainer onSectorNewsClick={handleSectorNewsClick} />

			{/* 섹터 뉴스 상세 모달 */}
			<AnimatePresence>
				{showSectorNews && sectorNewsData && (
					<motion.div
						className="fixed inset-0 z-50 flex justify-center items-end"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						{/* ✅ 오버레이 (배경 클릭 시 닫힘) */}
						<div className="absolute inset-0" onClick={handleClose}></div>

						{/* ✅ 모달 (클릭 전파 차단) */}
						<div
							className="relative z-50 w-full max-w-[430px] min-w-[375px]"
							onClick={(e) => e.stopPropagation()}
						>
							<SectorNewsDetailContainer
								stockName={sectorNewsData.stockName}
								stockCode={sectorNewsData.stockCode}
								sectorId={sectorNewsData.sectorId}
								onClose={handleClose}
							/>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
