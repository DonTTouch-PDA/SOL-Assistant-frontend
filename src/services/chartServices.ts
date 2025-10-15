import { StockInfo, StockRisk } from '@/types/chart';
const baseUrl = 'https://sol-assistant.site/api';

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
