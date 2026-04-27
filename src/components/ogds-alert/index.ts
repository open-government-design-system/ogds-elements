import { css, html, LitElement, nothing } from "lit";
import {
  customElement,
  property,
  queryAssignedNodes,
  state,
} from "lit/decorators.js";
import stylesBaseVariables from "./base-variables.css";
import styles from "./ogds-alert.css";

/**
 * @summary The ogds-alert component.
 *
 * @attribute {string} type - The type of alert (info, warning, etc)
 * @attribute {string} noIcon - Use this attribute to hide the icon
 *
 * @slot heading - Text for the heading. Make sure to specify the correct heading level (h2, h3, etc)
 * @slot body - Body content for the alert. Can contain HTML (links, etc).
 *
 * @tagname ogds-alert
 */

@customElement("ogds-alert")
export class OGDSAlert extends LitElement {
  @property()
  type = "info";

  @property({ type: Boolean, attribute: "no-icon" })
  noIcon = false;

  @queryAssignedNodes({ slot: "heading", flatten: true })
  accessor _headingNodes: Node[] = [];

  @state()
  private accessor _hasHeader = false;

  slotChange() {
    this._hasHeader = this._headingNodes.length > 0;
  }

  static styles = [
    css`
      :host {
        /** Icons */
        --ogds-icon-check-circle: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E");
        --ogds-icon-warning: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z'/%3E%3C/svg%3E");
        --ogds-icon-info: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z' /%3E%3C/svg%3E");
        --ogds-icon-error: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'/%3E%3C/svg%3E");
      }
    `,
    stylesBaseVariables,
    styles,
  ];

  render() {
    return html`
      <div class="ogds-alert ogds-alert--${this.type} ${this.noIcon ? "ogds-alert--no-icon" : ""} ${this._hasHeader ? "" : "ogds-alert--slim"}">
        <div class="ogds-alert__body">
          <div class="ogds-alert__heading" style="${this._hasHeader ? "" : "display:none;"}">
            <img class="ogds-alert__icon" aria-hidden="true"></img>
            <div>
              <slot name="heading" @slotchange=${() => this.slotChange()}></slot>
            </div>
          </div>
          <p class="ogds-alert__text">
            ${
              this._hasHeader
                ? nothing
                : html`<img class="ogds-alert__icon" aria-hidden="true"></img>`
            }
            <slot name="body"></slot>
            <slot></slot>
          </p>
        </div>
      </div>
    `;
  }
}
