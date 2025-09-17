import type { CSSResultGroup } from "lit";
import { css } from "lit";

export const bannerStyles: CSSResultGroup = [
  css`
    :host {
      --usa-color-base-lightest: #f0f0f0;
      --usa-color-base-lighter: #dfe1e2;
      --usa-color-blue-60v: #005ea2;
      --usa-color-transparent: transparent;

      --usa-banner-background-color: var(--usa-color-base-lightest);
      --usa-banner-font-family:
        system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Helvetica, Arial, sans-serif;
      --usa-banner-link-color: var(--usa-color-blue-60v, #005ea2);
      --usa-banner-link-hover-color: #1a4480;
      --usa-banner-max-width: 1200px;
      --usa-banner-font-size-xs: 0.75rem;
      --usa-banner-font-size-sm: 0.875rem;
      --usa-banner-font-size-base: 0.94rem;
      --usa-banner-line-height-base: 1.6;
      --usa-banner-line-height-sm: 1.2;

      --usa-spacing-05: 0.25rem;
      --usa-spacing-1: 0.5rem;
      --usa-spacing-2: 1rem;
      --usa-spacing-3: 1.5rem;
      --usa-spacing-4: 2rem;
      --usa-spacing-5: 2.5rem;
      --usa-spacing-6: 3rem;

      --usa-size-touch-target: 3rem;

      --usa-site-margins-mobile-width: 1rem;
      --usa-site-margins-width: 2rem;

      --usa-breakpoint-tablet: 40rem;

      --theme-banner-background-color: var(--usa-banner-background-color);
      --theme-banner-font-family: var(--usa-banner-font-family);
      --theme-banner-link-color: var(--usa-banner-link-color);
      --theme-banner-link-hover-color: var(--usa-banner-link-hover-color);
      --theme-banner-max-width: var(--usa-banner-max-width);

      --usa-icon-expand-more: url("/src/shared/icons/expand_more.svg");
      --usa-icon-expand-less: url("/src/shared/icons/expand_less.svg");
      --usa-icon-close: url("/src/shared/icons/close.svg");
      --usa-icon-lock: url("/src/shared/icons/lock.svg");
    }
    * {
      box-sizing: border-box;
    }

    section {
      font-family: var(--theme-banner-font-family);
      box-sizing: border-box;
      background-color: var(--theme-banner-background-color);
      font-size: var(--usa-banner-font-size-xs);
    }

    section *,
    section *::before,
    section *::after {
      box-sizing: border-box;
    }

    @media (min-width: 40em) {
      section {
        font-size: var(--usa-banner-font-size-xs);
        padding-bottom: 0;
      }
    }

    section .usa-accordion {
      font-family: inherit;
    }
    section .grid-row {
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(min(100%, calc(var(--usa-breakpoint-tablet) / 2)), 1fr)
      );
      gap: var(--usa-spacing-3);
    }
    
    .grid-col-auto {
      flex: 0 1 auto;
    }
    
    .grid-col-fill {
      flex: 1 1 0%;
      width: auto;
      max-width: 100%;
      min-width: 1px;
    }
    
    @media (min-width: 40em) {
      .tablet\\:grid-col-auto {
        flex: 0 1 auto;
        width: auto;
        max-width: 100%;
      }
    }

    section .tablet\\:grid-col-6 {
      flex: 0 0 auto;
      width: 100%;
      gap: var(--usa-spacing-1);
    }

    header,
    .content {
      color: #1b1b1b;
    }

    .content {
      max-width: var(--usa-banner-max-width);
      line-height: var(--usa-banner-line-height-base);
      margin-left: auto;
      margin-right: auto;
      padding-left: var(--usa-spacing-1);
      padding-right: var(--usa-spacing-1);
      padding-bottom: var(--usa-spacing-2);
      padding-top: var(--usa-spacing-05);
      background-color: var(--usa-color-transparent);
      font-size: var(--usa-banner-font-size-base);
      overflow: hidden;
      width: 100%;
    }

    @media (min-width: 40em) {
      .content {
        padding-left: var(--usa-spacing-1);
        padding-right: var(--usa-spacing-1);
        padding-top: var(--usa-spacing-3);
        padding-bottom: var(--usa-spacing-3);
      }
    } 
      
    @media (min-width: 64em) {
      .content {
        padding-left: var(--usa-spacing-4);
        padding-right: var(--usa-spacing-4);
        padding-top: var(--usa-spacing-3);
        padding-bottom: var(--usa-spacing-3);
      }
    }

    .content p:first-child {
      margin: 0;
    }

    .inner {
      padding-left: var(--usa-spacing-2);
      padding-right: 0;
      max-width: var(--usa-banner-max-width);
      margin-left: auto;
      margin-right: auto;
      display: flex;
      flex-wrap: nowrap;
      align-items: flex-start;
    }

    @media (min-width: 40em) {
      .inner {
        align-items: center;
      }
    }
    
    @media (min-width: 64em) {
      .inner {
        padding-left: var(--usa-spacing-4);
        padding-right: var(--usa-spacing-4);
      }
    }

    header {
      padding-top: var(--usa-spacing-1);
      padding-bottom: var(--usa-spacing-1);
      font-size: var(--usa-banner-font-size-xs);
      font-weight: 400;
      min-height: var(--usa-size-touch-target);
      position: relative;
    }

    @media (min-width: 40em) {
      header {
        padding-top: var(--usa-spacing-05);
        padding-bottom: var(--usa-spacing-05);
        min-height: 0;
      }
    }

    .header-text {
      margin-top: 0;
      margin-bottom: 0;
      font-size: var(--usa-banner-font-size-xs);
      line-height: var(--usa-banner-line-height-sm);
    }

    .header-flag {
      float: left;
      margin-right: var(--usa-spacing-1);
      width: var(--usa-spacing-2);
      padding-top: 0;
    }

    @media (min-width: 40em) {
      .header-flag {
        margin-right: var(--usa-spacing-1);
        padding-top: 0;
      }
    }

    .header-action {
      color: var(--usa-banner-link-color);
      text-decoration: underline;
      background: none;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      line-height: var(--usa-banner-line-height-sm);
      margin-bottom: 0;
      margin-top: 2px;
    }

    .header-action:hover {
      color: var(--usa-banner-link-hover-color);
    }

    .header-action::after {
      content: "";
      display: inline-block;
      width: 1rem;
      height: 1rem;
      background-color: currentColor;
      mask-size: 1rem 1rem;
      mask-repeat: no-repeat;
      mask-position: center;
      background-image: var(--usa-icon-expand-more);
      mask-image: var(--usa-icon-expand-more);
      vertical-align: middle;
    }

    .expanded .header-action {
      display: none;
    }

    @media (min-width: 40em) {
      .header-action {
        display: none;
      }
    }

    @media (forced-colors: active) {
      .header-action {
        color: LinkText;
      }

      .header-action::after {
        background-color: ButtonText;
      }
    }

    header.expanded {
      padding-right: calc(var(--usa-size-touch-target) + var(--usa-spacing-1));
    }

    @media (min-width: 40em) {
      header.expanded {
        background-color: transparent;
        display: block;
        font-size: var(--usa-banner-font-size-sm);
        font-weight: 400;
        min-height: 0;
        padding-right: 0;
      }
    }

    header.expanded .inner {
      margin-left: 0;
    }

    @media (min-width: 40em) {
      header.expanded .inner {
        margin-left: auto;
      }
    }

    header.expanded .header-action {
      display: none;
    }

    button {
      background: none;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      color: var(--theme-banner-link-color);
      text-decoration: underline;
      display: block;
      font-size: var(--usa-banner-font-size-xs);
      height: auto;
      line-height: var(--usa-banner-line-height-sm);
      padding-top: 0;
      padding-left: 0;
      text-decoration: none;
      width: auto;
    }

    button:hover {
      color: var(--theme-banner-link-hover-color);
    }

    @media (max-width: 39.99em) {
      button {
        width: 100%;
      }

      button:enabled:focus {
        outline-offset: -0.25rem;
      }
    }

    @media (min-width: 40em) {
      button {
        position: relative;
        display: inline;
        margin-left: var(--usa-spacing-1);
        left: auto;
        top: auto;
        bottom: auto;
      }

      button::after {
        content: "";
        display: inline-block;
        width: 1rem;
        height: 1rem;
        margin-block: 0;
        background-color: currentColor;
        mask-size: contain;
        mask-repeat: no-repeat;
        mask-position: center;
        position: absolute;
        top: 0;
        right: -16px;
        background-image: var(--usa-icon-expand-more);
        mask-image: var(--usa-icon-expand-more);
      }

      button:hover {
        text-decoration: none;
      }
    }

    @media (forced-colors: active) {
      button::after,
      button:hover::after {
        background-color: ButtonText;
      }
    }

    button[aria-expanded="false"],
    button[aria-expanded="false"]:hover,
    button[aria-expanded="true"],
    button[aria-expanded="true"]:hover {
      background-image: none;
    }

    @media (forced-colors: active) {
      button[aria-expanded="false"]::before,
      button[aria-expanded="false"]:hover::before,
      button[aria-expanded="true"]::before,
      button[aria-expanded="true"]:hover::before {
        content: none;
      }
    }

    @media (max-width: 39.99em) {
      button[aria-expanded="true"]::before {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        background-color: var(--usa-color-base-lighter);
        content: "";
        display: block;
        height: var(--usa-size-touch-target);
        width: var(--usa-size-touch-target);
      }

      button[aria-expanded="true"]::after {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        content: "";
        display: block;
        width: var(--usa-size-touch-target);
        height: var(--usa-size-touch-target);
        background-color: var(--usa-color-blue-60v);
        mask-size: 1.5rem 1.5rem;
        mask-repeat: no-repeat;
        mask-position: center;
        background-image: var(--usa-icon-close);
        mask-image: var(--usa-icon-close);
      }
    }

    @media (min-width: 40em) {
      button[aria-expanded="true"] {
        height: auto;
        padding: 0;
        position: relative;
      }

      button[aria-expanded="true"]::after,
      button[aria-expanded="true"]:hover::after {
        position: absolute;
        background-image: var(--usa-icon-expand-less);
        mask-image: var(--usa-icon-expand-less);
      }
    }

    @media (forced-colors: active) {
      button[aria-expanded="true"]::after,
      button[aria-expanded="true"]:hover::after {
        background-color: ButtonText;
      }
    }

    .button-text {
      position: absolute;
      left: -999em;
      right: auto;
      text-decoration: underline;
    }

    @media (min-width: 40em) {
      .button-text {
        position: static;
        left: auto;
        right: auto;
        clip: auto;
        display: inline;
      }
    }

    @media (forced-colors: active) {
      .button-text {
        color: LinkText;
      }
    }

    .guidance {
      display: flex;
      align-items: flex-start;
      max-width: 72ch;
      padding-top: var(--usa-spacing-2);
    }

    @media (min-width: 40em) {
      .guidance {
        padding-top: 0;
      }
    }

    .icon {
      width: var(--usa-spacing-5);
    }

    .usa-media-block__img {
      width: var(--usa-spacing-5);
    }

    .usa-media-block__body {
      flex: 1;
    }

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

    .usa-js-loading .content {
      position: absolute;
      left: -999em;
      right: auto;
    }
  `,
];
