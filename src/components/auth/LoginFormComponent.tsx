import CustomButton from '@/components/common/CustomButton';
import InputBox from '@/components/auth/InputBox';

interface LoginFormComponentProps {
	formData: {
		authId: string;
		password: string;
		rememberId: boolean;
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
		<div className="flex-1 flex flex-col justify-between py-[30px]">
			<div className="space-y-4">
				<InputBox
					name="authId"
					type="text"
					placeholder="ID"
					value={formData.authId}
					onChange={onInputChange}
				/>

				<InputBox
					name="password"
					type="password"
					placeholder="접속 비밀번호"
					value={formData.password}
					onChange={onInputChange}
				/>

				<div className="flex items-center">
					<input
						type="checkbox"
						id="saveId"
						name="rememberId"
						checked={formData.rememberId}
						onChange={onInputChange}
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
