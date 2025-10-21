import { getAccessToken } from '@/utils/tokenStorage';
import { MyStock } from '@/types/myStock';

export const fetchGetMyStocks = async () => {
	try {
		const res = await fetch(`/api/v1/internal/member/report/my-stock`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getAccessToken()}`,
			},
		});
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
