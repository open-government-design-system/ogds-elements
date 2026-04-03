import { LitElement, nothing } from "lit";

import styles from "./ogds-accordion.css";
import iconChevronDown from "../../shared/icons/expand_more.svg";
import iconChevronUp from "../../shared/icons/expand_less.svg";
import iconPlus from "../../shared/icons/add.svg";
import iconMinus from "../../shared/icons/remove.svg";

import { adoptTokenStyles } from "../../core/token-styles";
import { defineCustomElement } from "../../utils";

/**
 * @summary The ogds-accordion component.
 *
 * Apply these classes to `<ogds-accordion>` to enable variants:
 * - `bordered` — adds a border to expanded content
 * - `with-icon` — shows a chevron icon on each summary
 * - `with-icon plus` — uses plus/minus icons instead of chevrons
 * - `with-icon right` — aligns the icon to the right
 *
 * @cssprop --ogds-accordion-border - Border used in the bordered variant.
 * @cssprop --ogds-accordion-content-padding - Padding for the expanded content area.
 * @cssprop --ogds-accordion-icon-closed - Icon shown when a panel is closed. Defaults to a chevron pointing down. CSS-only users must set this to a url() value pointing to their own icon asset.
 * @cssprop --ogds-accordion-icon-open - Icon shown when a panel is open. Defaults to a chevron pointing up. CSS-only users must set this to a url() value pointing to their own icon asset.
 * @slot - The default (only) slot for the <ogds-accordion> expects one or more plain HTML <details> elements.
 * @element ogds-accordion
 */
export class OgdsAccordion extends LitElement {
  /** @ignore */
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
