import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import "./index";
import ComponentDocs from "./docs.mdx";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import type { Args } from "storybook/internal/csf";

const { args, argTypes, template } = getStorybookHelpers("ogds-accordion", {
  excludeCategories: ["methods"],
});

const items = `
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

export const Bordered = {
  args: { class: "bordered" },
};

export const WithChevronIcons = {
  args: { class: "with-icon" },
};

export const WithChevronIconsRight = {
  args: { class: "with-icon right" },
};

export const WithChevronIconsBordered = {
  args: { class: "with-icon bordered" },
};

export const WithPlusIcons = {
  args: { class: "with-icon plus" },
};

export const WithPlusIconsBordered = {
  args: { class: "with-icon plus bordered" },
};

export const WithPlusIconsRight = {
  args: { class: "with-icon plus right" },
};

export const WithPlusIconsRightWithoutCustomElement = {
  // This variant intentionally doesn't render the custom element, so it
  // isn't driven by the shared `<ogds-accordion>` args/template.
  render: () =>
    html`<div class="ogds-accordion with-icon plus right">
      ${unsafeHTML(items)}
    </div>`,
};
