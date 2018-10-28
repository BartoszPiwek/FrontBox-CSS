module.exports = function(SETTINGS){

    return {

        prod: {
            options: {
                iconsPath: `${SETTINGS.prefixFaviconHTML}`,
                html: ['./src/template/includes/favicon.html'],
                design: {
                  ios: {
                    pictureAspect: 'noChange'
                  },
                  desktopBrowser: {},
                  windows: {
                    pictureAspect: 'noChange',
                    backgroundColor: '#da532c',
                    onConflict: 'override'
                  },
                  androidChrome: {
                    pictureAspect: 'noChange',
                    themeColor: '#ffffff',
                    manifest: {
                      name: 'example.com',
                      display: 'browser',
                      orientation: 'notSet',
                      onConflict: 'override'
                    }
                  },
                  safariPinnedTab: {
                    pictureAspect: 'blackAndWhite',
                    threshold: 73.4375,
                    themeColor: '#5bbad5'
                  }
                },
                settings: {
                  compression: 1,
                  scalingAlgorithm: 'Mitchell',
                  errorOnImageTooSmall: false
                },
            },
            src: './src/images/favicon.png',
            dest: './src/images/favicon'
        }

    };

};