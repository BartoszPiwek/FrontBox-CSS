export const configDocumentationStyle = {
	dest: 'documentation/style'
}

export const configBrowser = {
	open: false,
	host: "localhost",
	proxy: false,
	port: 8080
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
		usingOldBrowser: true
	}
}

export const configProject = {
	type: null, // 'wordpress'
}

export const configFramework = {
	frameworkDevelopment: true,
	frameworkDevelopmentFiles: [`public`, `*.md`, `LICENSE`, `gitfiles`]
}

export const configHtml = {
	main: {
		files: './src/template/*.pug',
		dest: '',
		watch: [
			'./src/template/*.pug',
		]
	},
	include: {
		files: './src/template/*.pug',
		dest: '',
		watch: [
			'./src/template/includes/*.pug'
		]
	},
	partials: {
		files: './src/template/partials/*.pug',
		dest: 'partials',
		watch: [
			'./src/template/partials/*.pug'
		]
	}
}

export const configCopy = [
	{
		name: 'image',
		files: './src/images/**/*',
		dest: 'images',
		watch: [
			'./src/images/**/*',
		]
	},
	{
		name: 'fonts',
		files: './src/fonts/*.{eot,woff2,woff,ttf,svg}',
		dest: 'fonts',
		watch: [
			'./src/fonts/*.{eot,woff2,woff,ttf,svg}',
		]
	},
	{
		name: 'other',
		files: './src/other/*',
		dest: 'other',
		watch: [
			'./src/other/*',
		]
	},
	{
		name: 'video',
		files: './src/video/*',
		dest: 'video',
		watch: [
			'./src/video/*',
		]
	},
	{
		name: 'audio',
		files: './src/audio/*',
		dest: 'audio',
		watch: [
			'./src/audio/*',
		]
	},
];