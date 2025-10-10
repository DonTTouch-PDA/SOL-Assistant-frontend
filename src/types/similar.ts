export interface SimilarChart {
	name: string;
	img: string;
	code: string;
	currentPrice: number;
	changeRate: number;
	amount: number;
}
export interface SimilarChartData {
	charts: SimilarChart[];
	totalCount: number;
}

export type SignalType = 'buy' | 'sell';
