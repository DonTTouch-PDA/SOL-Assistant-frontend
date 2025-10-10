// 로그인 페이지 인풋 박스

interface InputBoxProps {
	name: string;
	type: 'text' | 'password';
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputBox({
	name,
	type,
	placeholder,
	value,
	onChange,
}: InputBoxProps) {
	return (
		<input
			type={type}
			name={name}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 mb-4"
		/>
	);
}
