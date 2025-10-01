'use client';

import { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import CustomButton from '@/components/common/custombutton';
import InputBox from '@/components/auth/InputBox';

export default function LoginFormClient() {
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

		// 로그인 성공 시 guru 페이지로 이동
		redirect('/guru');
	};

	const isFormValid =
		formData.username.trim() !== '' && formData.password.trim() !== '';

	return (
		<div className="flex-1 flex flex-col justify-between">
			<div className="space-y-4">
				<InputBox
					name="username"
					type="text"
					placeholder="ID"
					value={formData.username}
					onChange={handleInputChange}
				/>

				<InputBox
					name="password"
					type="password"
					placeholder="접속 비밀번호"
					value={formData.password}
					onChange={handleInputChange}
				/>

				<div className="flex items-center">
					<input
						type="checkbox"
						id="saveId"
						name="rememberMe"
						checked={formData.rememberMe}
						onChange={handleInputChange}
						className="w-4 h-4 bg-blue-500 border-blue-500 rounded text-white"
					/>
					<label htmlFor="saveId" className="ml-2 text-black text-sm">
						ID 저장
					</label>
				</div>
			</div>

			<CustomButton
				onClick={handleSubmit}
				text="로그인"
				disabled={!isFormValid}
			/>
		</div>
	);
}
