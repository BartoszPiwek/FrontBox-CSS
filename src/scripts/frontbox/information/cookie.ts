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

    private getContent = ( callback: Function ) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'cookies.html');
        xhr.send();
        xhr.onreadystatechange = function () {

            // Only run if the request is complete
            if (xhr.readyState !== 4) return;

            // Process our return data
            if (xhr.status >= 200 && xhr.status < 300) {
                // What do when the request is successful
                console.log('success', xhr.responseText);
                callback.apply( this, [xhr.responseText]);
            } else {
                // What to do when the request has failed
                console.log('error', xhr);
            }

        };
    };

    /**
     * Show information
     */
    private show = () => {

        this.getContent(
            ( cookiesContentHTML ) => {
                body.insertAdjacentHTML('beforeend', cookiesContentHTML );

                this.cookie = document.getElementById('js_cookies-information');
                this.accept = document.querySelectorAll('.js_cookies-close');
        
                this.bindClick();
            }
        );
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