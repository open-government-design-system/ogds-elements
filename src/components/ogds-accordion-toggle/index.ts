import { LitElement, html } from "lit";
import { adoptTokenStyles } from "../../core/token-styles";
import { defineCustomElement } from "../../utils";

import { property, state } from "lit/decorators.js";
import styles from "./ogds-accordion-toggle.css";

/**
 * @summary A button that expands or collapses all panels in an associated `<ogds-accordion>`.
 *
 * @attribute {string} controls - The `id` of the `<ogds-accordion>` to control. Required.
 * @attribute {string} expand-label - Button label when all panels are collapsed. Defaults to "Expand All".
 * @attribute {string} collapse-label - Button label when one or more panels are open. Defaults to "Collapse All".
 *
 * @csspart button - The toggle button.
 *
 * @element ogds-accordion-toggle
 */
export class OgdsAccordionToggle extends LitElement {
  /** @ignore */
  private static _sheet: CSSStyleSheet | null = null;

  @property({ type: String, attribute: "controls" })
  controls = "";

  @property({ type: String, attribute: "expand-label" })
  expandLabel = "Expand All";

  @property({ type: String, attribute: "collapse-label" })
  collapseLabel = "Collapse All";

  @state()
  private _anyOpen = false;

  override connectedCallback() {
    super.connectedCallback();
    adoptTokenStyles();
    if (!OgdsAccordionToggle._sheet) {
      OgdsAccordionToggle._sheet = new CSSStyleSheet();
      OgdsAccordionToggle._sheet.replaceSync(styles.cssText);
      document.adoptedStyleSheets = [
        ...document.adoptedStyleSheets,
        OgdsAccordionToggle._sheet,
      ];
    }
    if (this.controls == "") {
      console.error(
        "<ogds-accordion-toggle>: Component must have a controls attribute with the ID" +
          "of an <ogds-accordion> component",
      );
      return;
    }
    this._anyOpen = this.checkOpen();
  }

  checkOpen() {
    const accordionEl = document.getElementById(this.controls);
    const openDetails = accordionEl?.querySelector("details[open]");
    return !!openDetails;
  }

  toggleAll() {
    const accordionEl = document.getElementById(this.controls);
    if (!accordionEl) {
      console.error(
        "<ogds-accordion-toggle>: Unable to get an accordion component with the ID" +
          " specfied in the controls attribute",
      );
      return;
    }

    const detailsEls = Array.from(accordionEl.getElementsByTagName("details"));
    const anyOpen = detailsEls.some((d) => d.hasAttribute("open"));
    if (!anyOpen) {
      detailsEls.forEach((d) => d.toggleAttribute("open", true));
    } else {
      detailsEls.forEach((d) => d.toggleAttribute("open", false));
    }
    this._anyOpen = !anyOpen;
  }

  protected override render(): unknown {
    return html`
      <button @click="${this.toggleAll}" part="button">
        ${this._anyOpen ? this.collapseLabel : this.expandLabel}
      </button>
    `;
  }
}

defineCustomElement("ogds-accordion-toggle", OgdsAccordionToggle);
