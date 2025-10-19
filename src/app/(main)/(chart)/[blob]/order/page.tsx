'use client';

import { useSearchParams } from 'next/navigation';
import Order from '@/containers/chart/Order';

export default function OrderPage() {
	const searchParams = useSearchParams();

	// URL 파라미터에서 가격과 매매유형 읽기
	const price = searchParams.get('price');
	const tradeType = searchParams.get('tradeType');

	// orderFromModal 객체 생성
	const orderFromModal =
		price && tradeType
			? {
					price: parseInt(price),
					tradeType: tradeType as 'buy' | 'sell',
				}
			: undefined;

	return <Order orderFromModal={orderFromModal} />;
}
