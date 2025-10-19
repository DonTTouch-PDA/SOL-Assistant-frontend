import { apiClient } from './apiClient';
const baseUrl = 'https://sol-assistant.site/api';

export default async function searchStock(params: string) {
	try {
		const res = await fetch(
			`${baseUrl}/v1/external/chart/search/${encodeURIComponent(params)}`
		);
		if (!res.ok) {
			throw new Error(`HTTP ${res.status}`);
		}
		const data = await res.json();
		return data.stockList;
	} catch (err) {
		console.error('검색 요청 실패', err);
		return [];
	}
}
