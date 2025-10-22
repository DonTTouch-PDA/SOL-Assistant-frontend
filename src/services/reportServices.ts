import { apiClient } from './apiClient';
const baseUrl = '/api/v1/internal/member/report';

// 평균보유일수
export async function FetchMyRetention() {
	const res = await apiClient.request(`${baseUrl}/trade-record`);
	if (!res.ok) {
		throw new Error('보유일을 불러오는 데 실패했습니다.');
	}
	const json = await res.json();
	console.log(json.quantile);
	return {
		averageHoldingDays: json.averageHoldingDays,
		quantile: 100 - json.quantile * 100,
	};
}

export interface CircleSector {
	sectorId: string;
	sectorName: string;
	percentage: number;
}
export interface CircleSectorData {
	sectorList: CircleSector[];
}
// 섹터 원형차트
export async function FetchCircleChartData() {
	const res = await apiClient.request(`${baseUrl}/trade-sector`);
	if (!res.ok) {
		throw new Error('섹터 원형지표를 불러오는 데 실패했습니다.');
	}
	const json: CircleSectorData = await res.json();
	const data = json.sectorList;

	const sectorNames = data.map((d) => d.sectorName);
	const percentages = data.map((d) => d.percentage);

	return { sectorNames, percentages };
}
// 이번달수익
export async function FetchThisMonthProfit() {
	const res = await apiClient.request(`${baseUrl}/trade-profit/thisMonth`);
	if (!res.ok) {
		throw new Error('이번달 매매수익을 불러오는 데 실패했습니다.');
	}
	return res.json();
}

// 이번달 매매수익 상세페이지 - 월별수익
export interface ApiResponse {
	realizedProfit: number;
	realizedPercent: number;
	sellCount: number;
	sellAmount: number;
	buyCount: number;
	buyAmount: number;
	tradeList: ApiTrade[];
}

export interface ApiTrade {
	stockId: string;
	stockName: string;
	symbol: string;
	price: number;
	quantity: number;
	totalPrice: number;
	side: 'BUY' | 'SELL';
	tradeDate: string;
}

// 처리
function transformTradeData(apiData: ApiResponse) {
	const month = apiData.tradeList?.[0]
		? apiData.tradeList[0].tradeDate.slice(0, 7).replace('-', '.')
		: 'Unknown';

	// 날짜별로 그룹화
	const groupedByDate = apiData.tradeList.reduce(
		(acc, trade) => {
			const date = trade.tradeDate.slice(0, 10).replace(/-/g, '.');
			if (!acc[date]) acc[date] = [];
			acc[date].push(trade);
			return acc;
		},
		{} as Record<string, ApiTrade[]>
	);

	const breakdown = Object.entries(groupedByDate).map(([date, tradings]) => ({
		date,
		tradings: tradings.map((t) => ({
			stock: t.stockName,
			imgUrl: `https://static.toss.im/png-icons/securities/icn-sec-fill-${t.symbol}.png`,
			type: t.side === 'BUY' ? '매수' : '매도',
			amount: t.quantity,
			price: t.price,
		})),
	}));

	return {
		month,
		total: {
			sum: apiData.realizedProfit,
			diff: apiData.realizedPercent,
			buy: { count: apiData.buyCount, price: apiData.buyAmount },
			sell: { count: apiData.sellCount, price: apiData.sellAmount },
		},
		breakdown,
	};
}

// 이전내역 더있는지
export async function FetchHasMoreTradeHistory() {
	const res = await apiClient.request(`${baseUrl}/trade-profit/hasmonth`);
	if (!res.ok) {
		throw new Error(`이전 거래내역 여부를 불러오는 데 실패했습니다.`);
	}
	return res.json();
}

export async function FetchMonthlyProfit(month: string) {
	const res = await apiClient.request(`${baseUrl}/trade-profit/${month}`);
	if (!res.ok) {
		throw new Error(`${month}월 매매수익을 불러오는 데 실패했습니다.`);
	}

	const json: ApiResponse = await res.json();
	return transformTradeData(json);
}

export async function FetchPrevProfit(month: string) {
	const res = await apiClient.request(`${baseUrl}/trade-profit/${month}`);
	if (!res.ok) {
		throw new Error(`${month}월 매매수익을 불러오는 데 실패했습니다.`);
	}
	const json: ApiResponse = await res.json();
	return json.tradeList;
}

// 내자산
export async function FetchMyAsset() {
	const res = await apiClient.request(`${baseUrl}/trade-money`);
	if (!res.ok) {
		throw new Error(`내 자산을 불러오는 데 실패했습니다.`);
	}
	return res.json();
}
