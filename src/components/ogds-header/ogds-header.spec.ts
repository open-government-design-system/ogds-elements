import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("./ogds-header.css", () => ({ default: { cssText: "" } }));
vi.mock("../../shared/icons/menu.svg", () => ({ default: "" }));
vi.mock("../../shared/icons/close.svg", () => ({ default: "" }));
vi.mock("../../core/token-styles", () => ({ adoptTokenStyles: vi.fn() }));

import { OgdsHeader } from "./ogds-header";

/**
 * jsdom doesn't implement the imperative <dialog> API at all, so polyfill
 * just enough of it (open state, the close event, and :modal matching) for
 * the component's drawer logic to run without throwing.
 *
 * Tracking issue for this, which is also where the polyfill idea came from
 * https://github.com/jsdom/jsdom/issues/3294
 *
 * TODO: See if there are alternatives for Jsdom that don't have this issue
 * (that issue is really old which isn't a good signal)
 */
const modalDialogs = new WeakSet<HTMLDialogElement>();
const originalMatches = HTMLDialogElement.prototype.matches;

HTMLDialogElement.prototype.show = function (this: HTMLDialogElement) {
  if (this.open) return;
  this.open = true;
  modalDialogs.delete(this);
};
HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
  if (this.open) {
    throw new DOMException(
      "Failed to execute 'showModal' on 'HTMLDialogElement': The element already has an 'open' attribute, and therefore cannot be opened modally.",
      "InvalidStateError",
    );
  }
  this.open = true;
  modalDialogs.add(this);
};
HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
  if (!this.open) return;
  this.open = false;
  modalDialogs.delete(this);
  this.dispatchEvent(new Event("close"));
};
HTMLDialogElement.prototype.matches = function (
  this: HTMLDialogElement,
  selector: string,
): boolean {
  if (selector === ":modal") return modalDialogs.has(this);
  return originalMatches.call(this, selector);
} as typeof HTMLDialogElement.prototype.matches;

function mount(html = "<ogds-header></ogds-header>"): OgdsHeader {
  const container = document.createElement("div");
  container.innerHTML = html;
  const el = container.firstElementChild as OgdsHeader;
  document.body.appendChild(el);
  return el;
}

function mockMatchMedia(initialMatches: boolean) {
  let matches = initialMatches;
  const listeners = new Set<(event: { matches: boolean }) => void>();
  const mql = {
    get matches() {
      return matches;
    },
    addEventListener: (
      type: string,
      cb: (event: { matches: boolean }) => void,
    ) => {
      if (type === "change") listeners.add(cb);
    },
    removeEventListener: (
      type: string,
      cb: (event: { matches: boolean }) => void,
    ) => {
      if (type === "change") listeners.delete(cb);
    },
  };
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => mql),
  );
  return {
    setMatches(next: boolean) {
      matches = next;
      listeners.forEach((cb) => cb({ matches: next }));
    },
  };
}

function simulateSlotChange(
  el: OgdsHeader,
  slotName: string,
  nodes: Node[],
): HTMLElement {
  const slot = el.shadowRoot!.querySelector<HTMLSlotElement>(
    `slot[name="${slotName}"]`,
  )!;
  vi.spyOn(slot, "assignedNodes").mockReturnValue(nodes);
  slot.dispatchEvent(new Event("slotchange", { bubbles: true }));
  return slot.closest<HTMLElement>("[part]")!;
}

beforeEach(() => {
  mockMatchMedia(true);
});

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("default ARIA", () => {
  it("sets role=banner when no role is present", async () => {
    const el = mount();
    await el.updateComplete;
    expect(el.getAttribute("role")).toBe("banner");
  });

  it("does not override an author-supplied role", async () => {
    const el = mount('<ogds-header role="region"></ogds-header>');
    await el.updateComplete;
    expect(el.getAttribute("role")).toBe("region");
  });
});

describe("variant", () => {
  it("defaults to extended and reflects as an attribute", async () => {
    const el = mount();
    await el.updateComplete;
    expect(el.variant).toBe("extended");
    expect(el.getAttribute("variant")).toBe("extended");
  });

  it("reflects an author-supplied variant", async () => {
    const el = mount('<ogds-header variant="basic"></ogds-header>');
    await el.updateComplete;
    expect(el.variant).toBe("basic");
    expect(el.getAttribute("variant")).toBe("basic");
  });
});

describe("desktop/mobile structure", () => {
  it("never renders a <dialog> at desktop widths", async () => {
    mockMatchMedia(true);
    const el = mount();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("dialog")).toBeNull();
    expect(el.shadowRoot!.querySelector(".primary-row")).not.toBeNull();
  });

  it("renders a closed <dialog> at mobile widths", async () => {
    mockMatchMedia(false);
    const el = mount();
    await el.updateComplete;
    const dialog = el.shadowRoot!.querySelector("dialog");
    expect(dialog).not.toBeNull();
    expect(dialog!.open).toBe(false);
  });

  it("closes an open modal drawer and removes it from the DOM when resizing to desktop", async () => {
    const media = mockMatchMedia(false);
    const el = mount();
    await el.updateComplete;
    const dialog = el.shadowRoot!.querySelector("dialog")!;
    dialog.showModal();
    expect(dialog.open).toBe(true);

    media.setMatches(true);
    await el.updateComplete;

    expect(dialog.open).toBe(false);
    expect(el.shadowRoot!.querySelector("dialog")).toBeNull();
  });

  it("renders nav-secondary alongside the navbar in the extended variant", async () => {
    mockMatchMedia(true);
    const el = mount('<ogds-header variant="extended"></ogds-header>');
    await el.updateComplete;
    const navbarRow = el.shadowRoot!.querySelector(".navbar-row");
    expect(navbarRow!.querySelector(".nav-secondary")).not.toBeNull();
    expect(
      el.shadowRoot!.querySelector(".primary-row .nav-secondary"),
    ).toBeNull();
  });

  it("renders nav-secondary alongside the primary row in the basic variant", async () => {
    mockMatchMedia(true);
    const el = mount('<ogds-header variant="basic"></ogds-header>');
    await el.updateComplete;
    const primaryRow = el.shadowRoot!.querySelector(".primary-row");
    expect(primaryRow!.querySelector(".nav-secondary")).not.toBeNull();
    expect(
      el.shadowRoot!.querySelector(".navbar-row .nav-secondary"),
    ).toBeNull();
  });
});

describe("menu button", () => {
  it("opens the nav modally and sets aria-expanded on click", async () => {
    mockMatchMedia(false);
    const el = mount();
    await el.updateComplete;
    const dialog = el.shadowRoot!.querySelector("dialog")!;
    const menuBtn = el.shadowRoot!.querySelector(".menu-btn") as HTMLElement;

    menuBtn.click();

    expect(dialog.open).toBe(true);
    expect(dialog.matches(":modal")).toBe(true);
    expect(menuBtn.getAttribute("aria-expanded")).toBe("true");
  });

  it("does not call showModal again while already open", async () => {
    // dialog throws InvalidStateError from showModal() if
    // the modal is already open
    mockMatchMedia(false);
    const el = mount();
    await el.updateComplete;
    const dialog = el.shadowRoot!.querySelector("dialog")!;
    const menuBtn = el.shadowRoot!.querySelector(".menu-btn") as HTMLElement;
    const showModalSpy = vi.spyOn(dialog, "showModal");

    menuBtn.click();
    menuBtn.click();

    expect(showModalSpy).toHaveBeenCalledTimes(1);
  });

  it("closes the nav via the close button", async () => {
    mockMatchMedia(false);
    const el = mount();
    await el.updateComplete;
    const dialog = el.shadowRoot!.querySelector("dialog")!;
    const menuBtn = el.shadowRoot!.querySelector(".menu-btn") as HTMLElement;
    menuBtn.click();

    (el.shadowRoot!.querySelector(".nav-close") as HTMLElement).click();

    expect(dialog.open).toBe(false);
  });

  it("resets aria-expanded when the nav is closed", async () => {
    mockMatchMedia(false);
    const el = mount();
    await el.updateComplete;
    const dialog = el.shadowRoot!.querySelector("dialog")!;
    const menuBtn = el.shadowRoot!.querySelector(".menu-btn") as HTMLElement;
    menuBtn.click();

    dialog.close();

    expect(menuBtn.getAttribute("aria-expanded")).toBe("false");
  });
});

describe("backdrop click", () => {
  it("closes the nav when clicking the dialog backdrop", async () => {
    mockMatchMedia(false);
    const el = mount();
    await el.updateComplete;
    const dialog = el.shadowRoot!.querySelector("dialog")!;
    dialog.showModal();

    dialog.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(dialog.open).toBe(false);
  });

  it("does not close the nav when clicking content inside the dialog", async () => {
    mockMatchMedia(false);
    const el = mount();
    await el.updateComplete;
    const dialog = el.shadowRoot!.querySelector("dialog")!;
    dialog.showModal();
    const inner = el.shadowRoot!.querySelector(".nav-primary") as HTMLElement;

    inner.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(dialog.open).toBe(true);
  });
});

describe("optional slots", () => {
  it("hides the info row until content is slotted", async () => {
    const el = mount();
    await el.updateComplete;
    const wrapper = el.shadowRoot!.querySelector(".info-row") as HTMLElement;
    expect(wrapper.hidden).toBe(true);

    simulateSlotChange(el, "info", [document.createElement("div")]);
    expect(wrapper.hidden).toBe(false);

    simulateSlotChange(el, "info", []);
    expect(wrapper.hidden).toBe(true);
  });

  it("hides the notifications row until content is slotted", async () => {
    const el = mount();
    await el.updateComplete;
    const wrapper = el.shadowRoot!.querySelector(
      ".notifications",
    ) as HTMLElement;
    expect(wrapper.hidden).toBe(true);

    simulateSlotChange(el, "notifications", [document.createElement("div")]);
    expect(wrapper.hidden).toBe(false);
  });
});
