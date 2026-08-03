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
 * @slot nav-primary - Expects an `<ogds-primary-nav>` with the site's primary section links, or some other primary nav implementation.
 * @slot notifications - Optional. Content like an account or notifications indicator shown alongside the primary nav.
 * @slot nav-secondary - Optional. Secondary links and/or a search form. At desktop widths (extended variant), shown aligned with the logo; below the desktop breakpoint it folds into the drawer with the primary nav.
 *
 * @cssprop --ogds-header-navbar-background-color - Background color of the navbar row (logo + menu button). Transparent by default.
 * @cssprop --ogds-header-info-background-color - Background color of the info row. Transparent by default.
 * @cssprop --ogds-header-nav-primary-row-background-color - Background color of the row containing the primary nav and notifications. Transparent by default.
 * @cssprop --ogds-header-nav-secondary-background-color - Background color of the secondary nav area. Transparent by default.
 * @cssprop --ogds-header-menu-btn-background-color - Background color of the menu button.
 * @cssprop --ogds-header-menu-btn-color - Text/icon color of the menu button.
 * @cssprop --ogds-header-nav-background-color - Background color of the navigation drawer.
 * @cssprop --ogds-header-overlay-color - Color of the backdrop behind the open drawer.
 * @cssprop --ogds-header-divider-color - Color of hairline dividers/borders.
 * @cssprop --ogds-header-drawer-width - Width of the navigation drawer below the desktop breakpoint.
 * @cssprop --ogds-header-icon-close-size - Height and width of the drawer's close icon.
 * @cssprop --ogds-header-icon-menu-size - Height and width of the menu button's icon.
 * @cssprop --ogds-header-max-width - Max width of the header's content, centered with auto margins (like a USWDS grid container). Unset by default, so content spans the full width of the host.
 * @cssprop --ogds-header-padding-inline - Horizontal gutter applied alongside --ogds-header-max-width. Unset by default.
 * @cssprop --ogds-header-row-gap - Vertical gap between the rows of the header grid (logo/secondary nav, info, and primary nav).
 *
 * @element ogds-header
 */
export class OgdsHeader extends LitElement {
  @property({ reflect: true }) variant: OgdsHeaderVariant = "extended";

  /** @ignore */
  private _desktopQuery: MediaQueryList | null = null;
  /** @ignore */
  private _navDialog: HTMLDialogElement | null = null;
  /** @ignore */
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

  /** @ignore */
  private _isDesktop() {
    return this._desktopQuery?.matches ?? true;
  }

  /** @ignore */
  private _onViewportChange = () => this._syncNavToViewport();

  /** @ignore */
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

  /** @ignore */
  private _onMenuBtnClick() {
    if (this._navDialog?.open) return;
    this._navDialog?.showModal();
    this._menuBtn?.setAttribute("aria-expanded", "true");
  }

  /** @ignore */
  private _onCloseBtnClick() {
    this._navDialog?.close();
  }

  /** @ignore */
  private _onDialogClose() {
    if (this._isDesktop()) return;
    this._menuBtn?.setAttribute("aria-expanded", "false");
  }

  /**
   * @ignore
   */
  private _onDialogClick(event: MouseEvent) {
    if (event.target === this._navDialog) {
      this._navDialog?.close();
    }
  }

  /** @ignore */
  private _onOptionalSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    const wrapper = slot.parentElement;
    if (!wrapper) return;
    wrapper.hidden = slot.assignedNodes({ flatten: true }).length === 0;
  }

  render() {
    return html`
      <div class="content">
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
          <nav class="nav-secondary" aria-label="Secondary navigation">
            <slot
              name="nav-secondary"
              @slotchange=${this._onOptionalSlotChange}
            ></slot>
          </nav>
          <div class="nav-primary-row">
            <div class="nav-primary"><slot name="nav-primary"></slot></div>
            <div class="notifications" hidden>
              <slot
                name="notifications"
                @slotchange=${this._onOptionalSlotChange}
              ></slot>
            </div>
          </div>
        </dialog>
      </div>
    `;
  }
}

defineCustomElement("ogds-header", OgdsHeader);
