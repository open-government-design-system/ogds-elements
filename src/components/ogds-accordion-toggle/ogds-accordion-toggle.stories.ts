import { html } from "lit";
import "./index";
import "../ogds-accordion/index";
import ComponentDocs from "./docs.mdx";
import { expect, userEvent, waitFor } from "storybook/test";
import { within } from "shadow-dom-testing-library";

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
  title: "Components/Accordion Toggle",
  component: "ogds-accordion-toggle",
  tags: ["alpha"],
  parameters: {
    docs: {
      page: ComponentDocs,
    },
  },
};

export const Default = {
  render: () => html`
    <ogds-accordion-toggle
      controls="accordion-toggle-default"
    ></ogds-accordion-toggle>
    <ogds-accordion id="accordion-toggle-default">${items}</ogds-accordion>
  `,
};

export const CustomLabels = {
  render: () => html`
    <ogds-accordion-toggle controls="accordion-toggle-custom">
      <span slot="expand-label">Show All</span>
      <span slot="collapse-label">Hide All</span>
    </ogds-accordion-toggle>
    <ogds-accordion id="accordion-toggle-custom">${items}</ogds-accordion>
  `,
};

export const ToggleTest = {
  parameters: {
    docs: {
      disable: true,
    },
  },
  render: () => html`
    <ogds-accordion-toggle
      controls="accordion-toggle-test"
    ></ogds-accordion-toggle>
    <ogds-accordion id="accordion-toggle-test">${items}</ogds-accordion>
  `,
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
