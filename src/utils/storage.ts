// 로컬 스토리지에서 최근 본 종목 코드 관리하는 곳
const RECENT_STOCK_KEY = 'recent_stock_code';

export const getStockCodeFromLocalStorage = (): string | null => {
	if (typeof window === 'undefined') return null;
	return localStorage.getItem(RECENT_STOCK_KEY);
};

export const setStockCodeToLocalStorage = (stockCode: string): void => {
	if (typeof window === 'undefined') return;
	localStorage.setItem(RECENT_STOCK_KEY, stockCode);
};

export const clearStockCodeFromLocalStorage = (): void => {
	if (typeof window === 'undefined') return;
	localStorage.removeItem(RECENT_STOCK_KEY);
};
