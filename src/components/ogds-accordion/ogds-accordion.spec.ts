import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("./ogds-accordion.css", () => ({ default: { cssText: "" } }));
vi.mock("../../shared/icons/expand_more.svg", () => ({ default: "" }));
vi.mock("../../shared/icons/expand_less.svg", () => ({ default: "" }));
vi.mock("../../shared/icons/add.svg", () => ({ default: "" }));
vi.mock("../../shared/icons/remove.svg", () => ({ default: "" }));
vi.mock("../../core/token-styles", () => ({ adoptTokenStyles: vi.fn() }));

import { OgdsAccordion } from "./index";

function mount(html: string): OgdsAccordion {
  const container = document.createElement("div");
  container.innerHTML = html;
  const el = container.firstElementChild as OgdsAccordion;
  document.body.appendChild(el);
  return el;
}

beforeEach(() => {
  document.adoptedStyleSheets = [];
});

afterEach(() => {
  document.body.innerHTML = "";
});

describe("getDetailsChildren", () => {
  it("returns the details children when present", async () => {
    const el = mount(`
      <ogds-accordion>
        <details><summary>One</summary></details>
        <details><summary>Two</summary></details>
      </ogds-accordion>
    `);
    await el.updateComplete;
    expect(el.detailsChildren).toBeDefined();
    expect(el.detailsChildren?.length).toBe(2);
  });

  it("logs a console error when no details children are present", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const el = mount(`<ogds-accordion></ogds-accordion>`);
    await el.updateComplete;
    expect(errorSpy).toHaveBeenCalledWith(
      "<ogds-accordion>: This component expects to have at least one details element as a child",
    );
    errorSpy.mockRestore();
  });
});

describe("addListSemantics", () => {
  it("adds role=list to the component when use-list-semantics is set", async () => {
    const el = mount(`
      <ogds-accordion use-list-semantics>
        <details><summary>One</summary></details>
      </ogds-accordion>
    `);
    await el.updateComplete;
    expect(el.getAttribute("role")).toBe("list");
  });

  it("adds role=listitem to each details child when use-list-semantics is set", async () => {
    const el = mount(`
      <ogds-accordion use-list-semantics>
        <details><summary>One</summary></details>
        <details><summary>Two</summary></details>
      </ogds-accordion>
    `);
    await el.updateComplete;
    el.querySelectorAll("details").forEach((d) => {
      expect(d.getAttribute("role")).toContain("listitem");
    });
  });

  it("does not add role=list when use-list-semantics is not set", async () => {
    const el = mount(`
      <ogds-accordion>
        <details><summary>One</summary></details>
      </ogds-accordion>
    `);
    await el.updateComplete;
    expect(el.getAttribute("role")).toBeNull();
  });

  it("does not add role=listitem to children when use-list-semantics is not set", async () => {
    const el = mount(`
      <ogds-accordion>
        <details><summary>One</summary></details>
      </ogds-accordion>
    `);
    await el.updateComplete;
    expect(el.querySelector("details")?.getAttribute("role")).toBeNull();
  });
});

describe("addHeadingSemantics", () => {
  it("adds role=heading and aria-level to each summary when heading-level is set", async () => {
    const el = mount(`
      <ogds-accordion heading-level="2">
        <details><summary>One</summary></details>
        <details><summary>Two</summary></details>
      </ogds-accordion>
    `);
    await el.updateComplete;
    el.querySelectorAll("summary").forEach((s) => {
      expect(s.getAttribute("role")).toBe("heading");
      expect(s.getAttribute("aria-level")).toBe("2");
    });
  });

  it("does not add heading role when heading-level is not set", async () => {
    const el = mount(`
      <ogds-accordion>
        <details><summary>One</summary></details>
      </ogds-accordion>
    `);
    await el.updateComplete;
    expect(el.querySelector("details")?.getAttribute("role")).toBeNull();
  });
});

describe("stylesheet adoption", () => {
  beforeEach(() => {
    (OgdsAccordion as any)._sheet = null;
    document.adoptedStyleSheets = [];
  });

  it("adds a stylesheet to document.adoptedStyleSheets on first mount", async () => {
    const el = mount(`
      <ogds-accordion>
        <details><summary>One</summary></details>
      </ogds-accordion>
    `);
    await el.updateComplete;
    expect(document.adoptedStyleSheets).toHaveLength(1);
  });

  it("does not add the stylesheet more than once when multiple accordions are mounted", async () => {
    const el1 = mount(`
      <ogds-accordion>
        <details><summary>One</summary></details>
      </ogds-accordion>
    `);
    const el2 = mount(`
      <ogds-accordion>
        <details><summary>Two</summary></details>
      </ogds-accordion>
    `);
    await Promise.all([el1.updateComplete, el2.updateComplete]);
    expect(document.adoptedStyleSheets).toHaveLength(1);
  });
});

describe("use-list-semantics and heading-level used together", () => {
  it("warns and applies neither when both attributes are present", async () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const el = mount(`
      <ogds-accordion use-list-semantics heading-level="3">
        <details><summary>One</summary></details>
        <details><summary>Two</summary></details>
      </ogds-accordion>
    `);
    await el.updateComplete;
    expect(warnSpy).toHaveBeenCalledOnce();
    expect(el.getAttribute("role")).toBeNull();
    el.querySelectorAll("details").forEach((d) => {
      expect(d.getAttribute("role")).toBeNull();
    });
    el.querySelectorAll("summary").forEach((s) => {
      expect(s.getAttribute("role")).toBeNull();
    });
    warnSpy.mockRestore();
  });
});
