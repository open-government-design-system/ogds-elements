import { html } from "lit";
import "./index";
import ComponentDocs from "./docs.mdx";

const items = html`
  <details>
    <summary>First Amendment</summary>
    <p>
      Congress shall make no law respecting an establishment of religion, or
      prohibiting the free exercise thereof; or abridging the freedom of speech,
      or of the press; or the right of the people peaceably to assemble, and to
      petition the Government for a redress of grievances.
    </p>
  </details>
  <details>
    <summary>Second Amendment</summary>
    <p>
      A well regulated Militia, being necessary to the security of a free State,
      the right of the people to keep and bear Arms, shall not be infringed.
    </p>
  </details>
  <details>
    <summary>Third Amendment</summary>
    <p>
      No Soldier shall, in time of peace be quartered in any house, without the
      consent of the Owner, nor in time of war, but in a manner to be prescribed
      by law.
    </p>
  </details>
`;

export default {
  title: "Components/Accordion",
  component: "ogds-accordion",
  tags: ["alpha"],
  parameters: {
    docs: {
      page: ComponentDocs,
    },
  },
};

export const Default = {
  render: () => html`<ogds-accordion>${items}</ogds-accordion>`,
};

export const Bordered = {
  render: () =>
    html`<ogds-accordion class="bordered">${items}</ogds-accordion>`,
};

export const WithChevronIcons = {
  render: () =>
    html`<ogds-accordion class="with-icon">${items}</ogds-accordion>`,
};

export const WithChevronIconsRight = {
  render: () =>
    html`<ogds-accordion class="with-icon right">${items}</ogds-accordion>`,
};

export const WithChevronIconsBordered = {
  render: () =>
    html`<ogds-accordion class="with-icon bordered">${items}</ogds-accordion>`,
};

export const WithPlusIcons = {
  render: () =>
    html`<ogds-accordion class="with-icon plus">${items}</ogds-accordion>`,
};

export const WithPlusIconsBordered = {
  render: () =>
    html`<ogds-accordion class="with-icon plus bordered"
      >${items}</ogds-accordion
    >`,
};
