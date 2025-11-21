import { describe, it, expect, vi, beforeEach } from "vitest";
import { defineCustomElement } from "./index";

describe("defineCustomElement", () => {
  let customElementsDefineSpy: ReturnType<typeof vi.spyOn>;
  let customElementsGetSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.restoreAllMocks();

    customElementsDefineSpy = vi.spyOn(customElements, "define");
    customElementsGetSpy = vi.spyOn(customElements, "get");
  });

  it("should define a custom element if it does not already exist", () => {
    customElementsGetSpy.mockReturnValue(undefined); // Simulate element not defined

    class MyElement extends HTMLElement {}
    const tagName = "my-test-element";

    defineCustomElement(tagName, MyElement);

    expect(customElementsGetSpy).toHaveBeenCalledWith(tagName);
    expect(customElementsDefineSpy).toHaveBeenCalledTimes(1);
    expect(customElementsDefineSpy).toHaveBeenCalledWith(tagName, MyElement);
  });

  it("should not define a custom element if it already exists", () => {
    class ExistingElement extends HTMLElement {}
    customElementsGetSpy.mockReturnValue(ExistingElement); // Simulate element already defined

    class MyElement extends HTMLElement {}
    const tagName = "my-existing-element";

    defineCustomElement(tagName, MyElement);

    expect(customElementsGetSpy).toHaveBeenCalledWith(tagName);
    expect(customElementsDefineSpy).not.toHaveBeenCalled();
  });
});
