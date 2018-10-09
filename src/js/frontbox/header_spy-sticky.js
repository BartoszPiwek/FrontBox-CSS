initHeaderSpySticky: function () { 
    var $header = $("#header"),
        $window = $(window),
        headerPositionX = $header.offset().top,
        pagePositionY;

    var windowResize = function(){
        headerPositionX = $header.offset().top;
        checkPosition();
    };

    var checkPosition = function(){
        pagePositionY = $window.scrollTop();
        if (pagePositionY >= headerPositionX) {
            $header.addClass("header--sticky");
        }
        if (pagePositionY < headerPositionX ) {
            $header.removeClass("header--sticky");
        }
    };

    checkPosition();
    $window.resize(windowResize);
    $window.scroll(checkPosition);
},