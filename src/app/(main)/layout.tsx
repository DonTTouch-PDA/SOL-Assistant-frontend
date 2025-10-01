import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-screen bg-white px-6">
			<Header />
			<main className="pb-16">{children}</main>
			<Footer />
		</div>
	);
}
