export interface StockInfo {
	stockName: string;
	price: number;
	prevPrice: number;
}

export interface GuruStockData {
	time: string;
	buyVolume: number;
	sellVolume: number;
	value: number;
}
