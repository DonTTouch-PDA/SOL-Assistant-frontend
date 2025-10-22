import fs from 'fs';
import path from 'path';

const LOG_FILE = path.join(process.cwd(), 'tmp', 'chart-logs.jsonl');
let cachedStocks: { stockId: string; symbol: string }[] | null = null;

async function loadStocks() {
	if (!cachedStocks) {
		const rawStock = await fs.promises.readFile(
			path.join(process.cwd(), 'public', 'stocks.json'),
			'utf-8'
		);
		cachedStocks = JSON.parse(rawStock);
	}
	return cachedStocks;
}

// 로그 수집 엔드포인트
export async function POST(req: Request) {
	const body = await req.json();

	if (!body.userId || !body.stockId || !body.deltaScore) {
		return Response.json(
			{ status: 'error', message: '사용자 로그 데이터 오류' },
			{ status: 400 }
		);
	}

	// public/stocks.json 매핑으로 stockId 변경하기
	const stocks = await loadStocks();
	const stock = stocks?.find(
		(stock: { stockId: string; symbol: string }) =>
			stock.symbol === body.stockId
	);
	if (!stock) {
		return Response.json(
			{ status: 'error', message: '종목을 찾을 수 없음. 매핑 불가' },
			{ status: 404 }
		);
	}

	const logEntry = {
		userId: body.userId,
		stockId: stock.stockId,
		deltaScore: Number(body.deltaScore),
		eventTime: body.eventTime,
	};

	// JSONL 형태로 저장
	await fs.promises.appendFile(
		LOG_FILE,
		JSON.stringify(logEntry) + '\n',
		'utf-8'
	);
	return Response.json({ status: 'ok' });
}
