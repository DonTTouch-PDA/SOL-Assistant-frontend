import { apiClient } from './apiClient';
import { MyStock } from '@/types/myStock';

export const fetchGetMyStocks = async () => {
	try {
		const res = await apiClient.request(
			`/api/v1/internal/member/report/my-stock`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		const data: MyStock[] = await res.json();
		return data;
	} catch (error) {
		console.error('내 종목 정렬 조회 실패:', error);
		throw error;
	}
};
