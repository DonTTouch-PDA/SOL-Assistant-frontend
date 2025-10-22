'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginFormComponent from '@/components/auth/LoginFormComponent';
import { useAuth } from '@/hooks/useAuth';
import { setStockCodeToLocalStorage } from '@/utils/stockCodeStorage';
import { getUserId } from '@/utils/tokenStorage';

export default function LoginContainer() {
	const router = useRouter();
	const { login, isAuthenticated } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	// 이미 로그인되어 있으면 대시보드로 리다이렉트
	useEffect(() => {
		if (isAuthenticated) {
			router.replace('/dashboard');
		}
	}, [isAuthenticated, router]);

	const [formData, setFormData] = useState({
		authId: '',
		password: '',
		rememberId: false,
	});

	// 컴포넌트 마운트 시 저장된 아이디 불러오기
	useEffect(() => {
		const savedId = getUserId();
		if (savedId) {
			setFormData((prev) => ({
				...prev,
				authId: savedId,
				rememberId: true,
			}));
		}
	}, []);

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
			const success = await login(
				formData.authId,
				formData.password,
				formData.rememberId
			);

			if (success) {
				// 로그인 성공 시 아이디 저장 처리 (AuthContext에서 이미 처리됨)
				// 추가적인 로컬 스토리지 처리는 필요 없음

				// 로그인 성공 시 대시보드 페이지로 이동
				setStockCodeToLocalStorage('005930');
				router.replace('/dashboard');
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
		<div className="h-full bg-white py-[34px] flex flex-col">
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
