import { Browser } from "./frontbox/data/browser";
import { InformationCookie } from "./frontbox/information/cookie";
import { html } from "./frontbox/data/elements";
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

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  /* Inform stylesheed to remove style fallback for JavaScript elements */
  html.classList.remove('js_no');
};
