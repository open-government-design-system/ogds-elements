import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("./ogds-accordion-toggle.css", () => ({ default: { cssText: "" } }));
vi.mock("../../core/token-styles", () => ({ adoptTokenStyles: vi.fn() }));

import { OgdsAccordionToggle } from "./index";

function mountPair({
  accordionId = "test-accordion",
  openItems = false,
  expandLabel,
  collapseLabel,
}: {
  accordionId?: string;
  openItems?: boolean;
  expandLabel?: string;
  collapseLabel?: string;
} = {}): OgdsAccordionToggle {
  const accordion = document.createElement("div");
  accordion.id = accordionId;
  accordion.innerHTML = `
    <details${openItems ? " open" : ""}><summary>One</summary></details>
    <details${openItems ? " open" : ""}><summary>Two</summary></details>
  `;
  document.body.appendChild(accordion);

  const toggle = document.createElement(
    "ogds-accordion-toggle",
  ) as OgdsAccordionToggle;
  toggle.setAttribute("controls", accordionId);
  if (expandLabel) {
    const span = document.createElement("span");
    span.slot = "expand-label";
    span.textContent = expandLabel;
    toggle.appendChild(span);
  }
  if (collapseLabel) {
    const span = document.createElement("span");
    span.slot = "collapse-label";
    span.textContent = collapseLabel;
    toggle.appendChild(span);
  }
  document.body.appendChild(toggle);
  return toggle;
}

function getButton(toggle: OgdsAccordionToggle): HTMLButtonElement {
  return toggle.shadowRoot!.querySelector("button") as HTMLButtonElement;
}

beforeEach(() => {
  document.adoptedStyleSheets = [];
});

afterEach(() => {
  document.body.innerHTML = "";
});

function getExpandSlot(toggle: OgdsAccordionToggle): HTMLSlotElement {
  return toggle.shadowRoot!.querySelector(
    'slot[name="expand-label"]',
  ) as HTMLSlotElement;
}

function getCollapseSlot(toggle: OgdsAccordionToggle): HTMLSlotElement {
  return toggle.shadowRoot!.querySelector(
    'slot[name="collapse-label"]',
  ) as HTMLSlotElement;
}

describe("rendering", () => {
  it("renders with the expand slot visible and fallback text 'Expand All' by default", async () => {
    const toggle = mountPair();
    await toggle.updateComplete;
    expect(getExpandSlot(toggle).hasAttribute("hidden")).toBe(false);
    expect(getExpandSlot(toggle).textContent?.trim()).toBe("Expand All");
    expect(getCollapseSlot(toggle).hasAttribute("hidden")).toBe(true);
  });

  it("renders with custom slotted expand label content", async () => {
    const toggle = mountPair({
      expandLabel: "Open All",
      collapseLabel: "Close All",
    });
    await toggle.updateComplete;
    expect(toggle.querySelector('[slot="expand-label"]')?.textContent).toBe(
      "Open All",
    );
    expect(toggle.querySelector('[slot="collapse-label"]')?.textContent).toBe(
      "Close All",
    );
  });
});

describe("MutationObserver sync", () => {
  it("switches to collapse slot when a panel is opened manually", async () => {
    const toggle = mountPair();
    await toggle.updateComplete;
    expect(getExpandSlot(toggle).hasAttribute("hidden")).toBe(false);

    const details = document.querySelector("details")!;
    details.setAttribute("open", "");
    await Promise.resolve(); // flush MutationObserver callback
    await toggle.updateComplete;

    expect(getCollapseSlot(toggle).hasAttribute("hidden")).toBe(false);
    expect(getExpandSlot(toggle).hasAttribute("hidden")).toBe(true);
  });

  it("switches to expand slot when all panels are closed manually", async () => {
    const toggle = mountPair({ openItems: true });
    await toggle.updateComplete;
    expect(getCollapseSlot(toggle).hasAttribute("hidden")).toBe(false);

    document
      .querySelectorAll("details")
      .forEach((d) => d.removeAttribute("open"));
    await Promise.resolve(); // flush MutationObserver callback
    await toggle.updateComplete;

    expect(getExpandSlot(toggle).hasAttribute("hidden")).toBe(false);
    expect(getCollapseSlot(toggle).hasAttribute("hidden")).toBe(true);
  });
});

describe("toggleAll", () => {
  it("opens all details when none are open", async () => {
    const toggle = mountPair();
    await toggle.updateComplete;
    getButton(toggle).click();
    await toggle.updateComplete;
    document.querySelectorAll("details").forEach((d) => {
      expect(d.hasAttribute("open")).toBe(true);
    });
  });

  it("shows the collapse slot and hides the expand slot after expanding all", async () => {
    const toggle = mountPair();
    await toggle.updateComplete;
    getButton(toggle).click();
    await toggle.updateComplete;
    expect(getCollapseSlot(toggle).hasAttribute("hidden")).toBe(false);
    expect(getExpandSlot(toggle).hasAttribute("hidden")).toBe(true);
  });

  it("closes all details when all are open", async () => {
    const toggle = mountPair();
    await toggle.updateComplete;
    getButton(toggle).click();
    await toggle.updateComplete;
    getButton(toggle).click();
    await toggle.updateComplete;
    document.querySelectorAll("details").forEach((d) => {
      expect(d.hasAttribute("open")).toBe(false);
    });
  });

  it("shows the expand slot and hides the collapse slot after collapsing all", async () => {
    const toggle = mountPair();
    await toggle.updateComplete;
    getButton(toggle).click();
    await toggle.updateComplete;
    getButton(toggle).click();
    await toggle.updateComplete;
    expect(getExpandSlot(toggle).hasAttribute("hidden")).toBe(false);
    expect(getCollapseSlot(toggle).hasAttribute("hidden")).toBe(true);
  });

  it("logs an error when the target accordion is not found", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    document.body.innerHTML = `<ogds-accordion-toggle controls="nonexistent"></ogds-accordion-toggle>`;
    const toggle = document.body.querySelector(
      "ogds-accordion-toggle",
    ) as OgdsAccordionToggle;
    await toggle.updateComplete;
    toggle.toggleAll();
    expect(errorSpy).toHaveBeenCalledOnce();
    errorSpy.mockRestore();
  });
});

describe("checkOpen", () => {
  it("returns false when no details are open", async () => {
    const toggle = mountPair();
    await toggle.updateComplete;
    expect(toggle.checkOpen()).toBe(false);
  });

  it("returns true when at least one details is open", async () => {
    const toggle = mountPair({ openItems: true });
    await toggle.updateComplete;
    expect(toggle.checkOpen()).toBe(true);
  });
});

describe("missing controls attribute", () => {
  it("logs a console error when controls is not set", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    document.body.innerHTML = `<ogds-accordion-toggle></ogds-accordion-toggle>`;
    const toggle = document.body.querySelector(
      "ogds-accordion-toggle",
    ) as OgdsAccordionToggle;
    await toggle.updateComplete;
    expect(errorSpy).toHaveBeenCalledOnce();
    errorSpy.mockRestore();
  });
});

describe("stylesheet adoption", () => {
  beforeEach(() => {
    (OgdsAccordionToggle as any)._sheet = null;
    document.adoptedStyleSheets = [];
  });

  it("adds a stylesheet to document.adoptedStyleSheets on first mount", async () => {
    const toggle = mountPair();
    await toggle.updateComplete;
    expect(document.adoptedStyleSheets).toHaveLength(1);
  });

  it("does not add the stylesheet more than once when multiple toggles are mounted", async () => {
    const toggle1 = mountPair({ accordionId: "acc1" });
    const toggle2 = mountPair({ accordionId: "acc2" });
    await Promise.all([toggle1.updateComplete, toggle2.updateComplete]);
    expect(document.adoptedStyleSheets).toHaveLength(1);
  });
});
