import fs from 'fs';
import path from 'path';

const LOG_FILE = path.join(process.cwd(), 'tmp', 'chart-logs.jsonl');

// 로그 수집 엔드포인트
export async function POST(req: Request) {
	const body = await req.json();

	const logEntry = {
		userId: body.userId,
		stockId: body.stockId,
		deltaScore: body.deltaScore,
		eventTime: body.eventTime,
	};

	// public/stocks.json 매핑으로 stockId 변경하기
	const stocks = JSON.parse(
		fs.readFileSync(path.join(process.cwd(), 'public', 'stocks.json'), 'utf-8')
	);
	const stock = stocks.find(
		(stock: { stockId: string; symbol: string }) =>
			stock.symbol === body.stockId
	);
	if (!stock) {
		return Response.json(
			{ status: 'error', message: 'Stock not found' },
			{ status: 404 }
		);
	}
	logEntry.stockId = stock.stockId;

	// JSONL 형태로 저장 (줄 단위)
	fs.appendFileSync(LOG_FILE, JSON.stringify(logEntry) + '\n', 'utf-8');
	return Response.json({ status: 'ok' });
}
