import { LitElement, html, css, unsafeCSS } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { classMap } from "lit/directives/class-map.js";

import colorTokens from "@ogds/tokens/styles/css/colors.css";
import spacingTokens from "@ogds/tokens/styles/css/spacing.css";
import breakpointTokens from "@ogds/tokens/styles/css/breakpoints.css";
import styles from "./ogds-banner.css";

import usFlagSmall from "@uswds/uswds/img/us_flag_small.png";
import iconDotGov from "@uswds/uswds/img/icon-dot-gov.svg";
import iconHttps from "@uswds/uswds/img/icon-https.svg";
import iconClose from "../../shared/icons/close.svg";
import iconExpandMore from "../../shared/icons/expand_more.svg";
import iconExpandLess from "../../shared/icons/expand_less.svg";
import { defineCustomElement } from "../../utils";

interface OgdsBannerTranslations {
  banner: {
    label: string;
    text: string;
    action: string;
  };
  domain: {
    heading: string;
    text1: string;
    text2: string;
  };
  https: {
    heading1: string;
    heading2: string;
    text1: string;
    text2: string;
    text3: string;
  };
}

type SupportedLanguage = "en" | "es";

const OGDS_BANNER_TRANSLATIONS: Record<
  SupportedLanguage,
  OgdsBannerTranslations
> = {
  en: {
    banner: {
      label: "Official website of the United States government",
      text: "An official website of the United States government",
      action: "Here’s how you know",
    },
    domain: {
      heading: "Official websites use",
      text1: "A",
      text2:
        "website belongs to an official government organization in the United States.",
    },
    https: {
      heading1: "Secure",
      heading2: "websites use HTTPS",
      text1: "A <strong>lock</strong>",
      text2:
        "or <strong>https://</strong> means you’ve safely connected to the",
      text3:
        "website. Share sensitive information only on official, secure websites.",
    },
  },
  es: {
    banner: {
      label: "Un sitio oficial del Gobierno de Estados Unidos",
      text: "Un sitio oficial del Gobierno de Estados Unidos",
      action: "Así es como usted puede verificarlo",
    },
    domain: {
      heading: "Los sitios web oficiales usan",
      text1: "Un sitio web",
      text2:
        "pertenece a una organización oficial del Gobierno de Estados Unidos.",
    },
    https: {
      heading1: "Los sitios web seguros",
      heading2: "usan HTTPS",
      text1: "Un <strong>candado</strong>",
      text2:
        "o <strong>https://</strong> significa que usted se conectó de forma segura a un sitio web",
      text3:
        "Comparta información sensible sólo en sitios web oficiales y seguros.",
    },
  },
};

/**
 * @summary The ogds-banner component.
 *
 * @attribute {string} lang - The element's language.
 * @attribute {string} label - The custom aria label users can override.
 * @attribute {string} tld - The top level domain for the site.
 *
 * @cssprop --ogds-banner-background-color - Sets banner background color.
 * @cssprop --ogds-banner-button-close-background-color - Sets the background color for the close control on smaller viewports.
 * @cssprop --ogds-banner-focus-outline-color - Sets banner focus outline color.
 * @cssprop --ogds-banner-font-family - Sets banner font family.
 * @cssprop --ogds-banner-icon-gov-color - Sets the color for the official government domain icon in the expanded state of the banner.
 * @cssprop --ogds-banner-icon-https-color - Sets the color for the https icon in the expanded state of the banner.
 * @cssprop --ogds-banner-link-color - Sets the default link color.
 * @cssprop --ogds-banner-link-hover-color - Sets the default link color.
 * @cssprop --ogds-banner-text-color - Sets the default text color.
 *
 * @slot banner-text - The text for official government website text.
 * @slot banner-action - Action text label "Here's how you know."
 * @slot domain-heading - Heading text for the domain section.
 * @slot domain-text - Body text for domain section.
 * @slot https-heading - Heading for HTTPs section.
 * @slot https-text - Body text for HTTPs section.
 *
 * @element ogds-banner
 */
export class OgdsBanner extends LitElement {
  static properties = {
    flagSrc: { type: String },
    lang: { type: String, reflect: true },
    isOpen: { state: true },
    label: { type: String },
    tld: { type: String, reflect: true },
  };

  // Property declarations
  flagSrc!: string;
  lang!: "en" | "es";
  isOpen!: boolean;
  label!: string;
  tld!: "gov" | "mil";

  toggle() {
    this.isOpen = !this.isOpen;
    const contentElement = this.shadowRoot?.querySelector(".content");
    if (contentElement) {
      contentElement.toggleAttribute("hidden");
    }
  }

  constructor() {
    super();
    this.flagSrc = usFlagSmall;
    this.lang = "en";
    this.isOpen = false;
    this.tld = "gov";
  }

  // Get English or Spanish strings. Default to English if an unknown `lang` is passed.
  // Ex: <usa-banner lang="zy"></usa-banner>
  protected get _bannerText() {
    return (
      OGDS_BANNER_TRANSLATIONS[this.lang] || OGDS_BANNER_TRANSLATIONS["en"]
    );
  }

  // Get the action text and use for both mobile & desktop buttons.
  protected get _actionText() {
    const bannerActionText = this.querySelector('[slot="banner-action"]');

    return bannerActionText?.textContent;
  }

  domainTemplate(tld: string) {
    const { domain } = this._bannerText;

    return html`
      <div class="icon-gov">
        <p>
          <strong>
            <slot name="domain-heading"> ${domain.heading} .${tld} </slot>
          </strong>
          <br />
          <slot name="domain-text">
            ${domain.text1} <strong>.${tld}</strong> ${domain.text2}
          </slot>
        </p>
      </div>
    `;
  }

  lockIcon() {
    return html`
      <span
        class="icon-lock"
        role="img"
        aria-label="Locked padlock icon"
      ></span>
    `;
  }

  httpsTemplate(tld: string) {
    const { https } = this._bannerText;

    return html`
      <div class="icon-https">
        <p>
          <strong>
            <slot name="https-heading">
              ${https.heading1} .${tld} ${https.heading2}
            </slot> </strong
          ><br />
          <slot name="https-text">
            ${unsafeHTML(https.text1)} (${this.lockIcon()})
            ${unsafeHTML(https.text2)} .${tld} ${https.text3}
          </slot>
        </p>
      </div>
    `;
  }

  static styles = [
    css`
      :host {
        /** Icons */
        --ogds-icon-close: url("${unsafeCSS(iconClose)}");
        --ogds-icon-expand-less: url("${unsafeCSS(iconExpandLess)}");
        --ogds-icon-expand-more: url("${unsafeCSS(iconExpandMore)}");
        --ogds-icon-gov: url("${unsafeCSS(iconDotGov)}");
        --ogds-icon-https: url("${unsafeCSS(iconHttps)}");
      }
    `,
    breakpointTokens,
    colorTokens,
    spacingTokens,
    styles,
  ];

  render() {
    const classes = { ["expanded"]: this.isOpen };
    // ? Is there a better way to fallback to a default value is passed value doesn't match?
    // Example: User passes `tld="zzz"` --> uses "gov" domain instead of `zzz`.
    const tld = this.tld === "mil" ? "mil" : "gov";
    const { banner } = this._bannerText;

    return html`
      <section aria-label=${this.label || banner.label}>
        <div class="usa-accordion">
          <header class="${classMap(classes)}">
            <div class="inner">
              <div class="grid-col-auto">
                <img
                  aria-hidden="true"
                  class="header-flag"
                  src=${this.flagSrc}
                  alt=""
                />
              </div>
              <div
                class="grid-col-fill tablet:grid-col-auto"
                aria-hidden="true"
              >
                <p class="header-text">
                  <slot name="banner-text">${banner.text}</slot>
                </p>
                <!-- 
                  Since the header-action text below is underlined, the slot and p 
                  need to be on the same line to avoid one extra space of underline 
                  before the expand icon.
                -->
                <!-- prettier-ignore -->
                <p class="header-action"><slot name="banner-action">${banner.action}</slot></p>
              </div>
              <button
                type="button"
                class="usa-accordion__button"
                aria-expanded="${this.isOpen}"
                aria-controls="gov-banner-default"
                @click="${this.toggle}"
              >
                <span class="button-text">
                  ${this._actionText || banner.action}
                </span>
              </button>
            </div>
          </header>
          <div class="content usa-accordion__content" hidden>
            <div class="grid-row grid-gap-lg">
              <div class="guidance tablet:grid-col-6">
                ${this.domainTemplate(tld)}
              </div>
              <div class="guidance tablet:grid-col-6">
                ${this.httpsTemplate(tld)}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

defineCustomElement("ogds-banner", OgdsBanner);
