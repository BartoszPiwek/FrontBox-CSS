/*=========================================================================
|| FILE: Debug
===========================================================================
|| Debug elements
=========================================================================*/

module.exports = (argument) => {

    const
    ELEMENTS = argument.ELEMENTS;
    
    global.DEBUG = {};

    global.DEBUG.console = require('./debug/console')({
        // open: true,
        ELEMENTS: ELEMENTS,
    });
    global.DEBUG.variable = require('./debug/variables')({
        OPTIONS: {
            open: false,
        },
        ELEMENTS: ELEMENTS,
    });

};