'use client';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
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

	return (
		<>
			<NewHomeContainer onSectorNewsClick={handleSectorNewsClick} />

			{/* 섹터 뉴스 상세 모달 */}
			<AnimatePresence>
				{showSectorNews && sectorNewsData && (
					<SectorNewsDetailContainer
						stockName={sectorNewsData.stockName}
						stockCode={sectorNewsData.stockCode}
						sectorId={sectorNewsData.sectorId}
						onClose={() => setShowSectorNews(false)}
					/>
				)}
			</AnimatePresence>
		</>
	);
}
