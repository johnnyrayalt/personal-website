import { StringObj } from '../types/StringObj'

export interface Schema {
	[name: string]: {
		key: string;
		name: string;
		year: string;
		link?: string;
		description: string[];
		altText: string;
		hasImages: boolean;
	}
}

export const EXPANDED_STATE_KEYS: StringObj = {
	MAIN: 'main',
	WORKS: 'works',
	SOCIALS: 'socials',
}

export const IMAGE_KV: { [name: string]: StringObj } = {
	art: {
		hapticParadigm: 'haptic_paradigm',
		alphaDecay: 'alpha_decay',
		optimizedLivingSpaces: 'optimized_living_spaces',
	},
	professional: {
		cdkGlobal: 'cdk_global',
		trendCapital: 'trend_capital',
	},
}

export const IMAGE_ROOTS: StringObj = {
	art: 'art',
	professional: 'professional',
}

export const ART: Schema = {
	hapticParadigm: {
		key: IMAGE_KV.art.hapticParadigm,
		name: 'Haptic Paradigm',
		year: '2020',
		link: 'haptic-paradigm.com',
		description: [
			`Haptic Paradigm is an ongoing curatorial and artistic collaboration with Chloe Alexandra Thompson. Conceptualized by Thompson as a digital, communal, generative sound installation, Haptic Paradigm is a websocket application with a series of Node.js websocket servers with a React front end.`,
			`Haptic Paradigm takes input from one user on the website at a time, with all other visitors placed in watch mode where they can view what the controlling user is manipulating the controls on screen. This is achieved by running two Websocket servers simultaneously. The front end sends input messages to a relay server, which then turns that data around and sends it back to the front end to move the on screen controls in real time for everyone in watch mode. The data is also sent to a remote server where it is processed and fed into a MAXMSP patch to generate music, sound, and visuals. That output is then broadcast using OBS to Twitch.tv. A video player is embedded in the site so everyone can see and hear the output being produced.`,
		],
		altText: '',
		hasImages: false,
	},
	alphaDecay: {
		key: IMAGE_KV.art.alphaDecay,
		name: 'Alpha Decay',
		year: '2013',
		description: [
			`Alpha Decay was an installation for my senior thesis at Pacific Northwest College of Art.`,
			`The complete work contains five discrete sculptures comprised of both ready made and fabricated objects, found objects, a video loop, and four framed poems printed on pearlescent archival paper.`,
		],
		altText: 'A room with 4 discrete sculptures and 4 poems. Each sculpture is a combination of ready made objects - such as dog beds and flat screen televisions - with some fabricated parts, such as wooden additions.',
		hasImages: true,
	},
	optimizedLivingSpaces: {
		key: IMAGE_KV.art.optimizedLivingSpaces,
		name: 'Optimized Living Spaces #1',
		year: '2012',
		description: [`Acrylic paint, screen print, and graphite on BFK Rives paper.`],
		altText: 'A mixed media art work with silk screen, acrylic paint, and pencil on paper. Depicts an abstract geometric shape in marbled texture and a drawing of a twin bed.',
		hasImages: true,
	},
}

export const PROFESSIONAL: Schema = {
	cdkGlobal: {
		key: IMAGE_KV.professional.cdkGlobal,
		name: 'CDK Global',
		year: '2020-2021',
		link: 'www.cdkglobal.com',
		description: [
			`CDK Global is an integrated software solutions company that specializes in the auto dealership and construction industries. My role here is to work on building API???s in both Java and JavaScript using Spring and Node.js respectively, as well as writing components in React for a payment gateway integration UI.`,
		],
		altText: '',
		hasImages: false,
	},

	trendCapital: {
		key: IMAGE_KV.professional.trendCapital,
		name: 'Trend Capital Holdings, Inc.',
		year: '2019',
		link: 'trendcapital.com',
		description: [
			`Trend Capital Holdings, Inc. is a financial tech company focused on lead generation, connecting small lenders with people in financial need. My time was focused primarily on the creation of an engine capable of generating static websites from templates and the creation of an anti-corruption API layer between the client and server.`,
		],
		altText: 'Screen shots from three websites I worked on while employed by Trend Capital',
		hasImages: true,
	},
}

export const IMAGE_SIZE_DEFAULTS: string[] = ['500', '750', '864']
export const MONTHS: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']