import { GuruTradeData, FilterType, GuruType } from '@/types/guru';
import { apiClient } from './apiClient';

export const fetchGetGuruByTrading = async (
	side: FilterType = 'BUY',
	investmentType: GuruType = 'DAY'
): Promise<GuruTradeData> => {
	try {
		console.log('고수의 픽 거래종목 조회 :', { side, investmentType });
		const res = await apiClient.request(
			`/api/v1/internal/expert/volume/${side}/${investmentType}`,
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
		const data: GuruTradeData = await res.json();
		return data;
	} catch (error) {
		console.error('고수의 픽 거래종목 조회 실패:', error);
		throw error;
	}
};

export const fetchGetGuruByViewing = async (
	guruType: GuruType = 'DAY'
): Promise<GuruTradeData> => {
	console.log('고수의 픽 조회종목 조회 :', { guruType });
	try {
		const res = await apiClient.request(
			`/api/v1/internal/expert/view/${guruType}`,
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
		const data: GuruTradeData = await res.json();
		return data;
	} catch (error) {
		console.error('고수의 픽 조회종목 조회 실패:', error);
		throw error;
	}
};

export const fetchGetMyByViewing = async (): Promise<GuruTradeData> => {
	console.log('내 관심 종목 조회');
	try {
		const res = await apiClient.request(`/api/v1/internal/expert/my-view`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		const data: GuruTradeData = await res.json();
		console.log(data.stockVolumeList);
		return data;
	} catch (error) {
		console.error('내 관심 종목 조회 실패:', error);
		throw error;
	}
};
