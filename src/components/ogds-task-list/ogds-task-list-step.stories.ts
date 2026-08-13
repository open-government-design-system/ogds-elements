import "./ogds-task-list-step";
import "../ogds-alert/index";
import ComponentDocs from "./ogds-task-list-step.docs.mdx";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import type { Args } from "storybook/internal/csf";

const { args, argTypes, template } = getStorybookHelpers(
  "ogds-task-list-step",
  {
    excludeCategories: ["methods"],
  },
);

export default {
  title: "Components/Task List/Task List Step",
  component: "ogds-task-list-step",
  tags: ["alpha"],
  args: {
    ...args,
    status: "in-progress",
    url: "/some-task",
    "title-slot": "Tell us about your employer",
    "description-slot":
      "We need a few details to verify your business registration.",
  },
  argTypes,
  parameters: {
    docs: {
      page: ComponentDocs,
    },
    a11y: {
      config: {
        rules: [
          // aria-required-parent fires because role="listitem" requires a parent
          // list, but these stories render the step in isolation for design preview.
          { id: "aria-required-parent", enabled: false },
        ],
      },
    },
  },
  render: (args: Args) => template(args),
};

export const Default = {};

export const CustomStatusLabel = {
  args: {
    "status-label-slot": "Started",
  },
};

export const WithAlert = {
  args: {
    "alert-slot": `<ogds-alert type="warning"><p slot="body">We need more information before this task can be completed.</p></ogds-alert>`,
  },
};

export const WithSavedData = {
  args: {
    status: "completed",
    "description-slot": "",
    "saved-data-slot": `<dl><dt>Phone number</dt><dd>(410) 123-4567</dd></dl>`,
  },
};

export const Blocked = {
  args: {
    status: "cannot-start-yet",
    url: "",
    "title-slot": "Submit your Maryland Resident Agent details",
    "description-slot": "",
  },
};

export const CustomBlockedMessage = {
  args: {
    ...Blocked.args,
    "blocked-message-slot": 'Complete "Tell us about your employer" first.',
  },
};
