module.exports = (SETTINGS) => {

    const 
    fs = require('fs'),
    path = require('path');


    return {

        /* Insert inline SVG */
        // svg: (block) => {
        //     let output = null;

        //     console.log(block);

        //     fs.readFile(`./src/images/svg/${block}.svg`, 'utf8', (err, data) => {
        //         output = data;
        //     });

        //     return output;
        // },

        printFilesLink: (path) => {

            let output = '';

            fs.readdirSync(`./public/${SETTINGS.version}/${path}`, { withFileTypes: true }).forEach(file => {

                let name = file.slice(0, -5);

                if ( name !== 'index' && file.endsWith(".html") ) {
                    output += `<a class="block mt-5 mb-5" href="./${name}.html">${name}</a>`; 
                }

            });
            return output;
        },

        svg: ( pug, args ) => {

            console.log(args);

            let 
            svg = fs.readFileSync(`./src/images/svg/${args.path}.svg`,'utf8'),
            output = '';


            output = svg.replace(`<svg `, `<svg class="svg ${args.className}" `);

            return output;

        },

        pageName: (block) => {
            return block;
        },
        escape: (block) => {
            return block
            .replace( /&/g, '&amp;'  )
            .replace( /</g, '&lt;'   )
            .replace( />/g, '&gt;'   )
            .replace( /"/g, '&quot;' )
            .replace( /#/g, '&#35;'  )
            .replace( /\\/g, '\\\\'  )
            .replace( /\n/g, '<br>'  );
        }
    };

};