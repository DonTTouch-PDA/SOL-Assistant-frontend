'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import LoginFormComponent from '@/components/auth/LoginFormComponent';

export default function LoginContainer() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		username: '',
		password: '',
		rememberMe: false,
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSubmit = () => {
		if (!formData.username || !formData.password) {
			return;
		}

		// 로그인 로직 (임시로 성공으로 처리)
		console.log('로그인 시도:', formData);

		// 로그인 성공 시 대시보드 페이지로 이동
		router.push('/dashboard');
	};

	const isFormValid =
		formData.username.trim() !== '' && formData.password.trim() !== '';

	return (
		<div className="h-full bg-white pb-[34px] flex flex-col">
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

				<LoginFormComponent
					formData={formData}
					onInputChange={handleInputChange}
					onSubmit={handleSubmit}
					isFormValid={isFormValid}
				/>
			</div>
		</div>
	);
}
