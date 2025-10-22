export interface LoginToken {
	accessToken: string;
	refreshToken: string;
}

export interface LoginTokenResponse {
	tokenResponse: LoginToken;
}

export interface UserData {
	id: string;
	investmentType: string;
	name: string;
}
