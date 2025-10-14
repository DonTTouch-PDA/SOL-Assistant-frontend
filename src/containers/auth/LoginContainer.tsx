'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import LoginFormComponent from '@/components/auth/LoginFormComponent';
import { useAuth } from '@/hooks/useAuth';

export default function LoginContainer() {
	const router = useRouter();
	const { login } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const [formData, setFormData] = useState({
		authId: '',
		password: '',
		rememberId: false,
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
		setError('');
	};

	const handleSubmit = async () => {
		if (!formData.authId || !formData.password) {
			setError('ID와 비밀번호를 입력해주세요.');
			return;
		}

		setIsLoading(true);
		setError('');

		try {
			const success = await login(formData.authId, formData.password);

			if (success) {
				// 로그인 성공 시 대시보드 페이지로 이동
				router.push('/dashboard');
			} else {
				setError('ID 또는 비밀번호가 올바르지 않습니다.');
			}
		} catch (error) {
			setError('로그인 중 오류가 발생했습니다.');
		} finally {
			setIsLoading(false);
		}
	};

	const isFormValid =
		formData.authId.trim() !== '' && formData.password.trim() !== '';

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

				{error && (
					<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
						<p className="text-red-600 text-sm">{error}</p>
					</div>
				)}

				<LoginFormComponent
					formData={formData}
					onInputChange={handleInputChange}
					onSubmit={handleSubmit}
					isFormValid={isFormValid}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
}
