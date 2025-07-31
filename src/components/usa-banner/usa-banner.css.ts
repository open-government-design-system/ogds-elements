import type { CSSResultGroup } from "lit";
import { unsafeCSS, css } from "lit";

import usaBannerStyleText from "./usa-banner.css?raw";

export const bannerStyles: CSSResultGroup = [
  unsafeCSS(usaBannerStyleText),
  css`
    :host {
      --theme-banner-background-color: var(--usa-base-lightest, #f0f0f0);
      --theme-banner-font-family: var(--usa-font-ui, system-ui, sans-serif);
      --theme-banner-link-color: var(--theme-link-color, #005ea2);
      --theme-banner-link-color-hover: var(--theme-link-hover-color, #1a4480);
      --theme-banner-max-width: var(--usa-banner-max-width, 1200px);

      --usa-icon-expand-more: url("/src/shared/icons/expand_more.svg");
      --usa-icon-expand-less: url("/src/shared/icons/expand_less.svg");
      --usa-icon-close: url("/src/shared/icons/close.svg");
      --usa-icon-lock: url("/src/shared/icons/lock.svg");
    }

    * {
      box-sizing: border-box;
    }

    section {
      background-color: var(--theme-banner-background-color);
      font-family: var(--theme-banner-font-family);
    }

    .inner {
      flex-wrap: nowrap;
    }

    /* Allows banner action to inherit font variable. */
    section .usa-accordion {
      font-family: inherit;
    }

    button {
      color: var(--theme-banner-link-color);
      cursor: pointer;
      font-family: inherit;
    }

    button:hover {
      color: var(--theme-banner-link-hover-color);
    }

    /* In USWDS close icon is set via max-width media query, flipped it here. */
    button::after,
    .header-action::after {
      background-image: var(--usa-icon-expand-more);
      mask-image: var(--usa-icon-expand-more);
    }

    button[aria-expanded="true"]::after {
      background-image: var(--usa-icon-close);
      mask-image: var(--usa-icon-close);
    }

    /**
     * HTTPS section lock icon.
     *
     * Rewrote styles to avoid reliance of SASS mixins & functions.
     *
     * Height and width taken from calculated output in USWDS 3 banner.
     */
    .icon-lock {
      background-image: var(--usa-icon-lock);
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      display: inline-block;
      height: 1.5ex;
      mask-image: var(--usa-icon-lock);
      mask-position: center;
      mask-repeat: no-repeat;
      mask-size: cover;
      vertical-align: middle;
      width: 1.21875ex;
    }

    @media all and (min-width: 40em) {
      button[aria-expanded="true"]::after {
        background-image: var(--usa-icon-expand-less);
        mask-image: var(--usa-icon-expand-less);
      }
    }
  `,
];
