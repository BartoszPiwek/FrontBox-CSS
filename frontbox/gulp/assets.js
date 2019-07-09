/* Import libs */
import { src, dest } from 'gulp';
import realFavicon from 'gulp-real-favicon';
import changed from 'gulp-changed';
import svgmin from 'gulp-svgmin';
import rename from 'gulp-rename';
import clean from 'gulp-clean';
/* Import config */
import * as config from './../../config';
import { getModeName } from './index';

/* Generate a multiplatform favicon with RealFaviconGenerator */
export function favicon(done) {
	const element = config.path.assets.favicon;

	return realFavicon.generateFavicon(
		{
			masterPicture: `${element.file}`, //optimal size 300px
			dest: `${element.desc}`,
			iconsPath: `${element.iconsPath}`,
			design: {
				ios: {
					pictureAspect: 'backgroundAndMargin', // noChange
					backgroundColor: '#ffffff',
					margin: '14%', //base size: 57x57
					assets: {
						ios6AndPriorIcons: true,
						ios7AndLaterIcons: true,
						precomposedIcons: true
						// declareOnlyDefaultIcon: true
					},
					appName: `${config.website.name}`
				},
				desktopBrowser: {},
				windows: {
					pictureAspect: 'whiteSilhouette', // noChange
					backgroundColor: '#df3132',
					onConflict: 'override',
					assets: {
						windows80Ie10Tile: false,
						windows10Ie11EdgeTiles: {
							small: false,
							medium: true,
							big: false,
							rectangle: false
						}
					},
					appName: `${config.website.name}`
				},
				androidChrome: {
					pictureAspect: 'backgroundAndMargin', // shadow/noChange
					margin: '25%', //base size: 96x96
					backgroundColor: '#ffffff',
					// startUrl: 'https://m-o-z-g.gitlab.io`${config.website.name}`,
					themeColor: '#ffffff',
					manifest: {
						name: `${config.website.name}`,
						display: 'standalone',
						orientation: 'notSet',
						onConflict: 'override',
						declared: true
					},
					assets: {
						legacyIcon: false,
						lowResolutionIcons: false
					}
				},
				safariPinnedTab: {
					// masterPicture: {
					// 	type: 'inline',
					// 	content: ''
					// },
					pictureAspect: 'silhouette', //blackAndWhite
					// threshold: 65,
					themeColor: '#df3132'
				}
			},
			settings: {
				compression: 2, // 1-5
				scalingAlgorithm: 'Lanczos', //'Mitchell', 'Cubic', 'Bilinear', 'Spline', 'Nearest Neighbor'
				errorOnImageTooSmall: false,
				readmeFile: false,
				usePathAsIs: true,
				htmlCodeFile: true
			},
			markupFile: `${element.log}`
		},
		() => {
			done();
		}
	);
}
export function faviconAfter() {
	return src('./src/images/favicon/html_code.html')
		.pipe(
			clean(),
			{ force: true }
		)
		.pipe(
			rename({
				basename: 'favicon'
			})
		)
		.pipe(dest('./src/template/includes/'));
}

export function svg(done) {
	const element = config.path.assets.svg;

	return src(element.files)
		.pipe(changed(`public/${getModeName()}/${element.dest}`))
		.pipe(
			svgmin({
				plugins: [{ removeXMLProcInst: true }, { removeComments: true }, { removeDoctype: true }, { removeViewBox: false }, { removeUselessStrokeAndFill: true }, { removeStyleElement: true }, { removeAttrs: { attrs: ['xmlns', 'fill', 'stroke', 'width', 'height', 'id'] } }]
			})
		)
		.pipe(dest(`${element.dest}`));
}
