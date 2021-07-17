export interface IWorkObj {
	[name: string]: string | undefined | string[] | boolean;
	key: string;
	name: string;
	year: string;
	link?: string;
	description: string[];
	altText: string;
	hasImages: boolean;
}