import { Browser } from "./frontbox/data/browser";
import { InformationCookie } from "./frontbox/information/cookie";
import { $html } from "./frontbox/data/elements";
import { InputCounter } from "./frontbox/form/input-counter";

window.onload = () => {

   const browser = new Browser();

   /**
    * Forms
    */
   new InputCounter({
      cssClass: {
        wrap: `[data-bind="input-counter"]`,
        input: `.input-counter__input`,
        button: `.input-counter__btn`,
        disable: `--disable`,
      }
   });

   /**
    * Informations
    */
   new InformationCookie();

   /* Inform stylesheed to remove style fallback for JavaScript elements */
   $html.removeClass("js_no");
};