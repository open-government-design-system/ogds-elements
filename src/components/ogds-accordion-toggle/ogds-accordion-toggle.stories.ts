import { html, nothing } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import "./index";
import "../ogds-accordion/index";
import ComponentDocs from "./docs.mdx";
import { expect, userEvent, waitFor } from "storybook/test";
import { within } from "shadow-dom-testing-library";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import type { Args } from "storybook/internal/csf";

const { args, argTypes } = getStorybookHelpers("ogds-accordion-toggle", {
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

const renderToggle = (args: Args) => html`
  <ogds-accordion-toggle controls=${args.controls}>
    ${
      args["expand-label-slot"]
        ? html`<span slot="expand-label">${args["expand-label-slot"]}</span>`
        : nothing
    }
    ${
      args["collapse-label-slot"]
        ? html`<span slot="collapse-label"
            >${args["collapse-label-slot"]}</span
          >`
        : nothing
    }
  </ogds-accordion-toggle>
  <ogds-accordion id=${args.controls}>${unsafeHTML(items)}</ogds-accordion>
`;

export default {
  title: "Components/Accordion Toggle",
  component: "ogds-accordion-toggle",
  tags: ["alpha"],
  args: {
    ...args,
    controls: "accordion-toggle-default",
  },
  argTypes,
  parameters: {
    docs: {
      page: ComponentDocs,
    },
  },
  render: (args: Args) => renderToggle(args),
};

export const Default = {};

export const CustomLabels = {
  args: {
    controls: "accordion-toggle-custom",
    "expand-label-slot": "Show All",
    "collapse-label-slot": "Hide All",
  },
};

export const ToggleTest = {
  parameters: {
    docs: {
      disable: true,
    },
  },
  args: {
    controls: "accordion-toggle-test",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByShadowRole("button");

    await userEvent.click(button);
    await waitFor(() => {
      canvasElement.querySelectorAll("details").forEach((d) => {
        expect(d).toHaveAttribute("open");
      });
    });

    await userEvent.click(button);
    await waitFor(() => {
      canvasElement.querySelectorAll("details").forEach((d) => {
        expect(d).not.toHaveAttribute("open");
      });
    });
  },
};
