import { SimilarStock, SignalType, SimilarChartDetail } from '@/types/similar';
import { getAccessToken } from '@/utils/tokenStorage';

export const fetchMyStockSimilarChart = async (
	filterType: SignalType = 'buy'
) => {
	try {
		const res = await fetch(
			`/api/v1/insight/chart-similarity/my-stock?signal-type=${filterType}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getAccessToken()}`,
				},
			}
		);
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		const data: SimilarStock[] = await res.json();
		return data;
	} catch (error) {
		console.error('보유 종목 유사 차트 조회 실패:', error);
		throw error;
	}
};

export const fetchAllStockSimilarChart = async (
	filterType: SignalType = 'buy'
) => {
	try {
		const res = await fetch(
			`/api/v1/insight/chart-similarity/all-stock?signal-type=${filterType}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getAccessToken()}`,
				},
			}
		);
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		const data: SimilarStock[] = await res.json();
		return data;
	} catch (error) {
		console.error('전체 종목 유사 차트 조회 실패:', error);
		throw error;
	}
};

export const fetchSimilarChartDetail = async (
	stockCode: string,
	signalType: SignalType
) => {
	try {
		const res = await fetch(
			`/api/v1/insight/chart-similarity/${stockCode}?signal-type=${signalType}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getAccessToken()}`,
				},
			}
		);
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		const data: SimilarChartDetail = await res.json();
		return data;
	} catch (error) {
		console.error('유사 차트 상세 조회 실패:', error);
		throw error;
	}
};
