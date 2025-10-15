const baseUrl = 'https://sol-assistant.site/api';
export const fetchStockInfo = async (stockCode: string) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			if (stockCode === '005930') {
				resolve({
					stockName: '삼성전자',
					price: 100000,
					prevPrice: 110000,
				});
			} else if (stockCode === '035420') {
				resolve({
					stockName: 'NAVER',
					price: 100000,
					prevPrice: 100000,
				});
			} else if (stockCode === '000660') {
				resolve({
					stockName: 'SK하이닉스',
					price: 100000,
					prevPrice: 105000,
				});
			} else if (stockCode === '034020') {
				resolve({
					stockName: '두산에너빌리티',
					price: 100000,
					prevPrice: 80000,
				});
			} else if (stockCode === '035720') {
				resolve({
					stockName: '카카오',
					price: 45000,
					prevPrice: 55000,
				});
			} else {
				resolve({
					stockName: '알 수 없음',
					price: 0,
					prevPrice: 0,
				});
			}
		}, 100);
	});
};

export async function fetchChartData(stockCode: string) {
	const res = await fetch(`${baseUrl}/v1/external/chart/${stockCode}/day`);
	if (!res.ok) {
		throw new Error('차트 데이터를 불러오는 데 실패했습니다.');
	}
	return res.json();
}
// 고수 거래량 차트
interface GuruTradeItem {
	date: string;
	buyVolume: number;
	sellVolume: number;
	holdingVolume: number;
}

interface GuruTradeResponse {
	symbol: string;
	stockName: string;
	period: string;
	data: GuruTradeItem[];
}

const guruTypeMap: Record<string, string> = {
	'단기 고수': 'day',
	'중기 고수': 'swing',
	'장기 고수': 'hold',
};

import { GuruStockData } from '@/types/chart';

export async function fetchGuruTradeData(
	stockCode: string,
	guruType: string
): Promise<GuruStockData[]> {
	const apiGuruType = guruTypeMap[guruType];
	const res = await fetch(
		`${baseUrl}/v1/external/chart/${stockCode}/guruTrade/${apiGuruType}`
	);
	if (!res.ok) {
		throw new Error('고수의 거래량 데이터를 불러오는 데 실패했습니다.');
	}
	const json: GuruTradeResponse = await res.json();

	// return json.data
	// 	.map((item: GuruTradeItem) => ({
	// 		time: item.date.split('T')[0],
	// 		buyVolume: item.buyVolume,
	// 		sellVolume: item.sellVolume,
	// 		value: item.holdingVolume,
	// 	}))
	// 	.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

	//중복제거로직포함, 실제 서비스시 위 코드로
	const sortedData = json.data
		.map((item: GuruTradeItem) => ({
			time: item.date.split('T')[0],
			buyVolume: item.buyVolume,
			sellVolume: item.sellVolume,
			value: item.holdingVolume,
		}))
		.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

	const dedupedData = sortedData.reduce<GuruStockData[]>((acc, cur) => {
		if (acc.length === 0 || acc[acc.length - 1].time !== cur.time) {
			acc.push(cur);
		}
		return acc;
	}, []);

	return dedupedData;
}
