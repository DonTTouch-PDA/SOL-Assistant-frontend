import ChartContainer from '@/containers/chart/ChartContainer';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

interface PageProps {
	params: Promise<{
		blob: string;
	}>;
}

async function validateStockCode(stockCode: string): Promise<boolean> {
	try {
		const stocksPath = path.join(process.cwd(), 'public', 'stocks.json');
		const stocksData = fs.readFileSync(stocksPath, 'utf-8');
		const stocks = JSON.parse(stocksData);

		return stocks.some(
			(stock: { symbol: string }) => stock.symbol === stockCode
		);
	} catch (error) {
		console.error('Error validating stock code:', error);
		return false;
	}
}

export default async function ChartPage({ params }: PageProps) {
	const { blob } = await params;

	// 종목 코드 검증
	const isValidStock = await validateStockCode(blob);

	if (!isValidStock) {
		return notFound();
	}

	return <ChartContainer stockCode={blob} />;
}
