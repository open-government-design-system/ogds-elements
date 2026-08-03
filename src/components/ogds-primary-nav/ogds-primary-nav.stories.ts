import { html } from "lit";
import "./index";
import ComponentDocs from "./docs.mdx";

const items = html`
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
  tags: ["experimental"],
  parameters: {
    docs: {
      page: ComponentDocs,
    },
  },
};

export const Default = {
  render: () => html`<ogds-primary-nav>${items}</ogds-primary-nav>`,
};

export const WithoutCustomElement = {
  render: () =>
    html`<div
      class="ogds-primary-nav"
      role="navigation"
      aria-label="Primary navigation"
    >
      ${items}
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
  render: () => html`<ogds-primary-nav>${items}</ogds-primary-nav>`,
};
