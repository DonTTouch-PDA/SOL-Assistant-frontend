import {
	getAccessToken,
	getRefreshToken,
	setAccessToken,
} from '@/utils/tokenStorage';

class ApiClient {
	async request(url: string, options: RequestInit = {}) {
		const accessToken = getAccessToken();

		// 토큰이 있으면 헤더에 추가
		if (accessToken) {
			options.headers = {
				...options.headers,
				Authorization: `Bearer ${accessToken}`,
			};
		}

		let response = await fetch(url, options);

		// 토큰 오류 시 재발급 시도
		if (response.status === 401) {
			console.log('Token expired, attempting refresh...');
			const refreshToken = getRefreshToken();

			if (refreshToken) {
				const refreshResponse = await fetch('/api/v1/auth/reissue', {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${refreshToken}`,
					},
				});

				if (refreshResponse.ok) {
					const data = await refreshResponse.json();
					setAccessToken(data.tokenResponse.accessToken);

					// 새로운 토큰으로 원래 요청 재시도
					const newAccessToken = getAccessToken();
					response = await fetch(url, {
						...options,
						headers: {
							...options.headers,
							Authorization: `Bearer ${newAccessToken}`,
						},
					});
				} else {
					// 토큰 갱신 실패 시 로그인 페이지로 이동
					console.log('토큰 갱신 실패, 로그인 페이지로 이동');
					window.location.href = '/login';
					throw new Error('Authentication failed');
				}
			} else {
				// refreshToken이 없으면 로그인 페이지로 이동
				console.log('refreshToken이 없어 로그인 페이지로 이동');
				window.location.href = '/login';
				throw new Error('No refresh token');
			}
		}

		return response;
	}
}

export const apiClient = new ApiClient();
