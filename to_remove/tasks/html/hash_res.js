/**
 * TODO: rapair regex for fonts file
 */

module.export = {

	css: {
		options: {
			resDir: 'public/prod',
			resReg: [
				/(images\/[^.]+\.(?:png|gif|jpg))(\??)/g,
				// /(fonts\/[^.]+\.[\w]+)(\??)/g
			],
			force: true,
		},
		files: [{
			expand: true,
			cwd: 'public/prod/css',
			src: ['**/*.css'],
			dest: 'public/prod/css'
		}]
	},
	html: {
		options: {
			resDir: 'public/prod',
			force: true,
			resReg: [
				/(images\/[^.]+\.(?:png|gif|jpg|ico))(\??)/g,
				/(css\/[^.]+\.(?:css))(\??)/g,
				/(js\/[^.]+\.(?:min.js))(\??)/g
			]
		},
		files: [{
			expand: true,
			cwd: 'public/prod',
			src: ['*.html'],
			dest: 'public/prod'
		}]
	}

};
