/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/containers/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				// Yellow/Orange 팔레트
				yellow: {
					100: '#FFF9E8',
					200: '#FFF6D1',
					300: '#FFEDBD',
					400: '#FEE580',
					500: '#FEDA4A',
					600: '#FFD15B',
					700: '#F5C342',
					800: '#F1B33D',
					900: '#EA9635',
				},
				// Red 팔레트
				red: {
					100: '#FFF2F2',
					200: '#FFDDDD',
					300: '#FFA9A9',
					400: '#F07E7E',
					500: '#DE4141',
					600: '#D61111',
					700: '#C10F0F',
					800: '#AB0E0E',
					900: '#861E17',
				},
				// Green 팔레트
				green: {
					100: '#ECFDFC',
					200: '#CDF9F6',
					300: '#A7F4EF',
					400: '#81EFE8',
					500: '#71E3DC',
					600: '#57CEC7',
					700: '#19B4AA',
					800: '#1A9B9E',
					900: '#0C7076',
				},
				// Blue 팔레트
				blue: {
					100: '#E6EDFF',
					200: '#B3C8FF',
					300: '#94ABFA',
					400: '#4C7DFF',
					500: '#005DF9',
					600: '#0046FF',
					700: '#0040E8',
					800: '#293FEB',
					900: '#102FA8',
				},
			},
		},
	},
	plugins: [],
};
