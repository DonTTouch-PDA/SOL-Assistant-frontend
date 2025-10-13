import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProtectedRoute from '@/containers/auth/ProtectedRoute';

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ProtectedRoute>
			<div className="h-full w-full bg-white mb-[58px]">
				<Header />
				<main>{children}</main>
				<Footer />
			</div>
		</ProtectedRoute>
	);
}
