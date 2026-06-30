import { html, LitElement, unsafeCSS } from "lit";
import { property, state } from "lit/decorators.js";
import { html as staticHtml, literal } from "lit/static-html.js";
import styles from "./ogds-task-list.css";
import { adoptTokenStyles } from "../../core/token-styles";
import { defineCustomElement } from "../../utils";
import type { OgdsTaskListStep } from "./ogds-task-list-step";

const headingTags = {
  1: literal`h1`,
  2: literal`h2`,
  3: literal`h3`,
  4: literal`h4`,
  5: literal`h5`,
  6: literal`h6`,
} as const;

/**
 * @summary A task progress list with a completion counter and slotted steps.
 *
 * @slot counter-label - The label after the computed "X of Y" count. Defaults to "tasks completed". Use an inline element (e.g. `<span>`).
 * @slot instruction - Text shown below the task counter (e.g. "Finish all tasks to submit.").
 * @slot - One or more `<ogds-task-list-step>` elements.
 *
 * @cssprop --ogds-task-list-border-color - Color of the bottom border on the step list. Defaults to gray-50.
 *
 * @element ogds-task-list
 */
export class OgdsTaskList extends LitElement {
  /**
   * The heading level for the task counter. Accepts 1–6.
   * @attr base-heading-level
   */
  @property({ type: Number, attribute: "base-heading-level" })
  baseHeadingLevel: keyof typeof headingTags = 2;

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
    const tag = headingTags[this.baseHeadingLevel] ?? headingTags[2];
    return html`
      <section aria-labelledby="counter">
        <div class="header">
          ${staticHtml`<${tag} class="counter" id="counter">
            ${this._completedCount} of ${this._totalCount}
            <slot name="counter-label">tasks completed</slot>
          </${tag}>`}
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
