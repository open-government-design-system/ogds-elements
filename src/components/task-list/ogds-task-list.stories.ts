import { html } from "lit";
import "./index";
import ComponentDocs from "./docs.mdx";

export default {
  title: "Components/TaskList",
  component: "ogds-task-list",
  tags: ["experimental"],
  parameters: {
    docs: {
      page: ComponentDocs,
    },
  },
};

const exampleSteps = [
  {
    title: "Create account",
    description: "Set up your login credentials.",
    status: "completed",
    url: "",
  },
  {
    title: "Verify email",
    description: "Click the link we sent to your inbox.",
    status: "in-progress",
    url: "",
  },
  {
    title: "Add profile details",
    description: "Tell us more about yourself.",
    status: "not-started",
    url: "",
  },
  {
    title: "Review",
    description: "Review and submit profile details.",
    status: "not-started",
    url: "",
  },
];

export const Default = {
  render: () => html`<ogds-task-list .steps=${exampleSteps}></ogds-task-list>`,
};
