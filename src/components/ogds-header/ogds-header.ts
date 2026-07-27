import { LitElement, css, html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";

import styles from "./ogds-header.css";
import iconMenu from "../../shared/icons/menu.svg";
import iconClose from "../../shared/icons/close.svg";

import { adoptTokenStyles } from "../../core/token-styles";
import { defineCustomElement } from "../../utils";

const DESKTOP_QUERY = "(width >= 64rem)";

export type OgdsHeaderVariant = "basic" | "extended";

/**
 * @summary A responsive site header, styled to match the USWDS basic and extended header patterns.
 *
 * @slot logo - The site logo/wordmark, typically a link to the homepage.
 * @slot info - Optional. A banner/alert row shown between the navbar and the navigation drawer.
 * @slot nav-primary - Expects an `<ogds-primary-nav>` with the site's primary section links.
 * @slot notifications - Optional. Content (e.g. an account or notifications indicator) shown alongside the primary nav.
 * @slot nav-secondary - Optional. Secondary links and/or a search form. At desktop widths (extended variant), shown aligned with the logo; below the desktop breakpoint it folds into the drawer with the primary nav.
 *
 * @cssprop --ogds-header-menu-btn-background-color - Background color of the menu button.
 * @cssprop --ogds-header-menu-btn-color - Text/icon color of the menu button.
 * @cssprop --ogds-header-nav-background-color - Background color of the navigation drawer.
 * @cssprop --ogds-header-overlay-color - Color of the backdrop behind the open drawer.
 * @cssprop --ogds-header-divider-color - Color of hairline dividers.
 * @cssprop --ogds-header-drawer-width - Width of the navigation drawer below the desktop breakpoint.
 *
 * @element ogds-header
 */
export class OgdsHeader extends LitElement {
  @property({ reflect: true }) variant: OgdsHeaderVariant = "extended";

  private _desktopQuery: MediaQueryList | null = null;
  private _navDialog: HTMLDialogElement | null = null;
  private _menuBtn: HTMLButtonElement | null = null;

  static styles = [
    css`
      :host {
        --ogds-header-icon-close: url("${unsafeCSS(iconClose)}");
        --ogds-header-icon-menu: url("${unsafeCSS(iconMenu)}");
      }
    `,
    styles,
  ];

  override connectedCallback() {
    super.connectedCallback();
    adoptTokenStyles();

    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "banner");
    }

    if (typeof matchMedia === "function") {
      this._desktopQuery = matchMedia(DESKTOP_QUERY);
      this._desktopQuery.addEventListener("change", this._onViewportChange);
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._desktopQuery?.removeEventListener("change", this._onViewportChange);
  }

  override firstUpdated() {
    this._navDialog = this.renderRoot.querySelector("dialog");
    this._menuBtn = this.renderRoot.querySelector(".menu-btn");
    this._syncNavToViewport();
  }

  private _isDesktop() {
    return this._desktopQuery?.matches ?? true;
  }

  private _onViewportChange = () => this._syncNavToViewport();

  private _syncNavToViewport() {
    const dialog = this._navDialog;
    if (!dialog) return;

    if (this._isDesktop()) {
      if (dialog.open && dialog.matches(":modal")) {
        dialog.close();
      }
      if (!dialog.open) {
        dialog.show();
      }
      this._menuBtn?.setAttribute("aria-expanded", "false");
    } else if (dialog.open && !dialog.matches(":modal")) {
      dialog.classList.add("no-transition");
      dialog.close();
      requestAnimationFrame(() => dialog.classList.remove("no-transition"));
    }
  }

  private _onMenuBtnClick() {
    this._navDialog?.showModal();
    this._menuBtn?.setAttribute("aria-expanded", "true");
  }

  private _onCloseBtnClick() {
    this._navDialog?.close();
  }

  private _onDialogClose() {
    if (this._isDesktop()) return;
    this._menuBtn?.setAttribute("aria-expanded", "false");
  }

  /** Clicking the backdrop (outside the drawer's own box) closes it, like clicking the USWDS overlay. */
  private _onDialogClick(event: MouseEvent) {
    if (event.target === this._navDialog) {
      this._navDialog?.close();
    }
  }

  private _onOptionalSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    const wrapper = slot.parentElement;
    if (!wrapper) return;
    wrapper.hidden = slot.assignedNodes({ flatten: true }).length === 0;
  }

  render() {
    return html`
      <div class="navbar">
        <div class="logo"><slot name="logo"></slot></div>
        <button
          type="button"
          class="menu-btn"
          aria-controls="nav"
          aria-expanded="false"
          @click=${this._onMenuBtnClick}
        >
          Menu
        </button>
      </div>
      <div class="info" hidden>
        <slot name="info" @slotchange=${this._onOptionalSlotChange}></slot>
      </div>
      <dialog
        id="nav"
        class="nav"
        aria-label="Header navigation"
        @close=${this._onDialogClose}
        @click=${this._onDialogClick}
      >
        <button
          type="button"
          class="nav-close"
          aria-label="Close menu"
          @click=${this._onCloseBtnClick}
        ></button>
        <div class="nav-primary-row">
          <div class="nav-primary"><slot name="nav-primary"></slot></div>
          <div class="notifications" hidden>
            <slot
              name="notifications"
              @slotchange=${this._onOptionalSlotChange}
            ></slot>
          </div>
        </div>
        <nav class="nav-secondary" aria-label="Secondary navigation">
          <slot
            name="nav-secondary"
            @slotchange=${this._onOptionalSlotChange}
          ></slot>
        </nav>
      </dialog>
    `;
  }
}

defineCustomElement("ogds-header", OgdsHeader);
