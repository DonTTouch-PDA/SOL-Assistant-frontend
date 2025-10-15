'use client';
import CustomCard from '@/components/common/CustomCard';
import Image from 'next/image';
const data = { holding: 23, percentile: 80 };

export default function StockHolding() {
	return (
		<CustomCard>
			<div className="flex flex-col items-center gap-5 pb-4">
				<h2 className="text-xl font-medium">
					평균{' '}
					<b className="text-2xl font-semibold text-blue-700">{data.holding}</b>
					일간 주식을 보유했어요
				</h2>

				<div className="relative">
					<div className="animate-reveal">
						<Image
							src="/HoldingGraph.svg"
							width={200}
							height={100}
							alt="graph"
						/>
					</div>

					<div className="relative mt-2">
						<span className="flex justify-between text-gray-500 text-xs">
							<p>단기</p>
							<p>장기</p>
						</span>

						<div
							className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
							style={{
								left: `calc(${85 - data.percentile * 0.7}%)`,
							}}
						>
							<p className="text-[8px] pt-5">▲</p>
							<p className="text-xs">
								상위{' '}
								<b className=" text-blue-700 font-semibold">
									{data.percentile}
								</b>
								%
							</p>
						</div>
					</div>
				</div>
			</div>
			<style jsx>{`
				@keyframes reveal {
					0% {
						clip-path: inset(0 100% 0 0);
					}
					100% {
						clip-path: inset(0 0 0 0);
					}
				}
				.animate-reveal {
					animation: reveal 0.6s ease-out forwards;
				}
			`}</style>
		</CustomCard>
	);
}
