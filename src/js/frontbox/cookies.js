module.exports = (data) => {

    const
    ELEMENTS = data.ELEMENTS;

    let
    OPTIONS = {
        content: null,
        imgSrc: '/assets/images/cookies.png',
    };

    const
    start = (data) => {

        if (!Cookies.get('cookies_information')) {
            $.extend( OPTIONS, data.OPTIONS );
            show();
        }

    };

    const
    createElement = () => {

        return  `
                <div class="js_cookies-information" id="js_cookies-information">
                    <div class="wrap">
                        <div class="js_cookies-information__container">
                            <img src="${OPTIONS.imgSrc}" class="js_cookies-information__img" alt="Ciasteczka">
                            <p class="js_cookies-information__text">
                                ${OPTIONS.content}
                            </p>
                            <p class="js_cookies-information__exit js_cookies-close"></p>
                        </div>
                    </div>
                </div>
                `;
    };

    const
    show = (data) => {
        // Create element
        let element = createElement();
        // Append to $body
        ELEMENTS.$body.append( $( element ) );

        var $cookie = $("#js_cookies-information"),
            $exit = $(".js_cookies-close");
        var close = function(){
            Cookies.set('cookies_information', 1);
            $cookie.addClass("js_cookies-information--hide");
        };
        $exit.on("click", close);

    };

    start(data);

};