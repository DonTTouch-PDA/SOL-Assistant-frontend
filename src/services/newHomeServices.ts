import { apiClient } from './apiClient';
const baseUrl = 'https://sol-assistant.site/api/v1';

export async function fetchGuruChangeData(stockCode: string) {
	const res = await apiClient.request(
		`${baseUrl}/internal/expert/stock-main/${stockCode}`
	);
	if (!res.ok) {
		throw new Error('고수 변화량 데이터를 불러오는 데 실패했습니다.');
	}
	return res.json();
}

export async function fetchSignData(stockCode: string) {
	const res = await apiClient.request(
		`${baseUrl}/insight/chart-similarity/stock-main/${stockCode}`
	);
	if (!res.ok) {
		throw new Error('매매신호 요약을 불러오는 데 실패했습니다.');
	}
	return res.json();
}

export async function fetchHomeNewsData(stockCode: string) {
	const res = await apiClient.request(
		`${baseUrl}/external/news/stock-main/${stockCode}`
	);
	if (!res.ok) {
		throw new Error('뉴스 요약을 불러오는 데 실패했습니다.');
	}
	return res.json();
}
