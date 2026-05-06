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
    title: "Tell us about you",
    description:
      " Confirm the legal entity structure, your employer details, and your EIN. ",
    status: "in-progress",
    url: "",
  },
  {
    title: "Set up your employer profile",
    description: "Click the link we sent to your inbox.",
    status: "completed",
    url: "",
  },
  {
    title: "Enter the employer’s address",
    description: "Tell us more about yourself.",
    status: "completed",
    url: "",
  },
  {
    title: "Submit your Maryland Resident Agent details",
    description: "Review and submit profile details.",
    status: "not-started",
    url: "",
  },
];

export const Default = {
  render: () => html`<ogds-task-list .steps=${exampleSteps}></ogds-task-list>`,
};
