import DashboardTab from '@/components/layout/DashboardTab';

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="pt-[50px]">
			<DashboardTab />
			{children}
		</div>
	);
}
