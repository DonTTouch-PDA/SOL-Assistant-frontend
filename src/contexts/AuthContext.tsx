'use client';
import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { postLoginToken } from '@/services/authService';
import {
	setAccessToken,
	setRefreshToken,
	getAccessToken,
} from '@/utils/tokenStorage';

interface AuthContextType {
	isLoading: boolean;
	login: (id: string, password: string) => Promise<boolean>;
	isAuthenticated: boolean;
	isInitialized: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [isLoading, setIsLoading] = useState(true); // 초기값을 true로 변경
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isInitialized, setIsInitialized] = useState(false);
	const router = useRouter();

	useEffect(() => {
		// 앱 시작 시 토큰 확인
		const accessToken = getAccessToken();
		setIsAuthenticated(!!accessToken);
		setIsInitialized(true);
		setIsLoading(false);
	}, []);

	const login = async (id: string, password: string): Promise<boolean> => {
		try {
			const response = await postLoginToken(id, password);
			setAccessToken(response.tokenResponse.accessToken);
			setRefreshToken(response.tokenResponse.refreshToken);

			setIsAuthenticated(true);
			return true;
		} catch (error) {
			console.error('로그인 실패:', error);
			return false;
		}
	};

	return (
		<AuthContext.Provider
			value={{
				isLoading,
				login,
				isAuthenticated,
				isInitialized,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
