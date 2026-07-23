import { LitElement, nothing } from "lit";

import styles from "./ogds-primary-nav.css";
import iconChevronDown from "../../shared/icons/expand_more.svg";
import iconChevronUp from "../../shared/icons/expand_less.svg";

import { adoptTokenStyles } from "../../core/token-styles";
import { defineCustomElement } from "../../utils";

let instanceCount = 0;

/**
 * @summary A responsive primary navigation list, styled to match the USWDS primary nav.
 *
 * Author the nav as a single top-level `<ul>` of `<li>` items. A plain link item
 * should contain an `<a>`. A submenu item should contain a `<details>` with a
 * `<summary>` (the toggle) followed by a nested `<ul>` of `<a>` links — no
 * JavaScript is required for submenus to open and close.
 *
 * Add `aria-current="page"` to the `<a>` for the current page to show the
 * current-page indicator.
 *
 * This component only handles the nav's own layout: a stacked list that
 * reflows into a horizontal bar with dropdown submenus at the desktop
 * breakpoint. Hiding the nav behind a menu button on narrow viewports is a
 * parent component's job (e.g. a future `ogds-header`), since that also owns
 * the trigger button, its `aria-expanded` state, and how the reveal looks.
 *
 * @cssprop --ogds-primary-nav-current-indicator-color - Color of the bar under the current page's link.
 * @cssprop --ogds-primary-nav-focus-outline-color - Focus outline color.
 * @cssprop --ogds-primary-nav-font-family - Font family for nav text.
 * @cssprop --ogds-primary-nav-font-size - Font size for nav text.
 * @cssprop --ogds-primary-nav-link-color - Text color for links and submenu toggles.
 * @cssprop --ogds-primary-nav-link-hover-background-color - Background color on hover below the desktop breakpoint.
 * @cssprop --ogds-primary-nav-link-hover-color - Text color on hover at the desktop breakpoint.
 * @cssprop --ogds-primary-nav-submenu-background-color - Background color of a submenu panel, and of its open toggle at the desktop breakpoint.
 * @cssprop --ogds-primary-nav-submenu-link-color - Text color for links inside a submenu.
 *
 * @slot - Expects a single `<ul>` of `<li>` items, each containing either an `<a>` or a `<details>` submenu.
 * @element ogds-primary-nav
 */
export class OgdsPrimaryNav extends LitElement {
  /** @ignore */
  private static _sheet: CSSStyleSheet | null = null;

  private readonly _instanceName = `ogds-primary-nav-${++instanceCount}`;
  private _submenus: HTMLDetailsElement[] = [];

  override createRenderRoot() {
    return this;
  }

  override connectedCallback() {
    super.connectedCallback();
    adoptTokenStyles();
    if (!OgdsPrimaryNav._sheet) {
      OgdsPrimaryNav._sheet = new CSSStyleSheet();
      OgdsPrimaryNav._sheet.replaceSync(
        `ogds-primary-nav, .ogds-primary-nav {
          --ogds-primary-nav-icon-chevron-down: url("${iconChevronDown}");
          --ogds-primary-nav-icon-chevron-up: url("${iconChevronUp}");
        }\n` + styles.cssText,
      );
      document.adoptedStyleSheets = [
        ...document.adoptedStyleSheets,
        OgdsPrimaryNav._sheet,
      ];
    }

    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "navigation");
    }
    if (
      !this.hasAttribute("aria-label") &&
      !this.hasAttribute("aria-labelledby")
    ) {
      this.setAttribute("aria-label", "Primary navigation");
    }

    this._submenus = Array.from(
      this.querySelectorAll<HTMLDetailsElement>(":scope > ul > li > details"),
    );
    this._submenus.forEach((details) => {
      if (!details.hasAttribute("name")) {
        details.setAttribute("name", this._instanceName);
      }
    });

    document.addEventListener("click", this._onDocumentClick);
    this.addEventListener("keydown", this._onKeydown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this._onDocumentClick);
    this.removeEventListener("keydown", this._onKeydown);
  }

  private _onDocumentClick = (event: MouseEvent) => {
    const target = event.target as Node | null;
    this._submenus.forEach((details) => {
      if (details.open && target && !details.contains(target)) {
        details.open = false;
      }
    });
  };

  private _onKeydown = (event: KeyboardEvent) => {
    if (event.key !== "Escape") return;

    const openSubmenu = this._submenus.find((details) => details.open);
    if (openSubmenu) {
      openSubmenu.open = false;
      openSubmenu.querySelector<HTMLElement>(":scope > summary")?.focus();
      event.stopPropagation();
    }
  };

  render() {
    return nothing;
  }
}

defineCustomElement("ogds-primary-nav", OgdsPrimaryNav);
