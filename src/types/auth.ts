export interface LoginToken {
	accessToken: string;
	refreshToken: string;
}

export interface LoginTokenResponse {
	tokenResponse: LoginToken;
}
