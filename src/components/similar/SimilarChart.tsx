import {
	Chart,
	LineController,
	LineElement,
	PointElement,
	LinearScale,
	Title,
	CategoryScale,
	Legend,
	Tooltip,
} from 'chart.js';
import { useRef, useEffect } from 'react';

interface SimilarChartData {
	stockName: string;
	trendPastScaled: TrendData[];
	trendToday: TrendData[];
}
interface TrendData {
	offset: number;
	Close: number;
	ScaledClose?: number;
}

interface SimilarChartProps {
	data: SimilarChartData;
	today: Date;
}

Chart.register(
	LineController,
	LineElement,
	PointElement,
	LinearScale,
	Title,
	CategoryScale,
	Legend,
	Tooltip
);

export default function SimilarChart({ data, today }: SimilarChartProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const getDateLabels = (today: Date) => {
		const labels: string[] = [];

		for (let i = -15; i <= 15; i++) {
			today.setDate(today.getDate() + i);

			const formatted = `${today.getMonth() + 1}/${today.getDate()}`;
			labels.push(formatted);
		}
		return labels;
	};

	useEffect(() => {
		const ctx = canvasRef.current?.getContext('2d');
		if (!ctx) return;

		const chart = new Chart(ctx, {
			data: {
				datasets: [
					{
						type: 'line',
						label: '오늘',
						data: data.trendToday.map((item) => item.Close),
						borderColor: '#2A3FEC',
						pointStyle: '',
					},
					{
						type: 'line',
						label: '과거',
						data: data.trendPastScaled.map((item) => item.ScaledClose),
						borderColor: '#C1C1C1',
					},
				],
				labels: getDateLabels(today),
			},
		});
		return () => chart.destroy();
	}, []);
	return (
		<>
			<canvas ref={canvasRef} />
		</>
	);
}
