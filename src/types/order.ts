export interface OrderResponse {
	userTradeId: string | null;
	stockId: string;
	userId: string;
	tradeTs: string | null;
	quantity: number | null;
	price: number | null;
	side: string | null;
	status: string;
}

export interface OrderResponseMessage {
	status: 'SUCCESS' | 'FAIL';
	message: string;
}
