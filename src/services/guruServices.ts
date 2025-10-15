import {
	GuruTradeData,
	GuruViewData,
	FilterType,
	GuruType,
	UserFilterType,
} from '@/types/guru';

export const fetchGetGuruByTrading = async (
	filterType: FilterType = '많이 산',
	guruType: GuruType = '단기'
): Promise<GuruTradeData> => {
	console.log('고수의 픽 거래종목 조회 :', { filterType, guruType });

	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				stocks: [
					{
						name: 'NAVER',
						img: 'https://static.toss.im/png-icons/securities/icn-sec-fill-035420.png',
						code: '035420',
						currentPrice: 253500,
						changeRate: 11.18,
						type: 'KOSPI',
						buyRate: 18,
					},
					{
						name: '삼성전자',
						img: 'https://static.toss.im/png-icons/securities/icn-sec-fill-005930.png',
						code: '005930',
						currentPrice: 85900,
						changeRate: 0.59,
						type: 'KOSPI',
						buyRate: 10.1,
					},
					{
						name: 'SK하이닉스',
						img: 'https://static.toss.im/png-icons/securities/icn-sec-fill-000660.png',
						code: '000660',
						currentPrice: 356000,
						changeRate: -0.42,
						type: 'KOSPI',
						buyRate: 8,
					},
					{
						name: '두산에너빌리티',
						img: 'https://static.toss.im/png-icons/securities/icn-sec-fill-034020.png',
						code: '034020',
						currentPrice: 64100,
						changeRate: -2.73,
						type: 'KOSPI',
						buyRate: 6.1,
					},
				],
				totalCount: 4,
			});
		}, 100);
	});
};

export const fetchGetGuruByViewing = async (
	userFilter: UserFilterType = '고수',
	guruType: GuruType = '단기'
): Promise<GuruViewData> => {
	console.log('고수의 픽 조회종목 조회 :', { userFilter, guruType });

	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				stocks: [
					{
						name: '삼성바이오로직스',
						img: 'https://static.toss.im/png-icons/securities/icn-sec-fill-207940.png',
						code: '207940',
						currentPrice: 1012000,
						changeRate: 0.7,
						amount: 995230000000,
					},
					{
						name: 'SK하이닉스',
						img: 'https://static.toss.im/png-icons/securities/icn-sec-fill-000660.png',
						code: '000660',
						currentPrice: 397500,
						changeRate: 10.42,
						amount: 432586100000,
					},
					{
						name: 'LG에너지솔루션',
						img: 'https://static.toss.im/png-icons/securities/icn-sec-fill-373220.png',
						code: '373220',
						currentPrice: 364000,
						changeRate: 4.75,
						amount: 29455500000,
					},
					{
						name: 'NAVER',
						img: 'https://static.toss.im/png-icons/securities/icn-sec-fill-035420.png',
						code: '035420',
						currentPrice: 253500,
						changeRate: -0.39,
						amount: 99764700000,
					},
				],
				totalCount: 4,
			});
		}, 100);
	});
};
