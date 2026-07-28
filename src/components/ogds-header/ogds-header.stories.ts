import { html } from "lit";
import "./index";
import "../ogds-primary-nav";
import ComponentDocs from "./docs.mdx";

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

export default {
  title: "Components/Header",
  component: "ogds-header",
  tags: ["experimental"],
  parameters: {
    docs: {
      page: ComponentDocs,
    },
  },
};

export const Extended = {
  render: () => html`
    ${searchStyles} ${secondaryLinksStyles}
    <ogds-header variant="extended">
      <div slot="logo"><a href="/">Project name</a></div>
      <div slot="notifications">Notifications</div>
      <div slot="info">Alert or banner content goes here.</div>
      <ul class="example-secondary-links" slot="nav-secondary">
        <li><a href="#">Secondary link</a></li>
        <li><a href="#">Another secondary link</a></li>
      </ul>
      ${genericSearch} ${genericPrimaryNav}
    </ogds-header>
  `,
};

export const Basic = {
  render: () => html`
    ${searchStyles}
    <ogds-header variant="basic">
      <div slot="logo"><a href="/">Project name</a></div>
      ${genericSearch} ${genericPrimaryNav}
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
  render: () => html`
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
    </style>

    <ogds-header variant="extended">
      <a slot="logo" href="/">
        <img
          src="https://paidleave.maryland.gov/img/OsA2lxQa9u-400.webp"
          alt="Maryland FAMLI, Family and Medical Leave Insurance"
          height="49"
        />
      </a>

      <div class="famli-button-group" slot="nav-secondary">
        <a
          class="famli-register-button"
          href="https://account.paidleave.maryland.gov/"
          >Register with FAMLI or sign in</a
        >
        <a
          class="famli-language-button"
          href="https://translate.google.com/translate?u=https://paidleave.maryland.gov/"
          >Languages</a
        >
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
