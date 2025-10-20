export interface SimilarStock {
	signalType: SignalType;
	name: string;
	stock_code: string;
	currentPrice: number;
	change_rate: number;
	today_volume: number;
}

export type SignalType = 'buy' | 'sell';

export interface SimilarChartDetail {
	stockName: string;
	signalType: string; //매수,매도 아님. 볼린저 밴드 등 기술 신호
	trendToday: TrendData[];
	trendPastScaled: TrendPastScaled[];
	todayDate: string;
	pastDate: string;
	description: string;
	descriptionDetail: string;
}

export interface TrendData {
	offset: number;
	Close: number;
}

export interface TrendPastScaled {
	offset: number;
	Close: number;
	ScaledClose: number;
}
