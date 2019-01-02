module.exports = (SETTINGS) => {

    const fs = require('fs');

    var files = [];

    fs.readdirSync(`./src/debug`).forEach(file => {
        files.push(file);
    });
    
    return {
        filesDebug: () => {
            let output = ``;

            for (const iterator of files) {
                let name = iterator.slice(0, -4);
                output += `<a class="block mt-5 mb-5" href="./${name}.html">${name}</a>`; 
            }

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
            .replace( /\n/g, '<br>'   );
        }
    };

};