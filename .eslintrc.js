const path = require('path');

module.exports = {
	ignorePatterns: ['.eslintrc.js'],
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
		'sort-imports-es6-autofix',
	],
	extends: [
		'react-app',
		'react-app/jest',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: path.join(__dirname, 'tsconfig.json'),
		sourceType: 'module',
		ecmaVersion: 2021,
		ecmaFeatures: {
			jsx: false,
		},
	},
	rules: {
		'spaced-comment': [
			'error',
			'always',
		],
		indent: [
			'error',
			'tab',
		],
		'no-redeclare': 'error',
		'no-trailing-spaces': [
			'error',
			{
				'ignoreComments': true,
			},
		],
		'no-var': 'error',
		semi: [
			'error',
			'never',
		],
		eqeqeq: [
			'error',
			'smart',
		],
		'@typescript-eslint/no-inferrable-types': 'off',
		'@typescript-eslint/restrict-template-expressions': 'off',
		'no-irregular-whitespace': 'error',
		'no-empty-character-class': 'error',
		// 'sort-imports': ['error', {
		// 	'ignoreCase': true,
		// 	'memberSyntaxSortOrder': [
		// 		'single',
		// 		'multiple',
		// 		'all',
		// 		'none',],
		// 	'allowSeparatedGroups': true
		// }],
		'sort-imports-es6-autofix/sort-imports-es6': [
			'error',
			{
				ignoreCase: true,
				ignoreMemberSort: false,
				memberSyntaxSortOrder: [
					'single',
					'multiple',
					'all',
					'none',
				],
			},
		],
	},
}
