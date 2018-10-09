cookies: function() {

    if (!Cookies.get('cookies_information')) {
        var content = 
        `
            <div class="js_cookies-information" id="js_cookies-information">
                <div class="wrap">
                    <div class="js_cookies-information__container">
                        <img src="/images/cookies.png" class="js_cookies-information__img" alt="Ciasteczka">
                        <p class="js_cookies-information__text">
                            Nasza strona internetowa używa plików cookies (tzw. ciasteczka) w celach statystycznych, reklamowych oraz funkcjonalnych. Dzięki nim możemy indywidualnie dostosować stronę do twoich potrzeb. Każdy może zaakceptować pliki cookies albo ma możliwość wyłączenia ich w przeglądarce, dzięki czemu nie będą zbierane żadne informacje.
                        </p>
                        <p class="js_cookies-information__exit js_cookies-close"></p>
                    </div>
                </div>
            </div>
        `;
        $( "#body" ).append( $( content ) );
        var $cookie = $("#js_cookies-information"),
            $exit = $(".js_cookies-close");
        var close = function(){
            Cookies.set('cookies_information', 1);
            $cookie.addClass("js_cookies-information--hide");
        };
        $exit.on("click", close);
    }

},