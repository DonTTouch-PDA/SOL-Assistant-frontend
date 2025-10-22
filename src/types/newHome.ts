export interface GuruChangeData {
	guruSellPercent: number;
	guruBuyPercent: number;
	latestSellQuantity: number;
	latestBuyQuantity: number;
	prevSellQuantity: number;
	prevBuyQuantity: number;
	dailyGuru: boolean;
}

export interface SignData {
	symbol: string;
	buySignal: boolean;
	sellSignal: boolean;
}

export interface HomeNewsData {
	stockId: string;
	sectorId: string;
	emotion: string;
}
