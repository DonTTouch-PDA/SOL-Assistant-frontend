import { newsList } from '@/types/news';
import { apiClient } from './apiClient';
const baseUrl = 'https://sol-assistant.site/api';

export async function fetchSectorNews(): Promise<newsList[]> {
	const res = await apiClient.request(
		`${baseUrl}/v1/external/news/my-sector/news-info`
	);
	if (!res.ok) {
		throw new Error('뉴스 데이터를 불러오는 데 실패했습니다.');
	}
	return res.json();
}

export async function fetchSectorNewsBySectorId(
	sectorId: string
): Promise<newsList[]> {
	const res = await apiClient.request(
		`${baseUrl}/v1/external/news/${sectorId}`
	);
	if (!res.ok) {
		throw new Error('섹터 뉴스 데이터를 불러오는 데 실패했습니다.');
	}
	return res.json();
}
