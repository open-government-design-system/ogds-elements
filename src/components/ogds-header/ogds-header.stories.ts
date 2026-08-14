import { html } from "lit";
import "./index";
import "../ogds-primary-nav";
import "../ogds-accordion";
import ComponentDocs from "./docs.mdx";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import type { Args } from "storybook/internal/csf";

const { args, argTypes, template } = getStorybookHelpers("ogds-header", {
  excludeCategories: ["methods"],
});

const searchStyles = html`
  <style>
    .example-search {
      display: flex;
    }

    .example-search input[type="search"] {
      border: 1px solid var(--ogds-theme-color-base-dark);
      border-radius: 0;
      border-right: none;
      font-family: var(--ogds-theme-button-font-family);
      height: 2.5rem;
      padding-inline: var(--ogds-spacing-1);
    }

    .example-search button {
      background-color: var(--ogds-theme-button-fill-color);
      border: none;
      border-radius: 0 var(--ogds-theme-button-border-radius)
        var(--ogds-theme-button-border-radius) 0;
      color: var(--ogds-theme-button-text-color);
      cursor: pointer;
      font-family: var(--ogds-theme-button-font-family);
      font-weight: 700;
      height: 2.5rem;
      padding-inline: var(--ogds-spacing-105);
    }

    .example-search button:hover {
      background-color: var(--ogds-theme-color-primary-dark);
    }
  </style>
`;

const secondaryLinksStyles = html`
  <style>
    .example-secondary-links {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .example-secondary-links li + li {
      border-inline-start: 1px solid var(--ogds-theme-color-base-lighter);
      margin-inline-start: var(--ogds-spacing-1);
      padding-inline-start: var(--ogds-spacing-1);
    }

    .example-secondary-links a {
      color: var(--ogds-theme-color-base);
      font-family: var(--ogds-theme-button-font-family);
      font-size: var(--ogds-theme-type-scale-2xs);
      text-decoration: none;
    }

    .example-secondary-links a:hover {
      color: var(--ogds-theme-color-primary);
      text-decoration: underline;
    }
  </style>
`;

const genericPrimaryNav = html`
  <ogds-primary-nav slot="nav-primary">
    <ul>
      <li><a href="#" aria-current="page">Current section</a></li>
      <li>
        <details>
          <summary>Benefits</summary>
          <ul>
            <li><a href="#">Navigation link</a></li>
            <li><a href="#">Navigation link</a></li>
            <li><a href="#">Navigation link</a></li>
            <li><a href="#">Navigation link</a></li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>Resources</summary>
          <ul>
            <li><a href="#">Navigation link</a></li>
            <li><a href="#">Navigation link</a></li>
            <li><a href="#">Navigation link</a></li>
          </ul>
        </details>
      </li>
      <li><a href="#">Simple link</a></li>
    </ul>
  </ogds-primary-nav>
`;

const genericSearch = html`
  <form class="example-search" slot="nav-secondary" role="search">
    <input type="search" aria-label="Search" name="q" />
    <button type="submit">Search</button>
  </form>
`;

// This has to be a string for the args-driven
// stories below (Extended/Basic), since `template()` needs slot content as
// HTML strings rather than lit TemplateResults. Hence no `html` tag
const genericPrimaryNavHTML = `
  <ogds-primary-nav>
    <ul>
      <li><a href="#" aria-current="page">Current section</a></li>
      <li>
        <details>
          <summary>Benefits</summary>
          <ul>
            <li><a href="#">Navigation link</a></li>
            <li><a href="#">Navigation link</a></li>
            <li><a href="#">Navigation link</a></li>
            <li><a href="#">Navigation link</a></li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>Resources</summary>
          <ul>
            <li><a href="#">Navigation link</a></li>
            <li><a href="#">Navigation link</a></li>
            <li><a href="#">Navigation link</a></li>
          </ul>
        </details>
      </li>
      <li><a href="#">Simple link</a></li>
    </ul>
  </ogds-primary-nav>
`;

const genericSearchHTML = `
  <form class="example-search" role="search">
    <input type="search" aria-label="Search" name="q" />
    <button type="submit">Search</button>
  </form>
`;

const secondaryLinksHTML = `
  <ul class="example-secondary-links">
    <li><a href="#">Secondary link</a></li>
    <li><a href="#">Another secondary link</a></li>
  </ul>
`;

export default {
  title: "Components/Header",
  component: "ogds-header",
  tags: ["alpha"],
  args: {
    ...args,
    variant: "extended",
    "logo-slot": `<div><a href="/">Project name</a></div>`,
    "notifications-slot": `<div>Notifications</div>`,
    "nav-secondary-slot": secondaryLinksHTML + genericSearchHTML,
    "nav-primary-slot": genericPrimaryNavHTML,
  },
  argTypes,
  parameters: {
    docs: {
      page: ComponentDocs,
    },
  },
  render: (args: Args) =>
    html`${searchStyles} ${secondaryLinksStyles} ${template(args)}`,
};

export const Extended = {};

export const Basic = {
  args: {
    variant: "basic",
    "notifications-slot": "",
    "nav-secondary-slot": genericSearchHTML,
  },
};

export const FullBleed = {
  name: "Full-bleed rows",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "At desktop widths, background-color custom properties paint their row edge-to-edge automatically, while the row's own content stays inside the `--ogds-header-max-width` column. No extra markup or opt-in is required — this uses the same `--ogds-header-navbar-background-color` and `--ogds-header-nav-primary-row-background-color` props as any other example, just set to colors that contrast with the page.",
      },
    },
  },
  render: () => html`
    ${searchStyles} ${secondaryLinksStyles}
    <style>
      body {
        background-color: var(--ogds-theme-color-base-lightest);
      }

      .full-bleed-example {
        --ogds-header-max-width: 64rem;
        --ogds-header-nav-primary-row-background-color: var(
          --ogds-theme-color-primary-darker
        );
        --ogds-header-navbar-background-color: white;
        --ogds-header-padding-inline: var(--ogds-spacing-2);

        ogds-primary-nav {
          --ogds-primary-nav-link-color: white;
        }

        [slot="notifications"] {
          color: white;
        }
      }
    </style>
    <ogds-header variant="extended" class="full-bleed-example">
      <div slot="logo"><a href="/">Project name</a></div>
      <div slot="notifications">Notifications</div>
      <ul class="example-secondary-links" slot="nav-secondary">
        <li><a href="#">Secondary link</a></li>
        <li><a href="#">Another secondary link</a></li>
      </ul>
      ${genericSearch} ${genericPrimaryNav}
    </ogds-header>
  `,
};

// The following stories kind of need to be hand-authored markup
// since they're showing a full layout
export const EmpXExample = {
  name: "State agency header with info section",
  render: (args: Args) => html`
    <style>
      .state-with-info-example {
        --ogds-header-nav-primary-row-background-color: #fff;
        background-color: var(--ogds-theme-color-base-lightest);

        ogds-accordion details[open]::details-content {
          position: absolute;
          background-color: var(--ogds-theme-color-base-lightest);
        }

        [slot="info"] {
          padding: 0.5rem 0;
        }
      }

      @media (width >= 64rem) {
        .state-with-info-example {
          --ogds-header-row-gap: 0;
        }
      }
    </style>
    <ogds-header variant=${args.variant} class="state-with-info-example">
      <a slot="logo" href="/">
        <img
          src="https://paidleave.maryland.gov/img/OsA2lxQa9u-400.webp"
          alt="Maryland FAMLI, Family and Medical Leave Insurance"
          height="49"
        />
      </a>
      <div slot="info">
        <strong>Employer:</strong> Bagels Bagels Bagels (44-1112222)
      </div>
      <ogds-accordion slot="nav-secondary" class="with-icon right">
        <details>
          <summary>Signed in as A Person</summary>
          <ul>
            <li><a href="javascript:void(0)">Home</a></li>
            <li><a href="javascript:void(0)">Clients</a></li>
            <li><a href="javascript:void(0)">Reports & payments</a></li>
          </ul>
        </details>
      </ogds-accordion>
      <ogds-primary-nav slot="nav-primary">
        <ul>
          <li><a href="javascript:void(0)">Home</a></li>
          <li><a href="javascript:void(0)">Clients</a></li>
          <li><a href="javascript:void(0)">Reports & payments</a></li>
          <li><a href="javascript:void(0)">Employer details</a></li>
          <li><a href="javascript:void(0)">Team members</a></li>
        </ul>
      </ogds-primary-nav>
    </ogds-header>
  `,
};

export const MarylandFAMLIExample = {
  name: "Maryland FAMLI example (paidleave.maryland.gov)",
  parameters: {
    docs: {
      description: {
        story:
          "Configuring `ogds-header` to reproduce the production header at [paidleave.maryland.gov](https://paidleave.maryland.gov/): a logo image, a primary nav with real section links (some with dropdowns, some without), and a secondary nav holding a registration CTA, a language link, and search.",
      },
    },
  },
  // Like the empx example, needs to be a full hand-authored layout
  render: (args: Args) => html`
    <style>
      .famli-register-button {
        border-radius: var(--ogds-theme-button-border-radius);
        box-shadow: inset 0 0 0 var(--ogds-theme-button-stroke-width)
          var(--ogds-theme-button-stroke-color);
        color: var(--ogds-theme-button-stroke-color);
        display: inline-flex;
        font-family: var(--ogds-theme-button-font-family);
        font-weight: 700;
        padding: var(--ogds-spacing-105) var(--ogds-spacing-205);
        text-decoration: none;
      }

      .famli-register-button:hover {
        box-shadow: inset 0 0 0 var(--ogds-theme-button-stroke-width)
          var(--ogds-theme-color-primary-dark);
        color: var(--ogds-theme-color-primary-dark);
      }

      .famli-button-group {
        display: flex;
        gap: var(--ogds-spacing-1);
      }

      .famli-language-button {
        background-color: var(--ogds-theme-button-fill-color);
        border-radius: var(--ogds-theme-button-border-radius);
        color: var(--ogds-theme-button-text-color);
        display: inline-flex;
        font-family: var(--ogds-theme-button-font-family);
        font-weight: 700;
        padding: var(--ogds-spacing-105) var(--ogds-spacing-205);
        text-decoration: none;
      }

      .famli-language-button:hover {
        background-color: var(--ogds-theme-color-primary-dark);
      }

      .famli-sr-only {
        border: 0;
        clip: rect(0, 0, 0, 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        white-space: nowrap;
        width: 1px;
      }

      .famli-search {
        display: flex;
      }

      .famli-search input[type="search"] {
        border: 1px solid var(--ogds-theme-color-base-dark);
        border-radius: 0;
        border-right: none;
        font-family: var(--ogds-theme-button-font-family);
        height: 2.5rem;
        padding-inline: var(--ogds-spacing-1);
      }

      .famli-search button {
        background-color: var(--ogds-theme-button-fill-color);
        border: none;
        border-radius: 0 var(--ogds-theme-button-border-radius)
          var(--ogds-theme-button-border-radius) 0;
        color: var(--ogds-theme-button-text-color);
        cursor: pointer;
        font-family: var(--ogds-theme-button-font-family);
        font-weight: 700;
        height: 2.5rem;
        padding-inline: var(--ogds-spacing-105);
      }

      .famli-search button:hover {
        background-color: var(--ogds-theme-color-primary-dark);
      }

      .logged-out-example {
        background-color: var(--ogds-theme-color-base-lightest);
        --ogds-header-nav-primary-row-background-color: #fff;
        --ogds-header-row-gap: 0;

        [slot="logo"] {
          display: flex;
          min-height: 6rem;
          align-items: center;
        }
      }
    </style>

    <ogds-header variant=${args.variant} class="logged-out-example">
      <a slot="logo" href="/">
        <img
          src="https://paidleave.maryland.gov/img/OsA2lxQa9u-400.webp"
          alt="Maryland FAMLI, Family and Medical Leave Insurance"
          height="49"
        />
      </a>

      <div class="famli-button-group" slot="nav-secondary">
        <a class="famli-register-button" href="javascript:void(0)"
          >Register with FAMLI or sign in</a
        >
        <a class="famli-language-button" href="javascript:void(0)">Languages</a>
      </div>
      <form class="famli-search" slot="nav-secondary" role="search">
        <label class="famli-sr-only" for="famli-search">Search</label>
        <input id="famli-search" type="search" name="q" />
        <button type="submit">Search</button>
      </form>

      <ogds-primary-nav slot="nav-primary">
        <ul>
          <li>
            <details>
              <summary>About the program</summary>
              <ul>
                <li><a href="/about-the-program/">About the program</a></li>
                <li>
                  <a href="/about-the-program/law-and-regulations/"
                    >Law and regulations</a
                  >
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>For employers</summary>
              <ul>
                <li>
                  <a href="/employers/understand-employer-registration/"
                    >Understand employer registration</a
                  >
                </li>
                <li>
                  <a href="/employers/manage-famli-for-clients/"
                    >Manage FAMLI for clients</a
                  >
                </li>
                <li>
                  <a href="/employers/understand-your-plan/"
                    >Understand your plan</a
                  >
                </li>
                <li>
                  <a href="/employers/submit-quarterly-reports/"
                    >Submit quarterly reports</a
                  >
                </li>
                <li>
                  <a href="/employers/make-contributions/"
                    >Make contributions</a
                  >
                </li>
                <li>
                  <a href="/employers/leave-management/">Leave management</a>
                </li>
              </ul>
            </details>
          </li>
          <li><a href="/employees/" aria-current="page">For employees</a></li>
          <li><a href="/connect-with-us/">Connect with us</a></li>
        </ul>
      </ogds-primary-nav>
    </ogds-header>
  `,
};

export const WorkerXExample = {
  name: "State agency example with notifications",
  parameters: {
    docs: {
      description: {
        story:
          "Configuring `ogds-header` to reproduce a state agency header with an account status & search in the secondary nav area, a notification count in the notifications slot, and an `ogds-primary-nav` with several dropdown sections.",
      },
    },
  },
  // Hand-authored markup for layout as above
  render: (args: Args) => html`
    ${searchStyles}
    <style>
      .example-workerx-header {
        background-color: var(--ogds-theme-color-base-lightest);
        --ogds-header-row-gap: 0;
      }

      .example-account {
        color: var(--ogds-theme-text-color);
        font-family: var(--ogds-theme-button-font-family);
        font-size: var(--ogds-theme-type-scale-2xs);
      }

      .example-notification-badge {
        align-items: center;
        background-color: var(--ogds-theme-color-secondary);
        border-radius: 50%;
        color: var(--ogds-color-white, #fff);
        display: inline-flex;
        font-size: var(--ogds-theme-type-scale-3xs);
        font-weight: 700;
        height: 1.25rem;
        justify-content: center;
        margin-inline-start: var(--ogds-spacing-05, 0.25rem);
        width: 1.25rem;
      }
    </style>

    <ogds-header class="example-workerx-header" variant=${args.variant}>
      <a slot="logo" href="/">
        <img
          src="https://paidleave.maryland.gov/img/OsA2lxQa9u-400.webp"
          alt="Maryland FAMLI, Family and Medical Leave Insurance"
          height="49"
        />
      </a>

      <div slot="notifications">
        Notifications
        <span class="example-notification-badge">10</span>
      </div>

      ${genericSearch}
      <div class="example-account" slot="nav-secondary">
        Signed in as <strong>Mindy</strong>
      </div>

      <ogds-primary-nav slot="nav-primary">
        <ul>
          <li><a href="#">Home</a></li>
          <li>
            <details open>
              <summary>Claims Center</summary>
              <ul>
                <li><a href="#">File a new claim</a></li>
                <li><a href="#">Track my claims</a></li>
                <li><a href="#" aria-current="page">Manage my claims</a></li>
                <li><a href="#">FAMLI forms and documents</a></li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Leave Center</summary>
              <ul>
                <li><a href="#">Navigation link</a></li>
                <li><a href="#">Navigation link</a></li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Notices &amp; tax forms</summary>
              <ul>
                <li><a href="#">Navigation link</a></li>
                <li><a href="#">Navigation link</a></li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Appeals Center</summary>
              <ul>
                <li><a href="#">Navigation link</a></li>
                <li><a href="#">Navigation link</a></li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Support</summary>
              <ul>
                <li><a href="#">Navigation link</a></li>
                <li><a href="#">Navigation link</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </ogds-primary-nav>
    </ogds-header>
  `,
};
