'use client';
import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import { fetchStockInfo, fetchStockRiskCheck } from '@/services/chartServices';
import { StockInfo, StockRisk } from '@/types/chart';

interface StockContextType {
	stockInfo: StockInfo | null;
	stockRisk: StockRisk | null;
	isLoading: boolean;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export function StockProvider({ children }: { children: ReactNode }) {
	const [stockInfo, setStockInfo] = useState<StockInfo | null>(null);
	const [stockRisk, setStockRisk] = useState<StockRisk | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const loadStockInfo = async () => {
			setIsLoading(true);

			try {
				// URL에서 stockCode 가져오기
				const path = window.location.pathname;
				const stockCode = path.split('/')[1];

				if (stockCode && stockCode !== 'chart') {
					const info = await fetchStockInfo(stockCode);
					setStockInfo(info as StockInfo);
					const risk = await fetchStockRiskCheck(stockCode);
					setStockRisk(risk as StockRisk);
				}
			} catch (error) {
				console.error('주식 정보 로딩 실패:', error);
			} finally {
				setIsLoading(false);
			}
		};

		loadStockInfo();
	}, []);

	return (
		<StockContext.Provider
			value={{
				stockInfo,
				stockRisk,
				isLoading,
			}}
		>
			{children}
		</StockContext.Provider>
	);
}

export function useStock() {
	const context = useContext(StockContext);
	if (context === undefined) {
		throw new Error('useStock must be used within a StockProvider');
	}
	return context;
}
