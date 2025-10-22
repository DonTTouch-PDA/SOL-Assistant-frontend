'use client';
import {
	createContext,
	useState,
	useEffect,
	ReactNode,
	useCallback,
} from 'react';
import { useRouter } from 'next/navigation';
import { postLoginToken, getUserData } from '@/services/authService';
import { UserData } from '@/types/auth';

import {
	setAccessToken,
	setRefreshToken,
	getAccessToken,
	setUserId,
	removeUserId,
	getUserId,
} from '@/utils/tokenStorage';

interface AuthContextType {
	isLoading: boolean;
	login: (
		id: string,
		password: string,
		rememberId?: boolean
	) => Promise<boolean>;
	isAuthenticated: boolean;
	isInitialized: boolean;
	logout: () => void;
	getUserId: () => string | null;
	userData: UserData | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [isLoading, setIsLoading] = useState(true); // 초기값을 true로 변경
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isInitialized, setIsInitialized] = useState(false);
	const [userData, setUserData] = useState<UserData | null>(null);
	const router = useRouter();

	const logout = useCallback(() => {
		sessionStorage.removeItem('accessToken');
		sessionStorage.removeItem('refreshToken');
		removeUserId(); // 사용자 ID를 로컬 스토리지에서 제거
		setUserData(null);
		setIsAuthenticated(false);
	}, []);

	useEffect(() => {
		const initializeAuth = async () => {
			const accessToken = getAccessToken();
			if (accessToken) {
				setIsAuthenticated(true);
				try {
					const user = await getUserData();
					setUserData(user);
				} catch (error) {
					console.error('사용자 데이터 로드 실패:', error);
					logout();
				}
			}
			setIsInitialized(true);
			setIsLoading(false);
		};
		initializeAuth();
	}, [logout]);

	const login = async (
		id: string,
		password: string,
		rememberId: boolean = false
	): Promise<boolean> => {
		try {
			const response = await postLoginToken(id, password);
			setAccessToken(response.tokenResponse.accessToken);
			setRefreshToken(response.tokenResponse.refreshToken);

			// 체크박스가 체크된 경우에만 사용자 ID를 로컬 스토리지에 저장
			if (rememberId) {
				setUserId(id);
			}

			setIsAuthenticated(true);
		} catch (error) {
			console.error('로그인 실패:', error);
			return false;
		}

		try {
			const user = await getUserData();
			setUserData(user);
			console.log(user);
		} catch (error) {
			console.error('사용자 데이터 로드 실패:', error);
			return false;
		}
		return true;
	};

	return (
		<AuthContext.Provider
			value={{
				isLoading,
				userData,
				login,
				isAuthenticated,
				isInitialized,
				logout,
				getUserId,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
