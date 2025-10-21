//@ts-ignore
import ColorThief from 'color-thief-browser';

export async function getDominantColorFromStockCode(
	stockCode: string
): Promise<string> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = 'Anonymous'; // CORS 문제 방지
		img.src = `https://static.toss.im/png-icons/securities/icn-sec-fill-${stockCode}.png`;

		img.onload = () => {
			try {
				const colorThief = new ColorThief();
				const color = colorThief.getColor(img); // [R, G, B]
				const [r, g, b] = color;
				const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b)
					.toString(16)
					.slice(1)
					.toUpperCase()}`;
				resolve(hex);
			} catch (err) {
				reject(err);
			}
		};

		img.onerror = (err) => reject(err);
	});
}
