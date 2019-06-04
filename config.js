module.exports = {

	"browsersync": {
		"open": false,
		"host": "localhost",
		"proxy": false,
		"port": 8080
	},

	/**
	 * Main
	 */
	// Declare the language of a Web page
	website_locale: 'pl-PL',
	website_color: '#e7be54',
	website_author: 'Bartosz Piwek',
	website_ios_app: false,

	/**
	 * Informations
	 */
	// Disable javascripts
	website_info_off_javascript: true,
	// Using old browser
	website_info_old_browser: true,


	/* Paths */
	path: {
		style: {
			main: {
				files: './src/style/style.scss',
				dest: '',
				watch: [
					'./src/style/style.scss',
					'./src/style/variables.scss',
					'./src/style/variables/*.scss',
					'./src/style/tools/*.scss',
					'./src/style/modules/*.scss',
					'./src/style/style/*.scss',
				]
			},
			base: {
				files: './src/style/base.scss',
				dest: 'css/',
				watch: [
					'./src/style/base.scss',
					'./src/style/bootstrap/*.scss'
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
					'src/scripts/frontbox/**/*.ts',
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
					'!src/images/svg/*_.svg',
				],
				dest: 'src/images/svg',
				watch: [
					'src/images/svg/*.svg',
					'!src/images/svg/*_.svg',
				]
			},
			favicon: {
				file: 'src/images/favicon.png',
				desc: 'src/images/favicon',
				iconsPath: '/images/favicon',
				log: 'log/faviconData.json'
			}
		}
	},

	pathToPublic: 'public',
	pathToFrontBoxPlugins: './../FrontBox-Plugins',

	"pathToMainCSS": './css',
	"pathToMainCSSDev": './public/dev',
	"pathToMainCSSProd": './public/prod',
	"pathToDev": "./public/dev",
	"pathToProd": "./public/prod",
	"pathToModulesDev": "'../css'",
	"pathToModulesProd": "'./public/prod/css'",

	"pathToFavicon": "./src/template/includes/favicon.html",

	/* Prefix */
	"prefixFaviconHTML": "/images/favicon/",

	/* Functions */
	"getYear": "<%= grunt.template.today('yyyy') %>",

	/* Project type */
	"isWordpress": false,

	/* Framework */
	framework: 'frontbox', // false,frontbox
	cssPreprocessor: 'less', // false,less,sass
	htmlPreprocessor: 'pug', // false,pug
	jsPreprocessor: 'browserify', // false,browserify
	jsExtension: 'ts',

	/**
	 * Productive options
	 * css-mqpacker|
	 */
	cssTasks: ['css-mqpacker'],
	jsTasks: ['babel', 'strip_code', 'uglify'],

	/* Debug */
	debug: true,
	workingWithFrontbox: true,

};
