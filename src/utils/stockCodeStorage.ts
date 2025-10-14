// 로컬 스토리지에서 최근 본 종목 코드 관리하는 곳
const RECENT_STOCK_KEY = 'recent_stock_code';

export const getStockCodeFromLocalStorage = (): string | null => {
	return localStorage.getItem(RECENT_STOCK_KEY);
};

export const setStockCodeToLocalStorage = (stockCode: string): void => {
	localStorage.setItem(RECENT_STOCK_KEY, stockCode);
};

export const clearStockCodeFromLocalStorage = (): void => {
	localStorage.removeItem(RECENT_STOCK_KEY);
};
