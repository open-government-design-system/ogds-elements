import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import "./index";
import ComponentDocs from "./docs.mdx";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import type { Args } from "storybook/internal/csf";

const { args, argTypes, template } = getStorybookHelpers("ogds-primary-nav", {
  excludeCategories: ["methods"],
});

const items = `
  <ul>
    <li><a href="#" aria-current="page">Current section</a></li>
    <li>
      <details>
        <summary>Benefits</summary>
        <ul>
          <li><a href="#">Apply for benefits</a></li>
          <li><a href="#">Check application status</a></li>
          <li><a href="#">Manage your account</a></li>
        </ul>
      </details>
    </li>
    <li>
      <details>
        <summary>Resources</summary>
        <ul>
          <li><a href="#">Guides</a></li>
          <li><a href="#">FAQ</a></li>
        </ul>
      </details>
    </li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
`;

export default {
  title: "Components/Primary Nav",
  component: "ogds-primary-nav",
  tags: ["alpha"],
  args: {
    ...args,
    "default-slot": items,
  },
  argTypes,
  parameters: {
    docs: {
      page: ComponentDocs,
    },
  },
  render: (args: Args) => template(args),
};

export const Default = {};

export const WithoutCustomElement = {
  render: () =>
    html`<div
      class="ogds-primary-nav"
      role="navigation"
      aria-label="Primary navigation"
    >
      ${unsafeHTML(items)}
    </div>`,
};

export const Mobile = {
  globals: {
    viewport: { value: "mobile1", isRotated: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          "The nav reflows into a stacked list below the desktop breakpoint (64rem).",
      },
    },
  },
};
