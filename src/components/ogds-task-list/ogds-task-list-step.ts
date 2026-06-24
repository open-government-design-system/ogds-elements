import { css, html, LitElement, nothing, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import iconCheckCircle from "../../shared/icons/check_circle.svg";
import iconArrowForward from "../../shared/icons/arrow_forward.svg";
import styles from "./ogds-task-list-step.css";
import { adoptTokenStyles } from "../../core/token-styles";
import { defineCustomElement } from "../../utils";

export type TaskStepStatus =
  | "not-started"
  | "in-progress"
  | "completed"
  | "cannot-start-yet";

/**
 * @summary A single step within an `ogds-task-list`.
 *
 * @attribute {string} status - Completion status. One of: not-started, in-progress, completed, cannot-start-yet.
 * @attribute {string} url - URL the task title links to. Not used when status is "cannot-start-yet".
 *
 * @slot title - The task title text.
 * @slot alert - Optional alert (e.g. a USWDS alert). Shown between the badge and description.
 * @slot description - Optional description text.
 * @slot saved-data - Optional summary of submitted data (e.g. a `<dl>`) shown below the badge.
 * @slot status-label - The status badge label. Defaults to the English label for the current status.
 * @slot blocked-message - Message shown when status is "cannot-start-yet". Defaults to "Not available until previous tasks are complete."
 *
 * @cssprop --ogds-task-list-step-border-color - Color of the top border divider. Defaults to gray-50.
 *
 * @element ogds-task-list-step
 */
export class OgdsTaskListStep extends LitElement {
  @property({ reflect: true })
  status: TaskStepStatus = "not-started";

  @property()
  url = "";

  static styles = [
    css`
      :host {
        --ogds-icon-check-circle: url("${unsafeCSS(iconCheckCircle)}");
        --ogds-icon-arrow-forward: url("${unsafeCSS(iconArrowForward)}");
      }
    `,
    styles,
  ];

  override connectedCallback() {
    super.connectedCallback();
    adoptTokenStyles();
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "listitem");
    }
  }

  private get _badgeLabel(): string {
    const labels: Record<TaskStepStatus, string> = {
      completed: "Completed",
      "in-progress": "In progress",
      "not-started": "Not started",
      "cannot-start-yet": "Cannot start yet",
    };
    return labels[this.status];
  }

  render() {
    const isBlocked = this.status === "cannot-start-yet";
    const isCompleted = this.status === "completed";

    return html`
      ${isBlocked
        ? html`<span class="title" aria-describedby="blocked-message"
            ><slot name="title"></slot
          ></span>`
        : html`<a class="title" href=${this.url} aria-describedby="badge">
            <slot name="title"></slot
            ><span class="arrow" aria-hidden="true"></span>
          </a>`}
      <span class="ogds-tag badge" id="badge">
        ${isCompleted
          ? html`<span class="badge-icon" aria-hidden="true"></span>`
          : nothing}
        <slot name="status-label">${this._badgeLabel}</slot>
      </span>
      <slot name="alert"></slot>
      <slot name="description"></slot>
      <slot name="saved-data"></slot>
      ${isBlocked
        ? html`<p class="blocked-message" id="blocked-message">
            <slot name="blocked-message"
              >Not available until previous tasks are complete.</slot
            >
          </p>`
        : nothing}
    `;
  }
}

defineCustomElement("ogds-task-list-step", OgdsTaskListStep);
