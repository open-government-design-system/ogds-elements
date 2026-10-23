---
layout: layouts/element-page.njk
title: Using the Accordion
permalink: /elements/accordion/using/
eleventyNavigation:
    key: Using the Accordion
    parent: Accordion
    order: 2
description: How to integrate the Accordion component in your codebase.
---

## Built-in `<details>` element functionality

Because the component uses `<details>` elements, you can use all of the built-in functionality that element supports, including:

1. **Exclusive accordion behavior with the `name` attribute.** By default, a user can open multiple accordion panels at once. In some use cases, only allowing one panel to be open at one time may be a better experience. To acheive this behavior, just add a `name="myAccordion"` ([MDN reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details#name)) to each `<details>` that needs to be exclusive (the value of the attribute does not matter as long as it is shared across each of the details elements):

```html
<ogds-accordion>
    <details name="anExclusiveAccordion">
        <summary>Foo</summary>
    </details>
    <details name="anExclusiveAccordion">
        <summary>Bar</summary>
    </details>
    <!-- and so on...  -->
</ogds-accordion>
```

2. **Make panel `open` by default.** Any `<details>` with an `open` attribute ([MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details#open)) on it will be open when the page loads (be careful when using this with the `name` attribute described above).

## Accessibility guidance

The accordion uses the native `<details>` and `<summary>` HTML elements, which provide built-in keyboard interaction and screen reader support without requiring additional JavaScript.

### ARIA Support

Depending on the kind of content in the accordion, you may want to add some ARIA to provide a better experience for assistive technology users. Headings and lists in particular, can be important landmarks for screen readers. The `<ogds-accordion>` component provides an easy way to add ARIA that may be helpful depending on your content:

1. **Heading semantics.** The USWDS accordion uses heading elements inside the buttons that toggle the sections. If you want to follow this pattern, you can add a `heading-level=<Number>` attribute to the opening `<ogds-accordion>` tag, and it will automatically set the correct ARIA attributes on each of the child `<summary>` tags to set the heading at the level you tell it. As always, it is important to use the right heading level to preserve the document outline. Even if you are not using the web component version of the component, you can achieve this same effect by including a heading element inside the summary tag, though this may require a little extra CSS to keep the visual appearance consistent.
2. **List semantics.** If the content in the accordion makes more sense as a list, adding a `use-list-semantics` attribute to the `<ogds-accordion>` tag will add the correct ARIA.

## Custom Element vs CSS-Only Versions

### Custom Element Behavior

The examples on this page use the cusom element `<ogds-accordion></ogds-accordion>`. This custom element uses all light DOM (no [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)). This custom element is used for styling, and it makes it easy to access the icon variations. [Custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) have been [widely supported since 2020](https://caniuse.com/wf-autonomous-custom-elements), but do require JavaScript for some of their functionality.

### Fallbacks without JavaScript

If a user does not have JavaScript for any reason, this component will still generally work.

1. **Native details component.** This approach uses the browser-native `<details>` component, these can be opened in closed without JavaScript in all browsers that support this feature ([widely available since January 2020](https://caniuse.com/details)). In an even older browser, the accordions would all be open by default, so content would not be hidden.
2. **Styles.** As long as you have the accordion styles pulled into your application's styles, the visual styling will still work without JavaScript.
3. **Class-based equivalent.** You can optionally substitute `<div class="ogds-accordion">` in place of `<ogds-accordion>`. These are equivalent, and will not affect styling or behavior for this component.
4. **Icons.** If you are using non-default icons and you also want those to work witohut JavaScript, then you can update your project's CSS styles to point to the svg files:

```css
ogds-accordion,
.ogds-accordion {
    --ogds-accordion-icon-closed: url("/path/to/your/icon-closed.svg");
    --ogds-accordion-icon-open: url("/path/to/your/icon-open.svg");
}
```

---
