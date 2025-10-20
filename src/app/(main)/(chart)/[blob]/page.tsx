import ChartContainer from '@/containers/chart/ChartContainer';

interface PageProps {
	params: Promise<{
		blob: string;
	}>;
}

export default async function ChartPage({ params }: PageProps) {
	const { blob } = await params;
	return <ChartContainer stockCode={blob} />;
}
