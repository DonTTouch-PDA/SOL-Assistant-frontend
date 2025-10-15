export interface Trading {
	stock: string;
	imgUrl: string;
	type: '매수' | '매도' | string;
	amount: number;
	price: number;
}

export interface DailyTrading {
	date: string;
	tradings: Trading[];
}

export interface MonthlyHistory {
	month: string;
	total: {
		sum: number;
		diff: number;
		buy: { count: number; price: number };
		sell: { count: number; price: number };
	};
	breakdown: DailyTrading[];
}

export interface ProfitHistoryData {
	currentMonth: MonthlyHistory;
	previousMonths: MonthlyHistory[];
}
