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
				destination: 'https://sol-assistant.site/api/v1/:path*',
			},
		];
	},
};

export default nextConfig;
