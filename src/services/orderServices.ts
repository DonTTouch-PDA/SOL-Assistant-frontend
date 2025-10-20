import { getAccessToken } from '@/utils/tokenStorage';
import { OrderResponse, OrderResponseMessage } from '@/types/order';

export const orderBuyStock = async (
	symbol: string,
	price: number,
	quantity: number
): Promise<OrderResponseMessage> => {
	try {
		const res = await fetch(`/api/v1/internal/member/trade/buy`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getAccessToken()}`,
			},
			body: JSON.stringify({ symbol, price, quantity }),
		});

		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}

		const data: OrderResponse = await res.json();
		if (data.status === 'SUCCESS') {
			return {
				status: 'SUCCESS',
				message: `구매 가격 ${data.price?.toLocaleString()}원 - 수량 ${data.quantity?.toLocaleString()}주`,
			};
		} else if (data.status === 'FAIL - INSUFFICIENT_BALANCE') {
			return { status: 'FAIL', message: '잔액이 부족합니다.' };
		} else {
			return {
				status: 'FAIL',
				message: '알 수 없는 오류가 발생했습니다.',
			};
		}
	} catch (error) {
		console.error('매수 주문 실패:', error);
		throw error;
	}
};

export const orderSellStock = async (
	symbol: string,
	price: number,
	quantity: number
): Promise<OrderResponseMessage> => {
	try {
		const res = await fetch(`/api/v1/internal/member/trade/sell`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getAccessToken()}`,
			},
			body: JSON.stringify({ symbol, price, quantity }),
		});

		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}

		const data: OrderResponse = await res.json();
		if (data.status === 'SUCCESS') {
			return {
				status: 'SUCCESS',
				message: `${data.price?.toLocaleString()}원 - 수량 ${data.quantity?.toLocaleString()}주`,
			};
		} else if (data.status === 'FAIL - INSUFFICIENT_QUANTITY') {
			return { status: 'FAIL', message: '보유 수량이 부족합니다.' };
		} else if (data.status === 'FAIL - NO_OWNED_STOCK') {
			return {
				status: 'FAIL',
				message: '보유하지 않은 종목입니다.',
			};
		} else {
			return {
				status: 'FAIL',
				message: '오류가 발생했습니다.',
			};
		}
	} catch (error) {
		console.error('매도 주문 실패:', error);
		throw error;
	}
};

export const stockUserHasCount = async (stockCode: string) => {
	try {
		const res = await fetch(
			`/api/v1/internal/member/report/${stockCode}/count`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getAccessToken()}`,
				},
			}
		);
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		const data: number = await res.json();
		return data;
	} catch (error) {
		console.error('종목 보유 수량 조회 실패:', error);
		throw error;
	}
};
