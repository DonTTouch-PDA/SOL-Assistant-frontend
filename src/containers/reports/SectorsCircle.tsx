'use client';
import CustomCard from '@/components/common/CustomCard';
import { FetchCircleChartData } from '@/services/reportServices';
import { Chart, DoughnutController, ArcElement, Legend } from 'chart.js';
import { useEffect, useMemo, useRef, useState } from 'react';
// const data = {
// 	labels: ['헬스케어', '에너지', '정보기술'],
// 	datasets: [
// 		{
// 			data: [60, 25, 15],
// 			backgroundColor: ['#0040E8', '#4C7DFF', '#B3C8FF'],
// 		},
// 	],
// };

Chart.register(ArcElement, DoughnutController, Legend);

export default function SectorsCircle() {
	const [circleData, setCircleData] = useState<{
		sectorNames: string[];
		percentages: number[];
	}>({ sectorNames: [], percentages: [] });

	useEffect(() => {
		// setCircleData({
		// 	sectorNames: ['커뮤니케이션', '2', '3', '4', '5'],
		// 	percentages: [40, 40, 10, 10, 10],
		// });
		FetchCircleChartData().then((d) => setCircleData(d));
	}, []);

	const data = useMemo(() => {
		if (!circleData?.sectorNames?.length) return { labels: [], datasets: [] };

		let labels = [...circleData.sectorNames];
		let values = [...circleData.percentages];

		const baseColors5 = [
			'#1539CB', // 1
			'#0040E8', // 2
			'#005DF9', // 3
			'#94ABFA', // 4
			'#B3C8FF', // 5
		];
		const baseColorsEtc = [
			'#0040E8',
			'#005DF9',
			'#94ABFA',
			'#B3C8FF',
			'#D7DDEE',
		];

		// 6개 이상이면 앞 4개 + 기타
		if (labels.length > 5) {
			const mainLabels = labels.slice(0, 4);
			const mainValues = values.slice(0, 4);
			const etcValue = values.slice(4).reduce((sum, v) => sum + v, 0);

			labels = [...mainLabels, '기타'];
			values = [...mainValues, etcValue];
		}

		const colors =
			circleData.sectorNames.length > 5
				? baseColorsEtc
				: baseColors5.slice(0, labels.length);

		return {
			labels,
			datasets: [
				{
					data: values,
					backgroundColor: colors,
				},
			],
		};
	}, [circleData]);

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
	}, [data]);

	return (
		<CustomCard>
			<p className="pb-5 font-medium text-xl">
				<b className="font-semibold text-blue-700">
					{circleData?.percentages.length}
				</b>
				개 섹터의 주식을 보유하고 있어요
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
