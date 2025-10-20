export interface news {
	date: string;
	journal: string;
	title: string;
	url: string;
	imgUrl?: string;
}

export interface newsList {
	sector: string;
	emotion: string;
	summary: string;
	newsList: news[];
}
