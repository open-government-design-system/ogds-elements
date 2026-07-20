import { html } from "lit";
import "./ogds-task-list";
import "./ogds-task-list-step";
import ComponentDocs from "./docs.mdx";

export default {
  title: "Components/Task List",
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
    </ogds-task-list>
  `,
};

export const AllStatuses = {
  render: () => html`
    <ogds-task-list>
      <p slot="instruction">Each possible task state.</p>

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
        <span slot="title">Cuéntanos sobre ti</span>
      </ogds-task-list-step>

      <ogds-task-list-step status="not-started" url="/paso-2">
        <span slot="title">Configura tu perfil de empleador</span>
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
      <span slot="title">Tell us about your employer</span>
      <p slot="description">
        We need a few details to verify your business registration.
      </p>
    </ogds-task-list-step>
  `,
};
