import { v4 as uuid } from 'uuid';

export interface Schema {
  id: string;
  key: string;
  type: string;
  name: string;
  year: string;
  description: string[];
  altText: string;
  hasImages: boolean;
  link?: string;
}

export interface ProjectSchema {
  name: string;
  year: string;
  description: string[];
  link: string;
  hasImages: boolean;
  altText: string;
}

enum EXPANDED_STATE_KEYS {
  MAIN = 'main',
  WORKS = 'works',
  SOCIALS = 'socials',
}

enum IMAGE_ROOTS {
  ART = 'art',
  PROFESSIONAL = 'professional',
}

enum IMAGE_KV {
  hapticParadigm = 'haptic_paradigm',
  alphaDecay = 'alpha_decay',
  optimizedLivingSpaces = 'optimized_living_spaces',
  cdkGlobal = 'cdk_global',
  trendCapital = 'trend_capital',
}

const WORKS_LIST: Schema[] = [
  {
    id: uuid(),
    key: IMAGE_KV.hapticParadigm,
    type: IMAGE_ROOTS.ART,
    name: 'Haptic Paradigm',
    year: '2020',
    description: [
      `Haptic Paradigm is an ongoing curatorial and artistic collaboration with Chloe Alexandra Thompson. Conceptualized by Thompson as a digital, communal, generative sound installation, Haptic Paradigm is a websocket application with a series of Node.js websocket servers with a React front end.`,
      `Haptic Paradigm takes input from one user on the website at a time, with all other visitors placed in watch mode where they can view what the controlling user is manipulating the controls on screen. This is achieved by running two Websocket servers simultaneously. The front end sends input messages to a relay server, which then turns that data around and sends it back to the front end to move the on screen controls in real time for everyone in watch mode. The data is also sent to a remote server where it is processed and fed into a MAXMSP patch to generate music, sound, and visuals. That output is then broadcast using OBS to Twitch.tv. A video player is embedded in the site so everyone can see and hear the output being produced.`,
    ],
    altText: '',
    hasImages: false,
    link: 'haptic-paradigm.com',
  },
  {
    id: uuid(),
    key: IMAGE_KV.alphaDecay,
    type: IMAGE_ROOTS.ART,
    name: 'Alpha Decay',
    year: '2013',
    description: [
      `Alpha Decay was an installation for my senior thesis at Pacific Northwest College of Art.`,
      `The complete work contains five discrete sculptures comprised of both ready made and fabricated objects, found objects, a video loop, and four framed poems printed on pearlescent archival paper.`,
    ],
    altText:
      'A room with 4 discrete sculptures and 4 poems. Each sculpture is a combination of ready made objects - such as dog beds and flat screen televisions - with some fabricated parts, such as wooden additions.',
    hasImages: true,
  },
  {
    id: uuid(),
    key: IMAGE_KV.optimizedLivingSpaces,
    type: IMAGE_ROOTS.ART,
    name: 'Optimized Living Spaces #1',
    year: '2012',
    description: [`Acrylic paint, screen print, and graphite on BFK Rives paper.`],
    altText:
      'A mixed media art work with silk screen, acrylic paint, and pencil on paper. Depicts an abstract geometric shape in marbled texture and a drawing of a twin bed.',
    hasImages: true,
  },
  {
    id: uuid(),
    key: IMAGE_KV.cdkGlobal,
    type: IMAGE_ROOTS.PROFESSIONAL,
    name: 'CDK Global',
    year: `2020-${new Date().getFullYear()}`,
    description: [
      `CDK Global is an integrated software solutions company that specializes in the auto dealership and construction industries. My role here is to work on building API’s in both Java and JavaScript using Spring and Node.js respectively, as well as writing components in React for a payment gateway integration UI.`,
    ],
    altText: '',
    hasImages: false,
    link: 'www.cdkglobal.com',
  },
  {
    id: uuid(),
    key: IMAGE_KV.trendCapital,
    type: IMAGE_ROOTS.PROFESSIONAL,
    name: 'Trend Capital Holdings, Inc.',
    year: '2019',
    description: [
      `Trend Capital Holdings, Inc. is a financial tech company focused on lead generation, connecting small lenders with people in financial need. My time was focused primarily on the creation of an engine capable of generating static websites from templates and the creation of an anti-corruption API layer between the client and server.`,
    ],
    altText: 'Screen shots from three websites I worked on while employed by Trend Capital',
    hasImages: true,
    link: 'trendcapital.com',
  },
];

const IMAGE_SIZE_DEFAULTS: string[] = ['500', '750', '864'];
const MONTHS: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export { EXPANDED_STATE_KEYS, IMAGE_KV, IMAGE_ROOTS, WORKS_LIST, IMAGE_SIZE_DEFAULTS, MONTHS };
