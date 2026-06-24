import { html, LitElement, unsafeCSS } from "lit";
import { state } from "lit/decorators.js";
import styles from "./ogds-task-list.css";
import { adoptTokenStyles } from "../../core/token-styles";
import { defineCustomElement } from "../../utils";
import type { OgdsTaskListStep } from "./ogds-task-list-step";

/**
 * @summary A task progress list with a completion counter and slotted steps.
 *
 * @slot heading - The main heading for the task list.
 * @slot subtitle - Supporting text below the heading (e.g. a claim number).
 * @slot counter-label - The label after the computed "X of Y" count. Defaults to "tasks completed". Use an inline element (e.g. `<span>`).
 * @slot instruction - Text shown below the task counter (e.g. "Finish all tasks to submit.").
 * @slot - One or more `<ogds-task-list-step>` elements.
 *
 * @cssprop --ogds-task-list-border-color - Color of the bottom border on the step list. Defaults to gray-50.
 *
 * @element ogds-task-list
 */
export class OgdsTaskList extends LitElement {
  @state() private _completedCount = 0;
  @state() private _totalCount = 0;

  static styles = unsafeCSS(styles);

  override connectedCallback() {
    super.connectedCallback();
    adoptTokenStyles();
  }

  // this will fire once when the component mounts, which is ok for our usage.
  // in a world where we needed to worry about the statuses changing dynamically
  // we would need a mutationObserver
  private _onSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const steps = slot
      .assignedElements({ flatten: true })
      .filter(
        (el): el is OgdsTaskListStep =>
          el.tagName.toLowerCase() === "ogds-task-list-step",
      );
    this._totalCount = steps.length;
    this._completedCount = steps.filter((s) => s.status === "completed").length;
  }

  render() {
    return html`
      <section aria-labelledby="heading">
        <div class="header">
          <div id="heading"><slot name="heading"></slot></div>
          <slot name="subtitle"></slot>
          <p class="counter">
            ${this._completedCount} of ${this._totalCount}
            <slot name="counter-label">tasks completed</slot>
          </p>
          <slot name="instruction"></slot>
        </div>
        <ul class="steps" role="list">
          <slot @slotchange=${this._onSlotChange}></slot>
        </ul>
      </section>
    `;
  }
}

defineCustomElement("ogds-task-list", OgdsTaskList);
