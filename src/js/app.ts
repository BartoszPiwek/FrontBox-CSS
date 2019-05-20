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
      wrap: `input-counter`,
      input: `input-counter__input`,
      buttons: `input-counter__btn`,
      disable: `--disable`,
   });

   /**
    * Informations
    */
   // Site using cookies
   new InformationCookie({
      imageSrc: `/images/cookies.png`,
      content: `
      W naszym serwisie wykorzystujemy pliki Cookies. Są one zapisywane na dysku urządzenia końcowego użytkownika w celach statystycznych oraz ułatwienia korzystania z serwisu. Ustawienia te zawsze można zmienić. Szczegółowe informacje o plikach Cookies znajdują się w <a href="#" target="_blank">Polityce Prywatności</a>
      `,
   });

   /* Inform stylesheed to remove style fallback for JavaScript elements */
   $html.removeClass("js_no");
};