import { LitElement, nothing } from "lit";

import styles from "./ogds-accordion.css";
import iconChevronDown from "../../shared/icons/expand_more.svg";
import iconChevronUp from "../../shared/icons/expand_less.svg";
import iconPlus from "../../shared/icons/add.svg";
import iconMinus from "../../shared/icons/remove.svg";

import { adoptTokenStyles } from "../../core/token-styles";
import { defineCustomElement } from "../../utils";

export class OgdsAccordion extends LitElement {
  private static _sheet: CSSStyleSheet | null = null;

  override createRenderRoot() {
    return this;
  }

  override connectedCallback() {
    super.connectedCallback();
    adoptTokenStyles();
    if (!OgdsAccordion._sheet) {
      OgdsAccordion._sheet = new CSSStyleSheet();
      OgdsAccordion._sheet.replaceSync(
        `ogds-accordion, .ogds-accordion {
          --icon-chevron-pointing-down: url("${iconChevronDown}");
          --icon-chevron-pointing-up: url("${iconChevronUp}");
          --icon-plus: url("${iconPlus}");
          --icon-minus: url("${iconMinus}");
        }\n` + styles.cssText,
      );
      document.adoptedStyleSheets = [
        ...document.adoptedStyleSheets,
        OgdsAccordion._sheet,
      ];
    }
  }

  render() {
    return nothing;
  }
}

defineCustomElement("ogds-accordion", OgdsAccordion);
