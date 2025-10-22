'use client';
import CustomCard from '@/components/common/CustomCard';
import { FetchMyAsset } from '@/services/reportServices';
import { useEffect, useState } from 'react';
// const data = { asset: 1234320, diff: -123500 };

export default function MyAsset() {
	const [assetData, setAssetData] = useState({
		totalBalance: 0,
		principal: 0,
		difference: 0,
		differenceRate: 0,
	});

	useEffect(() => {
		FetchMyAsset().then((d) => setAssetData(d));
	}, []);
	const diff = assetData.difference;
	return (
		<CustomCard>
			<h1 className="text-xl font-medium pb-1">MY 자산</h1>
			<p className="pb-2 text-xl font-medium">
				<b className="text-3xl font-semibold">
					{assetData.totalBalance.toLocaleString()}
				</b>{' '}
				원
			</p>
			<span>
				총 투자금에서{' '}
				{diff >= 0 ? (
					<b className="font-medium text-[#FB2D42]">
						<b className="text-xs">▲ </b>
						{diff.toLocaleString()}원 늘었어요
					</b>
				) : (
					<b className="font-medium text-[#2D78FA]">
						<b className="text-xs">▼ </b>
						{(-diff).toLocaleString()}원 줄었어요
					</b>
				)}
			</span>
		</CustomCard>
	);
}
