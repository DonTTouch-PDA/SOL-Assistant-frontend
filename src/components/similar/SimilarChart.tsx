import { TrendData, TrendPastScaled } from '@/types/similar';
import {
	Chart,
	LineController,
	LineElement,
	PointElement,
	LinearScale,
	Title,
	CategoryScale,
	Legend,
	ScriptableScaleContext,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { useRef, useEffect } from 'react';

interface SimilarChartData {
	stockName: string;
	trendPastScaled: TrendPastScaled[];
	trendToday: TrendData[];
	todayDate: string;
	pastDate: string;
}

interface SimilarChartProps {
	data: SimilarChartData;
}

Chart.register(
	LineController,
	LineElement,
	PointElement,
	LinearScale,
	Title,
	CategoryScale,
	Legend,
	annotationPlugin
);

export default function SimilarChart({ data }: SimilarChartProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	//기준일 전후 15일 날짜배열 반환함수
	const getDateLabels = (today: Date) => {
		const labels: string[] = [];
		const baseDate = new Date(today);

		for (let i = -15; i <= 15; i++) {
			const d = new Date(baseDate);
			d.setDate(baseDate.getDate() + i);

			const formatted = `${d.getMonth() + 1}/${d.getDate()}`;
			labels.push(formatted);
		}

		return labels;
	};

	useEffect(() => {
		const ctx = canvasRef.current?.getContext('2d');
		if (!ctx) return;

		const today = new Date(data.todayDate);
		const todayLabel = `${today.getMonth() + 1}/${today.getDate()}`;

		const chart = new Chart(ctx, {
			data: {
				datasets: [
					{
						type: 'line',
						label: `${data.todayDate.slice(0, 10)}`,
						data: data.trendToday.map((item) => item.Close),
						borderColor: '#2A3FEC',
						pointRadius: 0,
					},
					{
						type: 'line',
						label: `${data.pastDate.slice(0, 10)}`,
						data: data.trendPastScaled.map((item) => item.ScaledClose),
						borderColor: '#C1C1C1',
						pointRadius: 0,
					},
				],
				labels: getDateLabels(new Date(data.todayDate)),
			},
			options: {
				plugins: {
					legend: {
						labels: {
							font: {
								size: 10,
							},
							boxHeight: 0,
						},
						align: 'end',
					},
					annotation: {
						annotations: {
							todayLine: {
								type: 'line',
								xMin: todayLabel,
								xMax: todayLabel,
								borderColor: '#2A3FEC',
								borderWidth: 2,
								borderDash: [4, 4],
								label: {
									content: '기준일',
									position: 'start',
									backgroundColor: 'rgba(255,91,91,0.1)',
									color: '#FF5B5B',
									font: { size: 9 },
								},
							},
						},
					},
				},
				scales: {
					x: {
						grid: {
							display: false,
						},
						ticks: {
							font: { size: 10, weight: 500 },
							color: (ctx: ScriptableScaleContext) => {
								const label = ctx.tick.label as string;
								return label === todayLabel ? '#2A3FEC' : '#777';
							},
							autoSkip: true,
							maxTicksLimit: 7,
						},
					},
					y: {
						grid: {
							display: false,
						},
						ticks: {
							font: {
								size: 10,
							},
							autoSkip: true,
							maxTicksLimit: 7,
						},
					},
				},
				responsive: true,
				maintainAspectRatio: false,
			},
		});
		return () => chart.destroy();
	}, [
		data.stockName,
		data.todayDate,
		data.pastDate,
		data.trendToday,
		data.trendPastScaled,
	]);
	return (
		<>
			<canvas ref={canvasRef} />
		</>
	);
}
