import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("./ogds-primary-nav.css", () => ({ default: { cssText: "" } }));
vi.mock("../../shared/icons/expand_more.svg", () => ({ default: "" }));
vi.mock("../../shared/icons/expand_less.svg", () => ({ default: "" }));
vi.mock("../../core/token-styles", () => ({ adoptTokenStyles: vi.fn() }));

import { OgdsPrimaryNav } from "./index";

const examplePrimaryNavigation = `
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
    <li>
      <details>
        <summary>Section one</summary>
        <ul>
          <li><a href="/one/a">One A</a></li>
          <li><a href="/one/b">One B</a></li>
        </ul>
      </details>
    </li>
    <li>
      <details>
        <summary>Section two</summary>
        <ul>
          <li><a href="/two/a">Two A</a></li>
        </ul>
      </details>
    </li>
  </ul>
`;

function mount(html: string): OgdsPrimaryNav {
  const container = document.createElement("div");
  container.innerHTML = html;
  const el = container.firstElementChild as OgdsPrimaryNav;
  document.body.appendChild(el);
  return el;
}

beforeEach(() => {
  document.adoptedStyleSheets = [];
  (OgdsPrimaryNav as any)._stylesheet = null;
});

afterEach(() => {
  document.body.innerHTML = "";
});

describe("default ARIA", () => {
  it("sets role=navigation when no role is present", async () => {
    const el = mount(
      `<ogds-primary-nav>${examplePrimaryNavigation}</ogds-primary-nav>`,
    );
    await el.updateComplete;
    expect(el.getAttribute("role")).toBe("navigation");
  });

  it("does not override an author-supplied role", async () => {
    const el = mount(
      `<ogds-primary-nav role="menu">${examplePrimaryNavigation}</ogds-primary-nav>`,
    );
    await el.updateComplete;
    expect(el.getAttribute("role")).toBe("menu");
  });

  it("defaults aria-label to 'Primary navigation'", async () => {
    const el = mount(
      `<ogds-primary-nav>${examplePrimaryNavigation}</ogds-primary-nav>`,
    );
    await el.updateComplete;
    expect(el.getAttribute("aria-label")).toBe("Primary navigation");
  });

  it("does not override an author-supplied aria-label", async () => {
    const el = mount(
      `<ogds-primary-nav aria-label="Site">${examplePrimaryNavigation}</ogds-primary-nav>`,
    );
    await el.updateComplete;
    expect(el.getAttribute("aria-label")).toBe("Site");
  });

  it("does not set aria-label when aria-labelledby is present", async () => {
    const el = mount(
      `<ogds-primary-nav aria-labelledby="nav-heading">${examplePrimaryNavigation}</ogds-primary-nav>`,
    );
    await el.updateComplete;
    expect(el.hasAttribute("aria-label")).toBe(false);
  });
});

describe("submenu exclusivity", () => {
  it("assigns a shared name to top-level submenus so only one stays open", async () => {
    const el = mount(
      `<ogds-primary-nav>${examplePrimaryNavigation}</ogds-primary-nav>`,
    );
    await el.updateComplete;
    const [first, second] = Array.from(el.querySelectorAll("details"));
    expect(first.name).not.toBe("");
    expect(first.name).toBe(second.name);
  });

  it("does not overwrite an author-supplied name", async () => {
    const el = mount(`
      <ogds-primary-nav>
        <ul>
          <li>
            <details name="custom">
              <summary>Section</summary>
              <ul><li><a href="/a">A</a></li></ul>
            </details>
          </li>
        </ul>
      </ogds-primary-nav>
    `);
    await el.updateComplete;
    expect(el.querySelector("details")?.getAttribute("name")).toBe("custom");
  });
});

describe("outside click", () => {
  it("closes an open submenu when clicking outside it", async () => {
    const el = mount(
      `<ogds-primary-nav>${examplePrimaryNavigation}</ogds-primary-nav>`,
    );
    await el.updateComplete;
    const details = el.querySelector("details") as HTMLDetailsElement;
    details.open = true;

    document.body.click();

    expect(details.open).toBe(false);
  });

  it("does not close a submenu when clicking a link inside it", async () => {
    const el = mount(
      `<ogds-primary-nav>${examplePrimaryNavigation}</ogds-primary-nav>`,
    );
    await el.updateComplete;
    const details = el.querySelector("details") as HTMLDetailsElement;
    details.open = true;

    details.querySelector("a")?.click();

    expect(details.open).toBe(true);
  });
});

describe("keyboard", () => {
  it("on Escape key press, the open submenu is closed and focus moves to its summary ", async () => {
    const el = mount(
      `<ogds-primary-nav>${examplePrimaryNavigation}</ogds-primary-nav>`,
    );
    await el.updateComplete;
    const details = el.querySelector("details") as HTMLDetailsElement;
    details.open = true;

    el.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    );

    expect(details.open).toBe(false);
    expect(document.activeElement).toBe(details.querySelector("summary"));
  });

  it("on Escape key press with multiple submenus open (distinct author-supplied names), closes the one focus is inside", async () => {
    const el = mount(`
      <ogds-primary-nav>
        <ul>
          <li>
            <details name="one">
              <summary>Section one</summary>
              <ul><li><a href="/one/a">One A</a></li></ul>
            </details>
          </li>
          <li>
            <details name="two">
              <summary>Section two</summary>
              <ul><li><a href="/two/a">Two A</a></li></ul>
            </details>
          </li>
        </ul>
      </ogds-primary-nav>
    `);
    await el.updateComplete;
    const [first, second] = Array.from(el.querySelectorAll("details"));
    first.open = true;
    second.open = true;
    const secondLink = second.querySelector("a") as HTMLAnchorElement;
    secondLink.focus();

    el.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    );

    expect(second.open).toBe(false);
    expect(first.open).toBe(true);
    expect(document.activeElement).toBe(second.querySelector("summary"));
  });
});

describe("stylesheet adoption", () => {
  it("adds a stylesheet to document.adoptedStyleSheets on first mount", async () => {
    const el = mount(
      `<ogds-primary-nav>${examplePrimaryNavigation}</ogds-primary-nav>`,
    );
    await el.updateComplete;
    expect(document.adoptedStyleSheets).toHaveLength(1);
  });

  it("does not add the stylesheet more than once when multiple navs are mounted", async () => {
    const el1 = mount(
      `<ogds-primary-nav>${examplePrimaryNavigation}</ogds-primary-nav>`,
    );
    const el2 = mount(
      `<ogds-primary-nav>${examplePrimaryNavigation}</ogds-primary-nav>`,
    );
    await Promise.all([el1.updateComplete, el2.updateComplete]);
    expect(document.adoptedStyleSheets).toHaveLength(1);
  });
});
