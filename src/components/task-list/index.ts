import { LitElement, html, unsafeCSS } from "lit";

import styles from "./ogds-task-list.css";
import { adoptTokenStyles } from "../../core/token-styles";

import { property } from "lit/decorators.js";

/**
 * @summary The ogds-task-list component. For now, this is intended for non-sequential task lists (order doesn't matter).
 * @element ogds-task-list
 */

interface TaskStep {
  title: string;
  description: string;
  status: StepStatus;
  url?: string;
}

type StepStatus = "not-started" | "in-progress" | "completed";

export class OgdsTaskList extends LitElement {
  /** @ignore */

  @property({ type: Array })
  steps: TaskStep[] = [];

  static styles = unsafeCSS(styles);

  override connectedCallback() {
    super.connectedCallback();
    adoptTokenStyles();
  }

  renderAction(step: TaskStep) {
    switch (step.status) {
      case "in-progress":
        return html`<a href=${step.url}>Continue</a>`;
      case "completed":
        return html`
          <span class="completed">Completed</span><a href=${step.url}>Edit</a>
        `;
      default:
        return html`<a href=${step.url}>Start </a>`;
    }
  }

  render() {
    return html`
      <ul>
        ${this.steps.map(
          (step) => html`
            <li class="step" data-status=${step.status}>
              <h2 class="heading">${step.title}</h2>
              <div class="description">${step.description}</div>
              <div class="action">${this.renderAction(step)}</div>
            </li>
          `,
        )}
      </ul>
    `;
  }
}

customElements.define("ogds-task-list", OgdsTaskList);
