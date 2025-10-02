// src/components/layout/Footer.tsx
import Link from 'next/link';

const tabs = [
	{ href: '/main/dashboard', label: '홈' },
	{ href: '/main/symbols', label: '현재가' },
	{ href: '/main/order', label: '주문' },
	{ href: '/menu', label: '메뉴' },
];

export default function Footer() {
	return (
		<nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 border-t border-gray-200 bg-white max-w-[540px] min-w-[375px] ">
			<ul className="flex justify-around py-2">
				{tabs.map((tab) => (
					<li key={tab.href}>
						<Link href={tab.href} className="text-sm">
							{tab.label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
