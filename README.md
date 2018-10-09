<img src="gitfiles/logo-frontbox.jpg" style="width=100%; height: auto;">

# FrontBox-CSS [![Build Status](https://travis-ci.org/BartoszPiwek/FrontBox-CSS.svg?branch=master)](https://travis-ci.org/BartoszPiwek/FrontBox-CSS)

> <strong>Author</strong>: Bartosz Piwek<br>
> <strong>HTML Preprocessor</strong>: Pug<br>
> <strong>CSS Preprocessor</strong>: LESS<br>
> <strong>JS addon</strong>: RequireJS<br>
> <strong>Version</strong>: 1.0.6<br>
> <strong>Compatibility</strong>: < IE10

## Used programs

Requirements:
- <a href="https://yarnpkg.com/en/docs/install">Yarn</a> - Fast, reliable, and secure dependency management
- <a href="https://nodejs.org/en/">Node.js</a> - JavaScript runtime built
- <a href="https://gruntjs.com/">Grunt</a> - The JavaScript Task Runner

Additional:
- <a href="https://github.com/google/ios-webkit-debug-proxy">iOS WebKit Debug Proxy</a> - Debug iOS device
- <a href="https://www.apple.com/pl/itunes/download/">iTunes</a> - iOS drivers
- <a href="https://chocolatey.org/">Chocolatey</a> - The package manager for Windows
- <a href="https://chocolatey.org/packages/imagemagick.app">imagemagick</a> & <a href="http://www.imagemagick.org/script/download.php">MS binary</a> - Software suite to create, edit, compose, or convert bitmap images

Helpful:
- <a href="https://www.navicat.com/en/products/navicat-for-mysql">Navicat fo MySQL</a> - Relational database management system
- <a href="https://winscp.net">WinSCP</a> - SFTP and FTP client for Microsoft Windows

### Commands for ImageMagick
Optimize Images (Google Pagespeed Insights image optimization guidelines)

- JPG
>convert image.jpg -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG -colorspace sRGB image@converted.jpg

- PNG
>convert image.png -strip image@converted.png

<br>

<img src="gitfiles/logo-grunt.jpg" style="width=100%; height: auto;">

### Main commands:
- <strong>Install packages and libraries:</strong>
> $ yarn install
- <strong>Insert libraries in project</strong><br>
CSS/LESS to src/less/libs<br>
JavaScript to scr/js/libs

> $ grunt libs

### Build commands:

- <strong>Create DEV</strong><br>
  Build development website version
> $ grunt
- <strong>Create PROD</strong><br>
  Build production website version
> $ grunt prod
- <strong>Generate favicons</strong><br>
  Grab image from src/images/favicon.png and insert output to folder src/images/favicon<br>
  Output HTML tags insert in src/template/includes/favicon.html
> $ grunt favicon
- <strong>Virtual host</strong><br>
  Create easy virtual host for website (<i>localhost:8000</i>)<br>
  <strong>up</strong> - for dev version, automatic update after modifying files<br>
  <strong>up_prod</strong> - for prod version
> $ grunt up<br>
> $ grunt up_prod

<br>
<img src="gitfiles/logo-tree.jpg" style="width=100%; height: auto;">

## Assets:

<strong>images</strong>

- src/images/favicon.png - used to generate multi favicons<br>
- src/images/logo.png - meta SEO logo

<strong>grunt configuration file (<i>settings/</i>)</strong>

- html_variables.json<br>
- javascript_variables.json

## Project tree:

<pre style="white-space: pre-wrap; font-family: monospace; line-height: 1.26;">
├───.vscode/                 | Configurations for Visual Studio Code
├───public/                  | Generated website version
│   ├─── prod/                  | Production
│   └─── dev/                   | Development
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
<img src="gitfiles/logo-testing.jpg" style="width=100%; height: auto;">

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

## HTML 
TODO
<br>

<img src="gitfiles/logo-vc-studio.jpg" style="width=100%; height: auto;">

## <a href="https://code.visualstudio.com/">Visual Studio Code</a> settings
Sync IDE settings, snippets, packages between computers
<br>

- Download package
> https://marketplace.visualstudio.com/items?itemName=nonoroazoro.syncing
- Create new access tokens (settings>Developer>Personal access tokens) and download settings
> Syncing: Download Settings<br>
> Syncing: Upload Settings

<br>
<img src="gitfiles/logo-develop.jpg" style="width=100%; height: auto;">

## Development
For new project create symbolic links with function <a target="_blank" href="https://www.howtogeek.com/howto/16226/complete-guide-to-symbolic-links-symlinks-on-windows-or-linux/">mklink</a>
> mklink /J "C:\Projects\{project-folder}\src\less\frontbox" "C:\Projects\Frontbox-CSS\src\less\frontbox"

## Bugs 

Feel free to report:
> https://github.com/BartoszPiwek/FrontBox-CSS/issues

## Changelog
> https://github.com/BartoszPiwek/FrontBox-CSS/blob/master/CHANGELOG.md
