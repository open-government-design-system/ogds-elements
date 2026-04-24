import "./index.ts";
import { html, nothing } from "lit";

const meta = {
  title: "Components/Alert",
  component: "usa-alert",
  tags: ["experimental"],
  render: ({
    heading,
    type,
    body,
    noIcon,
  }: {
    heading: string;
    type: string;
    body: string;
    noIcon: boolean;
  }) => {
    return html`
      <usa-alert type="${type}" ?no-icon="${noIcon}">
        ${heading ? html`<h3 slot="heading">${heading}</h3>` : nothing}
        <p slot="body" .innerHTML=${body}></p>
      </usa-alert>
    `;
  },
};

export default meta;

export const InformationalAlert = {
  args: {
    heading: "Informational Alert",
    type: "info",
    body: `Lorem ipsum dolor sit amet, <a href="#">consectetur adipiscing elit</a>, sed do eiusmod.`,
  },
};

export const WarningAlert = {
  args: {
    heading: "Warning Alert",
    type: "warning",
    body: `Lorem ipsum dolor sit amet, <a href="#">consectetur adipiscing elit</a>, sed do eiusmod.`,
  },
};

export const SuccessAlert = {
  args: {
    heading: "Success Alert",
    type: "success",
    body: `Lorem ipsum dolor sit amet, <a href="#">consectetur adipiscing elit</a>, sed do eiusmod.`,
  },
};

export const ErrorAlert = {
  args: {
    heading: "Error Alert",
    type: "error",
    body: `Lorem ipsum dolor sit amet, <a href="#">consectetur adipiscing elit</a>, sed do eiusmod.`,
  },
};

export const SlimAlert = {
  args: {
    type: "info",
    body: `Lorem ipsum dolor sit amet, <a href="#">consectetur adipiscing elit</a>, sed do eiusmod.`,
  },
};

export const AlertWithNoIcon = {
  args: {
    type: "info",
    body: `Lorem ipsum dolor sit amet, <a href="#">consectetur adipiscing elit</a>, sed do eiusmod.`,
    noIcon: "true",
  },
};
