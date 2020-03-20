import { IFrontboxConfig } from './frontbox/gulp/interface'

export const configDocumentationStyle = {
	dest: 'documentation/style',
}

export const configBrowser = {
	open: false,
	host: 'localhost',
	proxy: false,
	port: 8080,
}

export const configWebsite = {
	name: 'FrontBox-CSS',
	description: 'Static WWW builder tool',
	url: 'https://github.com/BartoszPiwek/FrontBox-CSS',
	locale: 'pl-PL',
	color: '#e7be54',
	author: 'Bartosz Piwek',
	info: {
		javascriptOff: true,
		usingOldBrowser: true,
	},
}

export const configProject = {
	type: null, // 'wordpress'
}

export const configFramework = {
	frameworkDevelopment: true,
	frameworkDevelopmentFiles: [
		`public`,
		`*.md`,
		`LICENSE`,
		`gitfiles`,
		'frontbox/gitfiles',
	],
}

export const configStyle: IFrontboxConfig[] = [
	{
		name: 'style',
		files: './src/style/style.scss',
		dest: '',
		watch: [
			'./src/style/style.scss',
			'./src/style/_*.scss',
			'./src/style/variables/*.scss',
			'./src/style/tools/*.scss',
			'./src/style/modules/*.scss',
			'./src/style/plugins/*.scss',
		],
	},
	{
		name: 'bootstrap',
		files: './src/style/bootstrap.scss',
		dest: 'css',
		concatWith: 'style',
		watch: [
			'./src/style/bootstrap.scss',
			'./src/style/bootstrap/*.scss',
			'./src/style/variables/*.scss',
			'./src/style/tools/*.scss',
			'./src/style/modules/*.scss',
		],
	},
	{
		name: 'utilities',
		files: './src/style/utilities.scss',
		dest: 'css',
		concatWith: 'style',
		watch: ['./src/style/utilities.scss', './src/style/utilities/*.scss'],
	},
]

export const configScript = [
	{
		name: 'app',
		files: './src/scripts/app.ts',
		dest: 'scripts',
		watch: [
			'./src/scripts/app.ts',
			'./src/scripts/app/*.ts',
			'./src/scripts/bootstrap/*.ts',
			'./src/scripts/modules/*.ts',
		],
	},
]

export const configHtml: IFrontboxConfig[] = [
	{
		name: 'main',
		files: './src/template/*.pug',
		dest: '',
		watch: ['./src/template/*.pug'],
	},
	{
		name: 'include',
		files: './src/template/*.pug',
		dest: '',
		otherTasksImpact: true,
		watch: ['./src/template/includes/*.pug'],
	},
	{
		name: 'partials',
		files: './src/template/partials/*.pug',
		dest: 'partials',
		otherTasksImpact: true,
		watch: ['./src/template/partials/*.pug'],
	},
]

export const configCopy = [
	{
		name: 'image',
		files: './src/images/**/*',
		dest: 'images',
		watch: ['./src/images/**/*'],
	},
	{
		name: 'fonts',
		files: './src/fonts/*.{eot,woff2,woff,ttf,svg}',
		dest: 'fonts',
		watch: ['./src/fonts/*.{eot,woff2,woff,ttf,svg}'],
	},
	{
		name: 'other',
		files: './src/other/*',
		dest: 'other',
		watch: ['./src/other/*'],
	},
	{
		name: 'video',
		files: './src/video/*',
		dest: 'video',
		watch: ['./src/video/*'],
	},
	{
		name: 'audio',
		files: './src/audio/*',
		dest: 'audio',
		watch: ['./src/audio/*'],
	},
]
