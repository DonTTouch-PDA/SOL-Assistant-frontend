import { SignalType } from '@/types/similar';
export const fetchGetSimilarChart = async (
	isUserHasStock: boolean,
	filterType: SignalType = 'buy'
) => {
	console.log('유사 차트 조회 :', { isUserHasStock, filterType });
	return new Promise((resolve) => {
		setTimeout(() => {
			if (isUserHasStock) {
				resolve({
					charts: [
						{
							name: 'NAVER',
							img: 'https://static.toss.im/png-icons/securities/icn-sec-fill-035420.png',
							code: '035420',
							currentPrice: 253500,
							changeRate: 11.18,
							amount: 1000000000000,
						},
						{
							name: '삼성전자',
							img: 'https://static.toss.im/png-icons/securities/icn-sec-fill-005930.png',
							code: '005930',
							currentPrice: 85900,
							changeRate: 0.59,
							amount: 1000000000000,
						},
						{
							name: 'SK하이닉스',
							img: 'https://static.toss.im/png-icons/securities/icn-sec-fill-000660.png',
							code: '000660',
							currentPrice: 356000,
							changeRate: -0.42,
							amount: 1000000000000,
						},
					],
					totalCount: 3,
				});
			} else {
				resolve({
					charts: [
						{
							name: '두산에너빌리티',
							img: 'https://static.toss.im/png-icons/securities/icn-sec-fill-034020.png',
							code: '034020',
							currentPrice: 64100,
							changeRate: -2.73,
							amount: 1000000000000,
						},
						{
							name: '카카오',
							img: 'https://static.toss.im/png-icons/securities/icn-sec-fill-035720.png',
							code: '035720',
							currentPrice: 45000,
							changeRate: 1.2,
							amount: 1000000000000,
						},
					],
					totalCount: 2,
				});
			}
		}, 1000);
	});
};
