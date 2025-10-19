'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { setStockCodeToLocalStorage } from '@/utils/stockCodeStorage';
import searchStock from '@/services/search';

export default function Search() {
	const router = useRouter();
	const [keyword, setKeyword] = useState('');
	const [result, setResult] = useState<{ stockName: string; symbol: string }[]>(
		[]
	);

	useEffect(() => {
		if (!keyword.trim()) {
			setResult([]);
			return;
		}

		const timer = setTimeout(() => {
			searchStock(keyword).then((res) => {
				setResult(res || []);
			});
		}, 300);

		return () => clearTimeout(timer);
	}, [keyword]);

	// const dummyResult = [
	// 	{ stock: '삼성전자', code: '005930' },
	// 	{ stock: '한화에어로스페이스', code: '012450' },
	// ];

	// useEffect(() => {
	// 	searchStock(keyword).then((res) => {
	// 		if (res.length > 0) {
	// 			setResult(res);
	// 		}
	// 	});
	// }, [keyword]);

	return (
		<>
			{/* 검색창 */}
			<div className="flex gap-3 border-b border-gray-600 pb-3 -mx-6 px-6 mb-3">
				<Image
					src="/arrow-left.svg"
					alt="back"
					width={30}
					height={30}
					onClick={() => {
						router.back();
					}}
				/>
				<input
					type="text"
					placeholder="주식을 검색하세요"
					autoFocus
					className="focus:outline-none text-lg"
					onChange={(e) => {
						// setKeyword(e.target.value);
						// searchStock(keyword).then((res) => {
						// 	if (res.length > 0) {
						// 		setResult(res);
						// 	}
						// });
						setKeyword(e.target.value);
					}}
				></input>
			</div>
			{/* 검색결과목록 */}
			<div>
				{result.map((data) => (
					<div
						key={data.stockName}
						onClick={() => {
							setStockCodeToLocalStorage(data.symbol);
							router.push(`/${data.symbol}`);
						}}
					>
						<div className="grid grid-cols-[1fr_3fr_1fr] py-3.5">
							<span className="text-sm text-gray-500">국내주식</span>
							<span>{data.stockName}</span>
							<span></span>
						</div>
						<div className="w-[100%]  border-[0.5px] border-[#EEEEEE]" />
					</div>
				))}
			</div>
		</>
	);
}
