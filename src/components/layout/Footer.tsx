// src/components/layout/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';

const tabs = [
	{ href: '/main/dashboard', label: '홈' },
	{ href: '/main/symbols', label: '현재가' },
	{ href: '/main/order', label: '주문' },
	// { href: '/menu', label: '메뉴' },
];

export default function Footer() {
	return (
		<nav className="fixed bottom-0 border-t border-gray-200 bg-white w-full h-[58px] max-w-[430px] left-1/2 transform -translate-x-1/2 z-50">
			<div className="flex justify-between items-center">
				<ul className="flex px-8 gap-10 pb-2">
					{tabs.map((tab) => (
						<li key={tab.href}>
							<Link
								href={tab.href}
								className="text-gray-500 font-medium text-sm"
							>
								{tab.label}
							</Link>
						</li>
					))}
				</ul>
				<Link href="/menu">
					<Image src="/menu.jpg" alt="메뉴" height={58} width={58} />
				</Link>
			</div>
		</nav>
	);
}
