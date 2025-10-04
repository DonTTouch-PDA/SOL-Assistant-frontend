'use client';
import CustomCard from '@/components/common/customCard';
import { Chart, DoughnutController, ArcElement, Legend } from 'chart.js';
import { useEffect, useRef } from 'react';
const data = {
	labels: ['헬스케어', '에너지', '정보기술'],
	datasets: [
		{
			data: [60, 25, 15],
			backgroundColor: ['#0040E8', '#4C7DFF', '#B3C8FF'],
		},
	],
};

Chart.register(ArcElement, DoughnutController, Legend);

export default function SectorsCircle() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const ctx = canvasRef.current?.getContext('2d');
		if (!ctx) return;

		const chart = new Chart(ctx, {
			type: 'doughnut',
			data: data,
			options: {
				responsive: false,
				plugins: { legend: { display: false } },
			},
		});
		return () => chart.destroy();
	}, []);

	return (
		<CustomCard>
			<p className="pb-5 font-medium text-xl">
				<b className="font-semibold text-blue-700">{data.labels.length}</b>개
				섹터의 주식을 보유하고 있어요
			</p>
			<div className="flex items-center justify-around">
				<canvas ref={canvasRef} height={100} width={100} />
				<div className="flex flex-col gap-2 text-sm">
					{data.labels.map((label, i) => (
						<div key={i} className="flex items-center gap-2">
							<div
								className="w-2.5 h-2.5 rounded-full"
								style={{ backgroundColor: data.datasets[0].backgroundColor[i] }}
							/>
							<span className="text-black font-medium">
								{label}{' '}
								<span className="text-[#9A9FA4] font-medium">
									({data.datasets[0].data[i]}%)
								</span>
							</span>
						</div>
					))}
				</div>
			</div>
		</CustomCard>
	);
}
