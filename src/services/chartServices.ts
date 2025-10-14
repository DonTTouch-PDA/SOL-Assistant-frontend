const baseUrl = 'https://sol-assistant.site/api';

export const fetchStockInfo = async (stockCode: string) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			if (stockCode === '005930') {
				resolve({
					stockName: '삼성전자',
					price: 100000,
					prevPrice: 110000,
				});
			} else if (stockCode === '035420') {
				resolve({
					stockName: 'NAVER',
					price: 100000,
					prevPrice: 100000,
				});
			} else if (stockCode === '000660') {
				resolve({
					stockName: 'SK하이닉스',
					price: 100000,
					prevPrice: 105000,
				});
			} else if (stockCode === '034020') {
				resolve({
					stockName: '두산에너빌리티',
					price: 100000,
					prevPrice: 80000,
				});
			} else if (stockCode === '035720') {
				resolve({
					stockName: '카카오',
					price: 45000,
					prevPrice: 55000,
				});
			} else {
				resolve({
					stockName: '알 수 없음',
					price: 0,
					prevPrice: 0,
				});
			}
		}, 100);
	});
};

export async function fetchChartData(stockCode: string) {
	const res = await fetch(`${baseUrl}/v1/external/chart/${stockCode}/day`);
	if (!res.ok) {
		throw new Error('차트 데이터를 불러오는 데 실패했습니다.');
	}
	return res.json();
}
