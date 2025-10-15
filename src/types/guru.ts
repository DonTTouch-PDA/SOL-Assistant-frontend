export interface GuruTrade {
	name: string;
	img: string;
	code: string;
	currentPrice: number;
	changeRate: number;
	type: string;
	buyRate: number;
}
export interface GuruTradeData {
	stocks: GuruTrade[];
	totalCount: number;
}

export interface GuruView {
	name: string;
	img: string;
	code: string;
	currentPrice: number;
	changeRate: number;
	amount: number;
}
export interface GuruViewData {
	stocks: GuruView[];
	totalCount: number;
}

export type FilterType = '많이 산' | '많이 판';
export type GuruType = '단기' | '중기' | '장기';
export type UserFilterType = '고수' | '나';
