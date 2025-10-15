import { StockInfo, StockRisk } from '@/types/chart';

export const fetchStockInfo = async (stockCode: string) => {
	try {
		const res = await fetch(`/api/v1/external/chart/${stockCode}/lastPrice`);
		if (!res.ok) {
			throw new Error('종목 정보를 불러오는 데 실패했습니다.');
		}
		return res.json() as Promise<StockInfo>;
	} catch (error) {
		console.error('종목 정보 fetch 에러', error);
		return null;
	}
};

export const fetchStockRiskCheck = async (stockCode: string) => {
	try {
		const res = await fetch(`/api/v1/external/chart/${stockCode}/stockRisk`);
		if (!res.ok) {
			throw new Error('종목 경고 체크를 불러오는 데 실패했습니다.');
		}
		return res.json() as Promise<StockRisk>;
	} catch (error) {
		console.error('위험 종목 fetch 에러', error);
		return null;
	}
};

export async function fetchChartData(stockCode: string) {
	const res = await fetch(`/api/v1/external/chart/${stockCode}/day`);
	if (!res.ok) {
		throw new Error('차트 데이터를 불러오는 데 실패했습니다.');
	}
	return res.json();
}
