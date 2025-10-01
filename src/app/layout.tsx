import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import localFont from 'next/font/local';

export const metadata: Metadata = {
	title: 'SOL어시',
	description: 'SOL Assistant',
};

const pretendard = localFont({
	src: '../../public/fonts/PretendardVariable.woff2',
	display: 'swap',
	weight: '45 920',
	variable: '--font-pretendard',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<head>
				<meta
					name="viewport"
					content="width=375, initial-scale=1, maximum-scale=1, user-scalable=no"
				/>
			</head>
			<body className={`flex justify-center ${pretendard.variable}`}>
				<div className=" justify-center max-w-[540px] min-w-[375px] shadow-md">
					<Providers>{children}</Providers>
				</div>
			</body>
		</html>
	);
}
