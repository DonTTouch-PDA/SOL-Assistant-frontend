import { SignalType, SimilarChartData } from '@/types/similar';
export const fetchGetSignalList = async (
	isUserHasStock: string,
	filterType: SignalType = '매수'
): Promise<SimilarChartData> => {
	console.log('신호 조회 :', { isUserHasStock, filterType });
	return new Promise<SimilarChartData>((resolve) => {
		setTimeout(() => {
			if (isUserHasStock === '보유') {
				resolve({
					stocks: [
						{
							name: 'NAVER',
							img: 'https://static.toss.im/png-icons/securities/icn-sec-fill-035420.png',
							code: '035420',
							currentPrice: 253500,
							changeRate: 11.18,
							amount: 99764700000,
						},
						{
							name: '삼성전자',
							img: 'https://static.toss.im/png-icons/securities/icn-sec-fill-005930.png',
							code: '005930',
							currentPrice: 85900,
							changeRate: 0.59,
							amount: 99764700000,
						},
						{
							name: 'SK하이닉스',
							img: 'https://static.toss.im/png-icons/securities/icn-sec-fill-000660.png',
							code: '000660',
							currentPrice: 356000,
							changeRate: -0.42,
							amount: 99764700000,
						},
						{
							name: '두산에너빌리티',
							img: 'https://static.toss.im/png-icons/securities/icn-sec-fill-034020.png',
							code: '034020',
							currentPrice: 64100,
							changeRate: -2.73,
							amount: 99764700000,
						},
						{
							name: '카카오',
							img: 'https://static.toss.im/png-icons/securities/icn-sec-fill-035720.png',
							code: '035720',
							currentPrice: 45000,
							changeRate: 1.2,
							amount: 99764700000,
						},
					],
					totalCount: 5,
				});
			} else if (isUserHasStock === '전체') {
				resolve({
					stocks: [
						{
							name: '두산에너빌리티',
							img: 'https://static.toss.im/png-icons/securities/icn-sec-fill-034020.png',
							code: '034020',
							currentPrice: 64100,
							changeRate: -2.73,
							amount: 99764700000,
						},
						{
							name: '카카오',
							img: 'https://static.toss.im/png-icons/securities/icn-sec-fill-035720.png',
							code: '035720',
							currentPrice: 45000,
							changeRate: 1.2,
							amount: 99764700000,
						},
					],
					totalCount: 2,
				});
			}
		}, 100);
	});
};

export const fetchGetSimilarChart = async (stockCode: string) => {
	console.log('상세 종목 조회 :', stockCode);
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				code: '035420',
				signalType: '볼린저밴드',
			});
		}, 100);
	});
};
