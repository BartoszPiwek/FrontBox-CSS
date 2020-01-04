export const configDocumentationStyle = {
	dest: 'documentation/style'
}

export const configBrowser = {
	open: false,
	host: "localhost",
	proxy: false,
	port: 8080
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
		files: './src/fonts/*.{eot|woff2|woff|ttf|svg}',
		dest: 'fonts',
		watch: [
			'./src/fonts/*.{eot|woff2|woff|ttf|svg}',
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