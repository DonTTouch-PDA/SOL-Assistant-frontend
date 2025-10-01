import { X } from 'lucide-react';
import LoginFormClient from '@/components/auth/LoginFormClient';

// 서버 컴포넌트 - 정적 부분은 SSR
export default function LoginContainer() {
	return (
		<div className="min-h-screen bg-white flex flex-col pb-30">
			<header className="flex justify-end mb-8">
				<button className="text-gray-600 text-xl">
					<X size={20} />
				</button>
			</header>

			<div className="flex-1 flex flex-col">
				<h1 className="text-xl font-bold text-black leading-tight mb-8">
					ID와 접속 비밀번호를
					<br />
					입력하세요
				</h1>

				<LoginFormClient />
			</div>
		</div>
	);
}
