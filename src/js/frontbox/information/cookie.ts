/**
 * @class Cookie
 * TODO: Content from html file
 */

import * as Cookies from "js-cookie";
import * as $ from "jquery";
import { $body } from "../data/elements";

interface InformationCookieData {
    imageSrc: string,
    content: string,
}

export class InformationCookie {

    private imageSrc: string;
    private content: string;

    private $cookie: JQuery<HTMLElement>;
    private $accept: JQuery<HTMLElement>;

    constructor( data: InformationCookieData ) {

        if (!Cookies.get('using_cookies')) {
            this.imageSrc   = data.imageSrc;
            this.content    = data.content;
            this.show();

            /* test-code */
            console.log(`Cookie\n - show information about using cookies`);
            /* end-test-code */
        }
        /* test-code */
        else {
            console.log(`Cookie\n - information already showed`);
        }
        /* end-test-code */

    }

    private createElement(): JQuery<HTMLElement> {
        return $(`
            <div class="js_cookies-information" id="js_cookies-information">
                <div class="wrap">
                    <div class="js_cookies-information__container">
                        <img src="${this.imageSrc}" class="js_cookies-information__img" alt="Ciasteczka">
                        <p class="js_cookies-information__text">
                            ${this.content}
                        </p>
                        <p class="js_cookies-information__exit js_cookies-close"></p>
                    </div>
                </div>
            </div>
        `);
    }

    private accept(e: JQuery.Event): void {
        
        Cookies.set('using_cookies', 1);
        this.$cookie.addClass("js_cookies-information--hide");

        /* test-code */
        console.log(`Cookie\n - accepted cookies`);
        /* end-test-code */

        e.preventDefault();
    }

    /**
     * Show information
     */
    private show(): void {

        let $element = this.createElement();
        $body.append( $element ); 

        this.$cookie = $("#js_cookies-information");
        this.$accept = this.$cookie.find(".js_cookies-close");

        this.$accept.on('click', (e) => this.accept(e) );
    }
}