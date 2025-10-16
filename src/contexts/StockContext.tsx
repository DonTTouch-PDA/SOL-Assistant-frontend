'use client';
import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import { fetchStockInfo } from '@/services/chartServices';
import { StockInfo } from '@/types/chart';

interface StockContextType {
	stockInfo: StockInfo | null;
	isLoading: boolean;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export function StockProvider({ children }: { children: ReactNode }) {
	const [stockInfo, setStockInfo] = useState<StockInfo | null>(null);
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
