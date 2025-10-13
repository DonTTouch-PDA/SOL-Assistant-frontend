import CustomButton from '@/components/common/CustomButton';
import InputBox from '@/components/auth/InputBox';

interface LoginFormComponentProps {
	formData: {
		username: string;
		password: string;
		rememberMe: boolean;
	};
	onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: () => void;
	isFormValid: boolean;
	isLoading?: boolean;
}

export default function LoginFormComponent({
	formData,
	onInputChange,
	onSubmit,
	isFormValid,
	isLoading = false,
}: LoginFormComponentProps) {
	return (
		<div className="flex-1 flex flex-col justify-between">
			<div className="space-y-4">
				<InputBox
					name="username"
					type="text"
					placeholder="ID"
					value={formData.username}
					onChange={onInputChange}
					disabled={isLoading}
				/>

				<InputBox
					name="password"
					type="password"
					placeholder="접속 비밀번호"
					value={formData.password}
					onChange={onInputChange}
					disabled={isLoading}
				/>

				<div className="flex items-center">
					<input
						type="checkbox"
						id="saveId"
						name="rememberMe"
						checked={formData.rememberMe}
						onChange={onInputChange}
						disabled={isLoading}
						className="w-4 h-4 bg-blue-500 border-blue-500 rounded text-white"
					/>
					<label htmlFor="saveId" className="ml-2 text-black text-sm">
						ID 저장
					</label>
				</div>
			</div>

			<CustomButton
				onClick={onSubmit}
				text={isLoading ? '로그인 중...' : '로그인'}
				disabled={!isFormValid || isLoading}
			/>
		</div>
	);
}
