export const getAccessToken = () => {
	return sessionStorage.getItem('accessToken');
};

export const getRefreshToken = () => {
	return sessionStorage.getItem('refreshToken');
};

export const setAccessToken = (accessToken: string) => {
	sessionStorage.setItem('accessToken', accessToken);
};

export const setRefreshToken = (refreshToken: string) => {
	sessionStorage.setItem('refreshToken', refreshToken);
};

// 사용자 ID 관련 함수들
export const getUserId = () => {
	return localStorage.getItem('userId');
};

export const setUserId = (userId: string) => {
	localStorage.setItem('userId', userId);
};

export const removeUserId = () => {
	localStorage.removeItem('userId');
};
