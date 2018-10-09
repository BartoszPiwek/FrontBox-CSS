module.exports = {

    icons: {
        options: {
            trueColor: true,
            precomposed: true,
            appleTouchBackgroundColor: "auto",
            coast: true,
            windowsTile: true,
            tileBlackWhite: false,
            tileColor: "auto",
            html: 'template-parts/favicon.php',
            HTMLPrefix: "<?php echo $url; ?>/assets/images/favicon/"
        },
        src: 'src/images/favicon.png',
        dest: 'assets/images/favicon'
    }

};