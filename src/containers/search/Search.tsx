'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Search() {
	const router = useRouter();
	const [keyword, setKeyword] = useState('');
	const [result, setResult] = useState([]);

	const dummyResult = [
		{ stock: '삼성전자', code: '005230' },
		{ stock: '한화에어로스페이스', code: '012450' },
	];

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
						setKeyword(e.target.value);
						setResult(dummyResult);
					}}
				></input>
			</div>
			{/* 검색결과목록 */}
			<div>
				{result.map((data) => (
					<div key={data.stock}>
						<div className="grid grid-cols-[1fr_3fr_1fr] py-3.5">
							<span className="text-sm text-gray-500">국내주식</span>
							<span>{data.stock}</span>
							<span>
								<button
									onClick={() => {
										router.push(`/${data.code}`);
									}}
									className="border px-2 py-0.5 rounded-sm text-sm text-gray-500"
								>
									현재가
								</button>
							</span>
						</div>
						<div className="w-[100%]  border-[0.5px] border-[#EEEEEE]" />
					</div>
				))}
			</div>
		</>
	);
}
