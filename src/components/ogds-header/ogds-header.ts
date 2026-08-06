import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import { property, state } from "lit/decorators.js";

import cssFileStyles from "./ogds-header.css";
import iconMenu from "../../shared/icons/menu.svg";
import iconClose from "../../shared/icons/close.svg";

import { adoptTokenStyles } from "../../core/token-styles";
import { defineCustomElement } from "../../utils";

const DESKTOP_QUERY = "(width >= 64rem)";

const localStyles = css`
  :host {
    --ogds-header-icon-close: url("${unsafeCSS(iconClose)}");
    --ogds-header-icon-menu: url("${unsafeCSS(iconMenu)}");
  }
`;

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
 * @cssprop --ogds-header-navbar-background-color - Background color of the navbar row (logo + menu button). Transparent by default. At desktop widths, paints edge-to-edge ("full-bleed") even though the row's content stays in the constrained column.
 * @cssprop --ogds-header-info-background-color - Background color of the info row. Transparent by default. At desktop widths, paints edge-to-edge ("full-bleed") even though the row's content stays in the constrained column.
 * @cssprop --ogds-header-nav-primary-row-background-color - Background color of the row containing the primary nav and notifications. Transparent by default. At desktop widths, paints edge-to-edge ("full-bleed") even though the row's content stays in the constrained column.
 * @cssprop --ogds-header-nav-secondary-background-color - Background color of the secondary nav area. At desktop widths, paints edge-to-edge ("full-bleed") on the outward-facing side (away from the row it shares with the navbar in extended, or the primary nav in basic). Defaults to that other row's own background color (falling back to transparent if neither is set), so setting just one of the two already produces one shared background color.
 * @cssprop --ogds-header-menu-btn-background-color - Background color of the menu button.
 * @cssprop --ogds-header-menu-btn-color - Text/icon color of the menu button.
 * @cssprop --ogds-header-menu-btn-padding-inline-end - The menu button's own edge inset below the desktop breakpoint, independent of the logo's. Defaults to --ogds-header-padding-inline (matching the logo). Set to 0 to make the button flush with the viewport edge while the logo keeps its normal inset.
 * @cssprop --ogds-header-nav-background-color - Background color of the navigation drawer.
 * @cssprop --ogds-header-overlay-color - Color of the backdrop behind the open drawer.
 * @cssprop --ogds-header-divider-color - Color of borders (e.g. the info row's border, and the default for --ogds-header-nav-primary-row-divider-color).
 * @cssprop --ogds-header-nav-primary-row-divider-color - Color of the primary-nav row's own top divider. Defaults to --ogds-header-divider-color. Set independently (e.g. to transparent) to suppress just this divider without affecting the info row's.
 * @cssprop --ogds-header-drawer-width - Width of the navigation drawer below the desktop breakpoint.
 * @cssprop --ogds-header-icon-close-size - Height and width of the drawer's close icon.
 * @cssprop --ogds-header-icon-menu-size - Height and width of the menu button's icon.
 * @cssprop --ogds-header-max-width - Max width of the header's content column, centered with auto margins (like a USWDS .grid-container). Unset by default, so content spans the full width of the host. Sizing matches .grid-container's convention: the column itself is max-width wide, and --ogds-header-padding-inline is added outside that (rendered width caps at max-width + 2 * padding-inline) — so reuse the same max-width value you use for a page's .grid-container to align this header with it.
 * @cssprop --ogds-header-padding-inline - Horizontal gutter applied alongside --ogds-header-max-width. Unset by default.
 * @cssprop --ogds-header-row-gap - Vertical gap between the rows of the header (logo/secondary nav, info, and primary nav).
 *
 * @csspart logo - Wrapper around the logo slot.
 * @csspart navbar - The navbar row (logo + menu button).
 * @csspart menu-btn - The mobile menu button.
 * @csspart nav-close - The drawer's close button.
 * @csspart info - The info row.
 * @csspart nav-secondary - The secondary nav area.
 * @csspart nav-primary-row - The row containing the primary nav and notifications.
 * @csspart notifications - Wrapper around the notifications slot.
 *
 * @element ogds-header
 */
export class OgdsHeader extends LitElement {
  @property({ reflect: true }) variant: OgdsHeaderVariant = "extended";

  /*
   * Reactive: at desktop widths, nav-secondary/nav-primary/notifications
   * render directly in the layout (no <dialog> involved at all). Below the
   * breakpoint, the same slots render inside a <dialog> instead, opened
   * modally via the menu button. <dialog> is never shown non-modally - that
   * used to be how this component made its content render at desktop too,
   * via `dialog.show()` + `display: contents`, but non-modal show() runs
   * the browser's "dialog focusing steps" regardless of whether a user
   * asked for anything to be focused, which cost a lot of complexity (see
   * git history) to work around. Splitting the desktop/mobile structure
   * like this means <dialog> is only ever used for what it's actually for:
   * the real, user-initiated modal drawer.
   */
  @state() private _isDesktopMode = true;

  /** @ignore */
  private _desktopQuery: MediaQueryList | null = null;

  static styles = [localStyles, cssFileStyles];

  override connectedCallback() {
    super.connectedCallback();
    adoptTokenStyles();

    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "banner");
    }

    if (typeof matchMedia === "function") {
      this._desktopQuery = matchMedia(DESKTOP_QUERY);
      this._isDesktopMode = this._desktopQuery.matches;
      this._desktopQuery.addEventListener("change", this._onViewportChange);
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._desktopQuery?.removeEventListener("change", this._onViewportChange);
  }

  /** @ignore */
  private get _navDialog(): HTMLDialogElement | null {
    return this.renderRoot.querySelector("dialog");
  }

  /** @ignore */
  private get _menuBtn(): HTMLButtonElement | null {
    return this.renderRoot.querySelector(".menu-btn");
  }

  /** @ignore */
  private _onViewportChange = () => {
    const nowDesktop = this._desktopQuery?.matches ?? true;
    if (nowDesktop && !this._isDesktopMode) {
      this._navDialog?.close();
      this._menuBtn?.setAttribute("aria-expanded", "false");
    }
    this._isDesktopMode = nowDesktop;
  };

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
    const wrapper = slot.closest<HTMLElement>("[part]");
    if (!wrapper) return;
    wrapper.hidden = slot.assignedNodes({ flatten: true }).length === 0;
  }

  /** @ignore */
  private _renderNavSecondary() {
    return html`
      <nav
        class="nav-secondary"
        part="nav-secondary"
        aria-label="Secondary navigation"
      >
        <slot
          name="nav-secondary"
          @slotchange=${this._onOptionalSlotChange}
        ></slot>
      </nav>
    `;
  }

  /** @ignore */
  private _renderPrimaryContent() {
    return html`
      <div class="nav-primary"><slot name="nav-primary"></slot></div>
      <div class="notifications" part="notifications" hidden>
        <slot
          name="notifications"
          @slotchange=${this._onOptionalSlotChange}
        ></slot>
      </div>
    `;
  }

  render() {
    const desktop = this._isDesktopMode;
    const extended = this.variant === "extended";

    return html`
      <div class="content">
        <div class="navbar-row" part="navbar">
          <div class="navbar-row-inner">
            <div class="logo" part="logo"><slot name="logo"></slot></div>
            <button
              type="button"
              class="menu-btn"
              part="menu-btn"
              aria-controls="nav"
              aria-expanded="false"
              @click=${this._onMenuBtnClick}
            >
              Menu
            </button>
          </div>
          ${desktop && extended ? this._renderNavSecondary() : nothing}
        </div>

        <div class="info-row" part="info" hidden>
          <div class="info-row-inner">
            <slot name="info" @slotchange=${this._onOptionalSlotChange}></slot>
          </div>
        </div>

        ${
          desktop
            ? html`
                <div class="primary-row" part="nav-primary-row">
                  ${!extended ? this._renderNavSecondary() : nothing}
                  <div class="primary-row-inner">
                    ${this._renderPrimaryContent()}
                  </div>
                </div>
              `
            : html`
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
                    part="nav-close"
                    aria-label="Close menu"
                    @click=${this._onCloseBtnClick}
                  ></button>
                  ${this._renderNavSecondary()}
                  <div class="nav-primary-row" part="nav-primary-row">
                    ${this._renderPrimaryContent()}
                  </div>
                </dialog>
              `
        }
      </div>
    `;
  }
}

defineCustomElement("ogds-header", OgdsHeader);
