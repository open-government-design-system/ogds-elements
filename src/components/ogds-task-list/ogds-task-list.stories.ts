import { html } from "lit";
import "./ogds-task-list";
import "./ogds-task-list-step";
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

export const Default = {
  render: () => html`
    <ogds-task-list>
      <p slot="instruction">Finish all tasks to submit your application.</p>

      <ogds-task-list-step status="completed" url="/step-1">
        <h3 slot="title">Tell us about you</h3>
      </ogds-task-list-step>

      <ogds-task-list-step status="in-progress" url="/step-2">
        <h3 slot="title">Set up your employer profile</h3>
        <p slot="description">
          Confirm your legal entity structure, employer details, and EIN.
        </p>
      </ogds-task-list-step>

      <ogds-task-list-step status="not-started" url="/step-3">
        <h3 slot="title">Enter the employer's address</h3>
        <p slot="description">Tell us where the business is located.</p>
      </ogds-task-list-step>

      <ogds-task-list-step status="cannot-start-yet">
        <h3 slot="title">Submit your Maryland Resident Agent details</h3>
      </ogds-task-list-step>
    </ogds-task-list>
  `,
};

export const AllStatuses = {
  render: () => html`
    <ogds-task-list>
      <p slot="instruction">Each possible task state.</p>

      <ogds-task-list-step status="completed" url="/step-1">
        <h3 slot="title">Completed task</h3>
        <dl slot="saved-data">
          <dt>Phone number</dt>
          <dd>(410) 123-4567</dd>
        </dl>
      </ogds-task-list-step>

      <ogds-task-list-step status="in-progress" url="/step-2">
        <h3 slot="title">In progress task</h3>
        <p slot="description">
          Short description explaining the value of completing this task.
        </p>
      </ogds-task-list-step>

      <ogds-task-list-step status="not-started" url="/step-3">
        <h3 slot="title">Not started task</h3>
        <p slot="description">
          Short description explaining the value of completing this task.
        </p>
      </ogds-task-list-step>

      <ogds-task-list-step status="cannot-start-yet">
        <h3 slot="title">Cannot start yet task</h3>
      </ogds-task-list-step>
    </ogds-task-list>
  `,
};

export const Translated = {
  render: () => html`
    <ogds-task-list>
      <span slot="counter-label">tareas completadas</span>
      <p slot="instruction">
        Complete todas las tareas para enviar su solicitud.
      </p>

      <ogds-task-list-step status="completed" url="/paso-1">
        <h3 slot="title">Cuéntanos sobre ti</h3>
      </ogds-task-list-step>

      <ogds-task-list-step status="not-started" url="/paso-2">
        <h3 slot="title">Configura tu perfil de empleador</h3>
      </ogds-task-list-step>
    </ogds-task-list>
  `,
};

export const StepOnly = {
  parameters: {
    a11y: {
      config: {
        rules: [
          // aria-required-parent fires because role="listitem" requires a parent
          // list, but this story renders the step in isolation for design preview.
          { id: "aria-required-parent", enabled: false },
        ],
      },
    },
  },
  render: () => html`
    <ogds-task-list-step status="in-progress" url="/some-task">
      <h3 slot="title">Tell us about your employer</h3>
      <p slot="description">
        We need a few details to verify your business registration.
      </p>
    </ogds-task-list-step>
  `,
};
