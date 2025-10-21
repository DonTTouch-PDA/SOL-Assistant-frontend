import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import localFont from 'next/font/local';
import RecentMenuListener from './recent-menu-listener';

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
					content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
				/>
			</head>
			<body className={`flex justify-center ${pretendard.variable}`}>
				<div className="w-full bg-gray-100 flex justify-center min-h-screen">
					<div className="w-full bg-white max-w-[430px] min-w-[375px] min-h-screen px-[22px] pt-[22px] overflow-hidden">
						<Providers>
							<RecentMenuListener />
							{children}
						</Providers>
					</div>
				</div>
			</body>
		</html>
	);
}
