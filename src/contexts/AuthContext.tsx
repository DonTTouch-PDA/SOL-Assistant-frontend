'use client';
import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
	id: string;
	name: string;
}

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	login: (id: string, password: string) => Promise<boolean>;
	isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	// 페이지 로드 시 로그인 상태 확인
	useEffect(() => {
		const checkAuth = async () => {
			try {
				const token = localStorage.getItem('auth_token');
				if (token) {
					// 토큰이 있으면 사용자 정보 가져오기
					const response = await fetch('/api/v1/internal/member/login', {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});

					if (response.ok) {
						const userData = await response.json();
						setUser(userData);
					} else {
						// 토큰이 유효하지 않으면 제거
						localStorage.removeItem('auth_token');
					}
				}
			} catch (error) {
				console.error('인증 확인 실패:', error);
				localStorage.removeItem('auth_token');
			} finally {
				setIsLoading(false);
			}
		};

		checkAuth();
	}, []);

	const login = async (id: string, password: string): Promise<boolean> => {
		try {
			const response = await fetch('/api/v1/internal/member/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id, password }),
			});

			if (response.ok) {
				const data = await response.json();
				localStorage.setItem('auth_token', data.token);
				setUser(data.user);
				return true;
			}
			return false;
		} catch (error) {
			console.error('로그인 실패:', error);
			return false;
		}
	};

	const isAuthenticated = !!user;

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoading,
				login,
				isAuthenticated,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
