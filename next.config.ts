import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		domains: ['static.toss.im', 'img.hankyung.com'],
	},
	reactStrictMode: false,
	rewrites: async () => {
		return [
			{
				source: '/api/v1/:path*',
				destination: 'http://localhost:8080/api/v1/:path*',
			},
		];
	},
};

export default nextConfig;
