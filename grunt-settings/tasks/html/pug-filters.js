module.exports = {
    
    pageName: function(block) {
        return block;
    },
    escape: function(block) {
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