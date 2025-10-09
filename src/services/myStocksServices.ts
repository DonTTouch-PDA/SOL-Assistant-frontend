export const fetchGetStocksSortedBy = async (sortedBy: string) => {
	console.log(sortedBy);
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: 1,
					name: 'NAVER',
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
		}, 1000); // 1초 지연으로 로딩 상태 테스트
	});
};
