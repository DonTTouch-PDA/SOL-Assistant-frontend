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

export type FilterType = 'most_bought' | 'most_sold';
export type GuruType = 'short_term' | 'mid_term' | 'long_term';
export type UserFilterType = 'guru' | 'me';
