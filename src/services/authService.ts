import { LoginTokenResponse } from '@/types/auth';

// response type
// {
//     "tokenResponse": {
//         "accessToken": "",
//         "refreshToken": ""
//     }
// }
export const fetchGetLoginToken = async (id: string, password: string) => {
	try {
		const data = await fetch('/api/v1/internal/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id, password }),
		});

		if (!data.ok) {
			throw new Error(`HTTP error! status: ${data.status}`);
		}

		return data.json() as Promise<LoginTokenResponse>;
	} catch (error) {
		console.error('로그인 실패:', error);
		throw error;
	}
};
