import { StringObj } from '../types/StringObj'

export const topLid: StringObj = {
	id: '#topLid',
	start: 'M240,300.3c36-38.3,88.3-37.3,120,0',
	end: 'M240,300c36,38.3,88.3,37.3,120,0',
}

export const eyeColor: StringObj = {
	white: 'white',
	coral: 'coral',
}

export const lashGroups: { [name: string]: { [name: string]: StringObj } } = {
	lashOne: {
		y1: {
			start: '277.5',
			end: '328',
		},
		y2: {
			start: '268',
			end: '337.5',
		},
	},
	lashTwo: {
		y1: {
			start: '259.5',
			end: '343.5',
		},
		y2: {
			start: '246.5',
			end: '356.5',
		},
	},
	lashThree: {
		y1: {
			start: '253.5',
			end: '365',
		},
		y2: {
			start: '239.5',
			end: '351',
		},
	},
	lashFour: {
		y1: {
			start: '261.5',
			end: '345',
		},
		y2: {
			start: '248.8',
			end: '358',
		},
	},
	lashFive: {
		y1: {
			start: '276.5',
			end: '328.5',
		},
		y2: {
			start: '267',
			end: '339',
		},
	},
}