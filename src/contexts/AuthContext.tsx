'use client';
import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { fetchGetLoginToken } from '@/services/authService';

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
	// 테스트용으로 항상 인증된 상태로 설정
	const [user, setUser] = useState<User | null>({
		id: 'test',
		name: 'Test User',
	});
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const login = async (id: string, password: string): Promise<boolean> => {
		try {
			const response = await fetchGetLoginToken(id, password);
			// localStorage.setItem('accessToken', response.tokenResponse.accessToken);
			// localStorage.setItem('refreshToken', response.tokenResponse.refreshToken);

			console.log('refreshToken', response.tokenResponse.refreshToken);
			console.log('accessToken', response.tokenResponse.accessToken);
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
