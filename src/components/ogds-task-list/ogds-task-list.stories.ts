import "./ogds-task-list";
import "./ogds-task-list-step";
import ComponentDocs from "./docs.mdx";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import type { Args } from "storybook/internal/csf";

const { args, argTypes, template } = getStorybookHelpers("ogds-task-list", {
  excludeCategories: ["methods"],
});

const defaultSteps = `
  <ogds-task-list-step status="completed" url="/step-1">
    <span slot="title">Tell us about you</span>
  </ogds-task-list-step>
  <ogds-task-list-step status="in-progress" url="/step-2">
    <span slot="title">Set up your employer profile</span>
    <p slot="description">
      Confirm your legal entity structure, employer details, and EIN.
    </p>
  </ogds-task-list-step>
  <ogds-task-list-step status="not-started" url="/step-3">
    <span slot="title">Enter the employer's address</span>
    <p slot="description">Tell us where the business is located.</p>
  </ogds-task-list-step>
  <ogds-task-list-step status="cannot-start-yet">
    <span slot="title">Submit your Maryland Resident Agent details</span>
  </ogds-task-list-step>
`;

export default {
  title: "Components/Task List",
  component: "ogds-task-list",
  tags: ["alpha"],
  args: {
    ...args,
    "instruction-slot": "Finish all tasks to submit your application.",
    "default-slot": defaultSteps,
  },
  argTypes,
  parameters: {
    docs: {
      page: ComponentDocs,
    },
  },
  render: (args: Args) => template(args),
};

export const Default = {
  args: {
    "instruction-slot": "Finish all tasks to submit your application.",
    "default-slot": `
      <ogds-task-list-step status="completed" url="/step-1">
        <span slot="title">Edit your profile</span>
        <dl slot="saved-data">
          <dt>Phone number</dt>
          <dd>(410) 123-4567</dd>
          <dt>Email address</dt>
          <dd>example@example.com</dd>
        </dl>
      </ogds-task-list-step>
      <ogds-task-list-step status="in-progress" url="/step-2">
        <span slot="title">Edit your address</span>
      </ogds-task-list-step>
      <ogds-task-list-step status="not-started" url="/step-3">
        <span slot="title">Submit additional supporting documents</span>
      </ogds-task-list-step>
      <ogds-task-list-step status="cannot-start-yet">
        <span slot="title">Sign contractual agreement</span>
      </ogds-task-list-step>
    `,
  },
};

export const AllStatuses = {
  args: {
    "instruction-slot": "Each possible task state.",
    "default-slot": `
      <ogds-task-list-step status="completed" url="/step-1">
        <span slot="title">Edit your profile</span>
        <dl slot="saved-data">
          <dt>Phone number</dt>
          <dd>(410) 123-4567</dd>
        </dl>
      </ogds-task-list-step>
      <ogds-task-list-step status="in-progress" url="/step-2">
        <span slot="title">Edit your address</span>
      </ogds-task-list-step>
      <ogds-task-list-step status="not-started" url="/step-3">
        <span slot="title">Submit more details</span>
      </ogds-task-list-step>
      <ogds-task-list-step status="cannot-start-yet">
        <span slot="title">Sign contractual agreement</span>
      </ogds-task-list-step>
    `,
  },
};

export const Translated = {
  args: {
    "counter-label-slot": "tareas completadas",
    "instruction-slot": "Complete todas las tareas para enviar su solicitud.",
    "default-slot": `
      <ogds-task-list-step status="completed" url="/paso-1">
        <span slot="title">Cuéntanos sobre ti</span>
      </ogds-task-list-step>
      <ogds-task-list-step status="not-started" url="/paso-2">
        <span slot="title">Configura tu perfil de empleador</span>
      </ogds-task-list-step>
    `,
  },
};
