export interface StockInfo {
	symbol: string;
	stockName: string;
	previousClose: number;
	prePreviousClose: number;
}

export interface StockRisk {
	symbol: string;
	stockName: string;
	management: boolean;
	delisting: boolean;
}
