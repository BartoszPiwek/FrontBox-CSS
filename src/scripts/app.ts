import { Browser } from "./frontbox/data/browser";
import { InformationCookie } from "./frontbox/information/cookie";
import { html } from "./frontbox/data/elements";
import { InputCounter } from "./frontbox/form/input-counter";
import { vUnits } from "./frontbox/polyfill/v-units";
import { Resize } from "./frontbox/bind/resize";

window.onload = () => {

  const 
  browser = new Browser(),
  resize = new Resize();

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

  /**
   * Polyfill
   */
  new vUnits();

  /* Inform stylesheed to remove style fallback for JavaScript elements */
  html.classList.remove('js_no');
};
