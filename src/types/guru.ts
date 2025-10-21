export interface GuruTrade {
	stockSymbol: string;
	stockName: string;
	yesterdayClosePrice: number;
	todayClosePrice: number;
	priceChangePercent: number;
	yesterdayVolume: number;
	todayVolume: number;
	volumeChangePercent: number;
	guruBuyVolume: number;
	guruSellVolume: number;
	guruVolumePercent: number;
}
export interface GuruTradeData {
	date: string;
	stockVolumeList: GuruTrade[];
}

export type FilterType = 'BUY' | 'SELL';
export type GuruType = 'DAY' | 'SWING' | 'HOLD';
export type UserFilterType = '고수' | '나';
