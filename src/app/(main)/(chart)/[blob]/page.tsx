import ChartContainer from '@/containers/myStocks/ChartContainer';

interface PageProps {
	params: {
		blob: string;
	};
}

export default function ChartPage({ params }: PageProps) {
	return <ChartContainer stockCode={params.blob} />;
}
