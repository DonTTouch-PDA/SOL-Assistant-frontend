import { LoginTokenResponse, UserData } from '@/types/auth';
import { getAccessToken, getRefreshToken } from '@/utils/tokenStorage';
import { apiClient } from './apiClient';

export const postLoginToken = async (authId: string, password: string) => {
	try {
		const data = await fetch('/api/v1/internal/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ authId, password }),
		});

		if (!data.ok) {
			throw new Error(`HTTP error! status: ${data.status}`);
		}
		console.log('로그인 성공');
		return data.json() as Promise<LoginTokenResponse>;
	} catch (error) {
		console.error('로그인 실패:', error);
		throw error;
	}
};

export const refreshAccessToken = async () => {
	try {
		const data = await fetch('/api/v1/internal/member/reissue', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				accessToken: `${getAccessToken()}`,
				refreshToken: `${getRefreshToken()}`,
			},
		});

		if (!data.ok) {
			throw new Error(`HTTP error! status: ${data.status}`);
		}

		console.log('토큰 갱신 성공');
		return data.json() as Promise<LoginTokenResponse>;
	} catch (error) {
		console.error('토큰 갱신 실패:', error);
		throw error;
	}
};

export const getUserData = async () => {
	try {
		const data = await apiClient.request('/api/v1/internal/my-info', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!data.ok) {
			throw new Error(`HTTP error! status: ${data.status}`);
		}
		return data.json() as Promise<UserData>;
	} catch (error) {
		console.error('사용자 정보 조회 실패:', error);
		throw error;
	}
};
