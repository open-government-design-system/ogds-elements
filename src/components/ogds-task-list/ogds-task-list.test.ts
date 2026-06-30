import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("./ogds-task-list.css", () => ({ default: { cssText: "" } }));
vi.mock("../../core/token-styles", () => ({ adoptTokenStyles: vi.fn() }));

import { OgdsTaskList } from "./ogds-task-list";
import type { OgdsTaskListStep } from "./ogds-task-list-step";

function mount(html: string): OgdsTaskList {
  const container = document.createElement("div");
  container.innerHTML = html;
  const el = container.firstElementChild as OgdsTaskList;
  document.body.appendChild(el);
  return el;
}

function makeStep(status: string): OgdsTaskListStep {
  const step = document.createElement(
    "ogds-task-list-step",
  ) as OgdsTaskListStep;
  Object.defineProperty(step, "status", { value: status });
  Object.defineProperty(step, "tagName", {
    value: "OGDS-TASK-LIST-STEP",
    configurable: true,
  });
  return step;
}

async function simulateSlotChange(el: OgdsTaskList, steps: OgdsTaskListStep[]) {
  const slot =
    el.shadowRoot!.querySelector<HTMLSlotElement>("slot:not([name])")!;
  vi.spyOn(slot, "assignedElements").mockReturnValue(steps);
  slot.dispatchEvent(new Event("slotchange", { bubbles: true }));
  await el.updateComplete;
}

beforeEach(() => {
  document.adoptedStyleSheets = [];
});

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("heading level", () => {
  it("renders an h2 by default", async () => {
    const el = mount(`<ogds-task-list></ogds-task-list>`);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("h2")).toBeTruthy();
  });

  it("renders h3 when base-heading-level is 3", async () => {
    const el = mount(
      `<ogds-task-list base-heading-level="3"></ogds-task-list>`,
    );
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("h3")).toBeTruthy();
    expect(el.shadowRoot!.querySelector("h2")).toBeNull();
  });

  it("renders h1 when base-heading-level is 1", async () => {
    const el = mount(
      `<ogds-task-list base-heading-level="1"></ogds-task-list>`,
    );
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("h1")).toBeTruthy();
  });

  it("updates the heading when baseHeadingLevel property changes", async () => {
    const el = mount(`<ogds-task-list></ogds-task-list>`);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("h2")).toBeTruthy();

    el.baseHeadingLevel = 4;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("h4")).toBeTruthy();
    expect(el.shadowRoot!.querySelector("h2")).toBeNull();
  });

  it("falls back to h2 when an out-of-range level is set", async () => {
    const el = mount(`<ogds-task-list></ogds-task-list>`);
    await el.updateComplete;
    (el as any).baseHeadingLevel = 99;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("h2")).toBeTruthy();
  });
});

describe("accessibility structure", () => {
  it("wraps content in a section with aria-labelledby pointing to the counter", async () => {
    const el = mount(`<ogds-task-list></ogds-task-list>`);
    await el.updateComplete;
    const section = el.shadowRoot!.querySelector("section");
    expect(section?.getAttribute("aria-labelledby")).toBe("counter");
  });

  it("gives the counter heading id=counter", async () => {
    const el = mount(`<ogds-task-list></ogds-task-list>`);
    await el.updateComplete;
    const heading = el.shadowRoot!.querySelector(".counter");
    expect(heading?.id).toBe("counter");
  });
});

describe("counter", () => {
  it("shows 0 of 0 before any steps are slotted", async () => {
    const el = mount(`<ogds-task-list></ogds-task-list>`);
    await el.updateComplete;
    const heading = el.shadowRoot!.querySelector(".counter");
    expect(heading?.textContent).toContain("0");
  });

  it("reflects the total number of slotted steps", async () => {
    const el = mount(`<ogds-task-list></ogds-task-list>`);
    await el.updateComplete;
    const steps = [
      makeStep("not-started"),
      makeStep("in-progress"),
      makeStep("completed"),
    ];
    await simulateSlotChange(el, steps);
    const heading = el.shadowRoot!.querySelector(".counter");
    expect(heading?.textContent).toContain("3");
  });

  it("counts only completed steps", async () => {
    const el = mount(`<ogds-task-list></ogds-task-list>`);
    await el.updateComplete;
    const steps = [
      makeStep("completed"),
      makeStep("completed"),
      makeStep("not-started"),
      makeStep("in-progress"),
    ];
    await simulateSlotChange(el, steps);
    const heading = el.shadowRoot!.querySelector(".counter");
    expect(heading?.textContent).toContain("2");
    expect(heading?.textContent).toContain("4");
  });

  it("counts all steps as completed when all statuses are completed", async () => {
    const el = mount(`<ogds-task-list></ogds-task-list>`);
    await el.updateComplete;
    const steps = [makeStep("completed"), makeStep("completed")];
    await simulateSlotChange(el, steps);
    const heading = el.shadowRoot!.querySelector(".counter");
    expect(heading?.textContent).toContain("2");
  });

  it("ignores non-step slotted elements", async () => {
    const el = mount(`<ogds-task-list></ogds-task-list>`);
    await el.updateComplete;
    const slot =
      el.shadowRoot!.querySelector<HTMLSlotElement>("slot:not([name])")!;
    const div = document.createElement("div");
    vi.spyOn(slot, "assignedElements").mockReturnValue([div]);
    slot.dispatchEvent(new Event("slotchange", { bubbles: true }));
    await el.updateComplete;
    const heading = el.shadowRoot!.querySelector(".counter");
    expect(heading?.textContent).toContain("0");
  });
});
