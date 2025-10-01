export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div
			className="min-h-screen bg-white"
			style={{
				width: 'var(--mobile-container-width)',
				margin: '20px 22px 0 22px',
			}}
		>
			{children}
		</div>
	);
}
