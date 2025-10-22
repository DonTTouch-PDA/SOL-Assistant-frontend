import StockInfoHeader from '@/containers/chart/StockInfoHeader';
import { StockProvider } from '@/contexts/StockContext';

export default function ChartLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<StockProvider>
			<div className="relative h-full pt-[50px]">
				<StockInfoHeader />
				{children}
			</div>
		</StockProvider>
	);
}
