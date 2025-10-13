export interface SimilarChart {
	name: string;
	img: string;
	code: string;
	currentPrice: number;
	changeRate: number;
	amount: number;
}
export interface SimilarChartData {
	stocks: SimilarChart[];
	totalCount: number;
}

export type SignalType = '매수' | '매도';

export interface SimilarChartDetail {
	code: string;
	signalType: string;
}
