
[<img src="gitfiles/section-frontbox.png" style="width=100%; height: auto;">]()
<h1>
	<strong>FrontBox CSS</strong> <small>by Bartosz Piwek</small>
</h1>
Open-source static site builder tool.

<p>
	<span>Test framework</span>
	:
  <a href="http://dev.frontbox.bartoszpiwek.e-kei.pl/">Development</a>
  ·
  <a href="http://prod.frontbox.bartoszpiwek.e-kei.pl/">Productive</a>
</p>

<br>

## Information

<table>
	<tr>
		<td>HTML</td>
		<td><a href="https://pugjs.org/">Pug</a></td>
	</td>
	<tr>
		<td>CSS</td>
		<td><a href="https://sass-lang.com">SCSS</a></td>
	</td>
	<tr>
		<td>JavaScript</td>
		<td><a href="http://browserify.org">Browserify</a>/<a href="https://www.typescriptlang.org">TypeScript</a></td>
	</td>
	<tr>
		<td>Task runner</td>
		<td><a href="https://gulpjs.com">Gulp</a></td>
	</td>
	<tr>
		<td>Version</td>
		<td>1.2.0</td>
	</td>
</table>

<br>

[<img src="gitfiles/section-requirements.png" style="width=100%; height: auto;">]()
## Requirements

<table>
	<tr>
		<td><a href="https://nodejs.org/en/">Node.js</a></td>
		<td>JavaScript run-time environment</td>
	</td>
	<tr>
		<td><a href="https://gulpjs.com">Gulp</a></td>
		<td>The streaming build system</td>
	</td>
	<tr>
		<td><a href="https://yarnpkg.com/en/docs/install">Yarn</a></td>
		<td>Fast, reliable, and secure dependency</td>
	</td>
	<tr>
		<td><a href="https://code.visualstudio.com">Visual Studio Code</a></td>
		<td>IDE</td>
	</td>
	<tr>
		<td><a href="https://github.com/sds/scss-lint">scss-lint</a></td>
		<td> Configurable tool for writing clean, consistent SCSS</td>
	</td>
</table>

### Visual Studio Code extensions:

<table>
	<tr>
		<td><a href="https://marketplace.visualstudio.com/items?itemName=adamwalzer.scss-lint">scss-lint</a></td>
		<td>Linter SCSS</td>
	</td>
	<tr>
		<td><a href="https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter">SCSS Formatter</a></td>
		<td>Format SCSS</td>
	</td>
	<tr>
		<td><a href="https://marketplace.visualstudio.com/items?itemName=rebornix.project-snippets">Project Snippets</a></td>
		<td>Provide workspace/project level code snippets.</td>
	</td>
</table>

### Additional:

<table>
	<tr>
		<td><a href="https://sourceforge.net/projects/nikkhokkho/">FileOptimizer</a></td>
		<td>Advanced file optimizer featuring a lossless (no quality loss) file size reduction</td>
	</td>
	<tr>
		<td><a href="http://www.imagemagick.org/script/download.php">ImageMagick</a></td>
		<td>Software suite to create, edit, compose, or convert bitmap images</td>
	</td>
	<tr>
		<td><a href="https://github.com/google/ios-webkit-debug-proxy">iOS WebKit Debug Proxy</a></td>
		<td>Debug iOS device</td>
	</td>
	<tr>
		<td><a href="https://www.apple.com/pl/itunes/download/">iTunes</a></td>
		<td>iOS drivers</td>
	</td>
	<tr>
		<td><a href="https://chocolatey.org/">Chocolatey</a></td>
		<td>The package manager for Windows</td>
	</td>
	<tr>
		<td><a href="https://www.navicat.com/en/products/navicat-for-mysql">Navicat fo MySQL</a></td>
		<td>Relational database management system</td>
	</td>
	<tr>
		<td><a href="https://winscp.net">WinSCP</a></td>
		<td>SFTP and FTP client for Microsoft Windows</td>
	</td>
</table>

<br>

[<img src="gitfiles/section-gulp.png" style="width=100%; height: auto;">](https://gulpjs.com")
## Gulp

### Terminal tasks:
<table>
	<tr>
		<td>Generate website with server and automatic update after modifying files</td>
		<td>gulp</td>
	</td>
	<tr>
		<td>Generate favicons</td>
		<td>gulp favicon</td>
	</td>
	<tr>
		<td>Create docs (<a href="https://github.com/kneath/kss" target="_blank">KSS</a>)</td>
		<td>gulp docs</td>
	</td>
	<tr>
		<td>Remove FrontBox-CSS development files</td>
		<td>gulp clean</td>
	</td>
	<tr>
		<td>Debug task</td>
		<td>gulp test</td>
	</td>
	<tr>
		<td>Change version to productive</td>
		<td>--prod</td>
	</td>

</table>

<br>

[<img src="gitfiles/section-tree.png" style="width=100%; height: auto;">]()
## Projekt Tree

### Version
<pre style="white-space: pre-wrap; font-family: monospace; line-height: 1.26;">
├─── public/  	| Output generated website
    ├─── prod/	| Production
    └─── dev/ 	| Development
</pre>

### Settings
<pre style="white-space: pre-wrap; font-family: monospace; line-height: 1.26;">
├─── config.js                | Main tasks config
├─── src/
    ├─── style/
				├─── variables/
						├─── _base.scss
						├─── _color.scss
						├─── _index.scss
						├─── _media.scss
</pre>

### Source
<pre style="white-space: pre-wrap; font-family: monospace; line-height: 1.26;">
└─── src/                     | Source code
    ├─── fonts/                 | Generated fonts (https://www.fontsquirrel.com/tools/webfont-generator)
    └─── images/                
        ├────── sprites/               | Spritesmith assets
        ├────── favicons/              | Generated favicons
        ├────── favicon.png            | Favicon image
        ├────── svg/                   | Vector assets
        ├────── logo.png               | Website logo image
</pre>

<pre style="white-space: pre-wrap; font-family: monospace; line-height: 1.26;">
└─── src/                     | Development files
    ├─── fonts/                  | Generated fonts (https://www.fontsquirrel.com/tools/webfont-generator)
    ├─── images/
    ├────── sprites/               | Spritesmith assets
    ├────── favicons/              | Generated favicons
    ├────── favicon.png            | Favicon image
    ├────── svg/                   | Vector assets
    ├────── logo.png               | Website logo image
    ├─── js/
    ├────── frontbox/              | Frontbox libraries
    ├────── frontbox.js            | Main JavaScript file
    ├────── libs/                  | Other libraries
    ├─── less/
    ├────── automatic/             | Generated LESS
    ├────── frontbox/              | Frontbox libraries
    ├────── plugins/               | Addon Frontbox libraries
    ├────── libs/                  | Other libraries
    ├────── variables/             | LESS variables
    ├────── style.less             | Main LESS file (concatenate file)
    ├─── template/               | Website files
    └────── includes/              | Website parts
</pre>

<br>
<img src="gitfiles/section-testing.png" style="width=100%; height: auto;">

## Testing tools:

- <a href="https://ngrok.com/">ngrok</a><br>
Secure tunnels to localhost
> $ ngrok http {website}:80

- <a href="https://www.google.pl/chrome/browser/desktop/index.html">Google Chrome</a><br>
Inspect Android browser (Debug USB)
> Google Chrome > Remote devices

- <a href="https://www.mozilla.org/pl/firefox/new/">Firefox</a><br>
Debug iOS device<br>
Set ON: Settings > Safari > Advanced > Web Inspector<br>
> $ ios_webkit_debug_proxy<br>
> Go to url: localhost:9222

- <a href="https://www.ssllabs.com/ssltest/">SSL Labs</a><br>
Deep analysis of the configuration of any SSL web server on the public Internet.

## Browser extensions:

- <a href="https://chrome.google.com/webstore/detail/pixelparallel-by-htmlburg/iffnoibnepbcloaaagchjonfplimpkob">Pixel Perfect HTML</a><br>
Free, super handy and light HTML vs Design comparison tool for front-end developers that will help you code pixel perfect websites with ease.
- <a href="https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk">Lighthouse</a><br>
Lighthouse is an open-source, automated tool for improving the performance, quality, and correctness of your web apps.
- <a href="https://chrome.google.com/webstore/detail/meta-seo-inspector/ibkclpciafdglkjkcibmohobjkcfkaef">META SEO inspector</a><br>
Useful to inspect the meta data found inside web pages, usually not visible while browsing.
- <a href="https://chrome.google.com/webstore/detail/html5-outliner/afoibpobokebhgfnknfndkgemglggomo">HTML5 Outliner</a><br>
Generates a navigable page outline with heading and sectioning elements
- <a href="https://chrome.google.com/webstore/detail/waspinspector-analytics-s/niaoghengfohplclhbjnjheodgkejpih/">WASP</a><br>
Audit, validate and debug the data sent from their websites via tags and beacons

## Recommended bookmarks:

### Documentations

- Front-End API documentation<br>
Fast, offline, and free documentation browser for developers. Search 100+ docs in one web app: HTML, CSS, JavaScript, PHP, Ruby, Python, Go, C, C++…(offline)
> http://devdocs.io

### Images

- TinyPNG<br>
TinyPNG uses smart lossy compression techniques to reduce the file size of your PNG files.
> https://tinypng.com

<br>
<img src="gitfiles/logo-html.jpg" style="width=100%; height: auto;">

## Development
For new project create symbolic links with function <a target="_blank" href="https://www.howtogeek.com/howto/16226/complete-guide-to-symbolic-links-symlinks-on-windows-or-linux/">mklink</a>
> mklink /J "C:\Projects\{project-folder}\src\less\frontbox" "C:\Projects\Frontbox-CSS\src\less\frontbox"

<br>

[<img src="gitfiles/section-bugs.png" style="width=100%; height: auto;">](https://github.com/BartoszPiwek/FrontBox-CSS/issues")
## Bugs

Feel free to report:
<a href="https://github.com/BartoszPiwek/FrontBox-CSS/issues/new?labels=bug">create bug issues</a>
