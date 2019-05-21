/**
 * Inform users that your site uses cookies 
 *
 * @class Cookie
 * @version 1.0
 * @require
 * JavaScript Cookie - https://github.com/js-cookie/js-cookie
 *
 * 21.05.2019 Convert jQuery code to vanilla JS
 */

import * as Cookies from "js-cookie";
import { body } from "../data/elements";

export class InformationCookie {

    private cookie: HTMLElement;
    private accept: NodeList;

    constructor( ) {

        if (!Cookies.get('using_cookies')) {
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

    /**
     * Show information
     */
    private show = async() => {

        const cookiesContent = await fetch('cookies.html', {
            headers: {
                'Content-Type': 'text/html'
            },
        });
        const cookiesContentHTML = await cookiesContent.text();

        body.insertAdjacentHTML('beforeend', cookiesContentHTML );

        this.cookie = document.getElementById('js_cookies-information');
        this.accept = document.querySelectorAll('.js_cookies-close');

        this.bindClick();

    }

    private bindClick() {

        this.accept.forEach( ( item ) => {

            item.addEventListener('click', () => {
                this.onClick();
            });

        });
        
    }

    private onClick() {

        Cookies.set('using_cookies', 1);
        
        this.cookie.classList.add("js_cookies-information--hide");

        /* test-code */
        console.log(`Cookie\n - accepted cookies`);
        /* end-test-code */

        return false;

    }

}