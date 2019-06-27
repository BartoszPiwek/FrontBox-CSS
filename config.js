module.exports = {
	/* Browsersync settings */
	browsersync: {
		open: false,
		host: "localhost",
		proxy: false,
		port: 8080
	},
	/* Website */
	website: {
		name: 'FrontBox-CSS',
		locale: 'pl-PL',
		color: '#e7be54',
		author: 'Bartosz Piwek',
		ios_app: false,
	},
	/* Informations */
	info: {
		offJavascript: true, // Disable javascripts
		oldBrowser: true, // Using old browser
	},
	/* Paths */
	path: {
		style: {
			main: {
				files: './src/style/style.scss',
				dest: '',
				watch: [
					'./src/style/style.scss',
					'./src/style/_*.scss',
					'./src/style/variables/*.scss',
					'./src/style/tools/*.scss',
					'./src/style/modules/*.scss',
					'./src/style/plugins/*.scss',
				]
			},
			bootstrap: {
				files: './src/style/bootstrap.scss',
				dest: 'css/',
				watch: [
					'./src/style/bootstrap.scss',
					'./src/style/bootstrap/*.scss',
					'./src/style/variables/*.scss',
					'./src/style/tools/*.scss',
					'./src/style/modules/*.scss',
				]
			},
			grid: {
				files: './src/style/grid.scss',
				dest: 'css/',
				watch: [
					'./src/style/grid.scss',
					'./src/style/tools/_media.scss',
					'./src/style/variables/_media.scss',
					'./src/style/modules/_grid.scss',
					'./src/style/modules/_row.scss',
				]
			},
			utilities: {
				files: './src/style/utilities.scss',
				dest: 'css/',
				watch: [
					'./src/style/utilities.scss',
					"./src/style/utilities/*.scss"
				]
			},
		},
		script: {
			main: {
				files: 'src/scripts/app.ts',
				dest: '',
				watch: [
					'src/scripts/app.ts',
					'src/scripts/bootstrap/*.ts',
					'src/scripts/modules/*.ts',
				]
			}
		},
		pug: {
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
			},
		},
		copy: {
			image: {
				files: './src/images/**/*',
				dest: 'images',
				watch: [
					'./src/images/**/*',
				]
			},
			fonts: {
				files: './src/fonts/*.{eot|woff2|woff|ttf|svg}',
				dest: 'fonts',
				watch: [
					'./src/fonts/*.{eot|woff2|woff|ttf|svg}',
				]
			},
			other: {
				files: './src/other/*',
				dest: 'other',
				watch: [
					'./src/other/*',
				]
			},
			video: {
				files: './src/video/*',
				dest: 'video',
				watch: [
					'./src/video/*',
				]
			},
			audio: {
				files: './src/audio/*',
				dest: 'audio',
				watch: [
					'./src/audio/*',
				]
			},
		},
		assets: {
			svg: {
				files: [
					'src/images/svg/*.svg',
					'!src/images/svg/*.fill.svg',
				],
				dest: 'src/images/svg',
				watch: [
					'src/images/svg/*.svg',
					'!src/images/svg/*.fill.svg',
				]
			},
			favicon: {
				file: 'src/images/favicon.png',
				desc: 'src/images/favicon',
				iconsPath: '/images/favicon',
				log: 'log/faviconData.json'
			}
		},
		plugins: '../../../FrontBox-Plugins'
	},
	/* Project type */
	projektType: false, // false, 'wordpress'
	/* Debug */
	debug: true,
	working: true,
};
