import StockTab from '@/components/layout/StockTab';
import StockInfoHeader from '@/containers/chart/StockInfoHeader';

export default function ChartLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="relative h-full pt-[50px]">
			<StockInfoHeader />
			{children}
		</div>
	);
}
