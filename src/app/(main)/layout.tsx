import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="h-full w-full bg-white mb-[58px]">
			<Header />
			<main>{children}</main>
			<Footer />
		</div>
	);
}
