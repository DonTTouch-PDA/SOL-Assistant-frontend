export const fetchGetStocksSortedBy = async (sortedBy: string) => {
	console.log('내 종목 정렬 조회 :', sortedBy);
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: 1,
					name: 'NAVER',
					img: 'https://static.toss.im/png-icons/securities/icn-sec-fill-035420.png',
					code: '035420',
					currentPrice: 252500,
					changeRate: -0.59,
					type: 'KOSPI',
					holding: 10,
					buyAverage: 250000,
					diff: 2500,
					profit: 1.17,
				},
				{
					id: 2,
					name: '카카오',
					img: 'https://static.toss.im/png-icons/securities/icn-sec-fill-035720.png',
					code: '035720',
					currentPrice: 45000,
					changeRate: 1.2,
					type: 'KOSPI',
					holding: 100,
					buyAverage: 25000,
					diff: 20000,
					profit: 80.0,
				},
			]);
		}, 1000);
	});
};
