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
