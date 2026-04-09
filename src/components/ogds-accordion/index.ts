import { LitElement, nothing } from "lit";

import styles from "./ogds-accordion.css";
import iconChevronDown from "../../shared/icons/expand_more.svg";
import iconChevronUp from "../../shared/icons/expand_less.svg";
import iconPlus from "../../shared/icons/add.svg";
import iconMinus from "../../shared/icons/remove.svg";

import { adoptTokenStyles } from "../../core/token-styles";
import { defineCustomElement } from "../../utils";
import { property } from "lit/decorators.js";

/**
 * @summary The ogds-accordion component.
 *
 * Apply these classes to `<ogds-accordion>` to enable variants:
 * - `bordered` — adds a border to expanded content
 * - `with-icon` — shows a chevron icon on each summary
 * - `with-icon plus` — uses plus/minus icons instead of chevrons
 * - `with-icon right` — aligns the icon to the right
 *
 * @cssprop --ogds-accordion-border - Border used in the bordered variant.
 * @cssprop --ogds-accordion-content-padding - Padding for the expanded content area.
 * @cssprop --ogds-accordion-icon-closed - Icon shown when a panel is closed. Defaults to a chevron pointing down. CSS-only users must set this to a url() value pointing to their own icon asset.
 * @cssprop --ogds-accordion-icon-open - Icon shown when a panel is open. Defaults to a chevron pointing up. CSS-only users must set this to a url() value pointing to their own icon asset.
 * @attribute {boolean} use-list-semantics - Adds `role="list"` to the component and `role="listitem"` to each `<details>` child, conveying the accordion as a list to assistive technologies.
 * @attribute {number} heading-level - Sets a heading level for each `<details>` child by adding `role="heading"` and the corresponding `aria-level`. Has no effect when set to `0` (the default).
 *
 * @slot - The default (only) slot for the <ogds-accordion> expects one or more plain HTML <details> elements.
 * @element ogds-accordion
 */
export class OgdsAccordion extends LitElement {
  /** @ignore */
  private static _sheet: CSSStyleSheet | null = null;

  @property({ type: Boolean, attribute: "use-list-semantics" })
  useListSemantics = false;

  @property({ type: Number, attribute: "heading-level" })
  headingLevel = 0;

  declare detailsChildren: HTMLCollectionOf<HTMLDetailsElement> | undefined;
  declare childRoles: Map<HTMLDetailsElement, Set<string>>;

  override createRenderRoot() {
    return this;
  }

  override connectedCallback() {
    super.connectedCallback();
    adoptTokenStyles();
    if (!OgdsAccordion._sheet) {
      OgdsAccordion._sheet = new CSSStyleSheet();
      OgdsAccordion._sheet.replaceSync(
        `ogds-accordion, .ogds-accordion {
          --icon-chevron-pointing-down: url("${iconChevronDown}");
          --icon-chevron-pointing-up: url("${iconChevronUp}");
          --icon-plus: url("${iconPlus}");
          --icon-minus: url("${iconMinus}");
        }\n` + styles.cssText,
      );
      document.adoptedStyleSheets = [
        ...document.adoptedStyleSheets,
        OgdsAccordion._sheet,
      ];
    }
    this.detailsChildren = this.getDetailsChildren();
    this.childRoles = new Map(
      Array.from(this.detailsChildren ?? []).map((el) => [el, new Set()]),
    );
  }

  override firstUpdated() {
    this.addListSemantics();
    this.addHeadingSemantics();
    this.applyChildRoles();
  }

  getDetailsChildren() {
    const detailsEls = this.getElementsByTagName("details");
    if (detailsEls.length > 0) {
      return detailsEls;
    } else {
      console.error(
        "This component expects to have at least one details element as a child",
      );
    }
  }

  addListSemantics() {
    if (this.useListSemantics && this.detailsChildren) {
      Array.from(this.detailsChildren).forEach((el) =>
        this.childRoles.get(el)?.add("listitem"),
      );
      this.setAttribute("role", "list");
    }
  }

  addHeadingSemantics() {
    const headingLevel = this.headingLevel;

    if (headingLevel !== 0 && this.detailsChildren) {
      Array.from(this.detailsChildren).forEach((el) => {
        this.childRoles.get(el)?.add("heading");
        el.setAttribute("aria-level", String(this.headingLevel));
      });
    }
  }

  applyChildRoles() {
    this.childRoles.forEach((roles, el) => {
      if (roles.size > 0) el.setAttribute("role", Array.from(roles).join(" "));
    });
  }

  render() {
    return nothing;
  }
}

defineCustomElement("ogds-accordion", OgdsAccordion);
