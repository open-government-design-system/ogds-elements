---
layout: layouts/element-page.njk
title: Accordion Toggle Overview
permalink: /elements/accordion/accordion-toggle/
eleventyNavigation:
    key: Accordion Toggle Overview
    parent: Accordion Toggle
    order: 1
description: The accordion toggle provides a single button to expand or collapse all panels in an associated accordion.
---

## Example

<div class="element-example">

  <ogds-accordion-toggle controls="accordion-toggle-default">
  </ogds-accordion-toggle>
  <ogds-accordion id="accordion-toggle-default">
  <details>
    <summary>First Amendment</summary>
    <p>
      Congress shall make no law respecting an establishment of religion, or
      prohibiting the free exercise thereof; or abridging the freedom of speech,
      or of the press; or the right of the people peaceably to assemble, and to
      petition the Government for a redress of grievances.
    </p>
  </details>
  <details>
    <summary>Second Amendment</summary>
    <p>
      A well regulated Militia, being necessary to the security of a free State,
      the right of the people to keep and bear Arms, shall not be infringed.
    </p>
  </details>
  <details>
    <summary>Third Amendment</summary>
    <p>
      No Soldier shall, in time of peace be quartered in any house, without the
      consent of the Owner, nor in time of war, but in a manner to be prescribed
      by law.
    </p>
  </details>
</ogds-accordion>
</div>

### Example Code

```html
<ogds-accordion-toggle controls="accordion-toggle-default">
</ogds-accordion-toggle>
<ogds-accordion id="accordion-toggle-default">
    <details>
        <summary>First Amendment</summary>
        <p>
            Congress shall make no law respecting an establishment of religion,
            or prohibiting the free exercise thereof; or abridging the freedom
            of speech, or of the press; or the right of the people peaceably to
            assemble, and to petition the Government for a redress of
            grievances.
        </p>
    </details>
    <details>
        <summary>Second Amendment</summary>
        <p>
            A well regulated Militia, being necessary to the security of a free
            State, the right of the people to keep and bear Arms, shall not be
            infringed.
        </p>
    </details>
    <details>
        <summary>Third Amendment</summary>
        <p>
            No Soldier shall, in time of peace be quartered in any house,
            without the consent of the Owner, nor in time of war, but in a
            manner to be prescribed by law.
        </p>
    </details>
</ogds-accordion>
```

For more code examples, see Storybook (link at the top of this page).

## Guidance

### When to use the accordion toggle

_When accordions have many items._ The toggle is most useful when an accordion has more than two or three items, where expanding each individually would be tedious and users may want to scan all of the content at once.

_For cross-browser in-page search._ `Cmd-/Ctrl-F` will find content in collapsed accordion sections and open the relevant sections in Chrome and Chromium-based browsers. However, as of now this behavior is limited to only those browsers (see ["Auto-opens when matched via page search"](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details#browser_compatibility)). Adding the toggle button will allow users to search all of the accordion content in any browser.

_To support users looking to print the page content._ Let users display all of the page's content so it can be printed.

### Usage

Connect the toggle to an accordion using the `controls` attribute, which must match the `id` of the target `<ogds-accordion>`:

```html
<ogds-accordion-toggle controls="my-accordion"></ogds-accordion-toggle>
<ogds-accordion id="my-accordion">
    <details>
        <summary>Item One</summary>
        <p>Content</p>
    </details>
</ogds-accordion>
```

### Customizing labels

By default, the button reads "Expand All" when all panels are collapsed and "Collapse All" when any panel is open. Override these with the `expand-label` and `collapse-label` named slots:

```html
<ogds-accordion-toggle controls="my-accordion">
    <span slot="expand-label">Show All</span>
    <span slot="collapse-label">Hide All</span>
</ogds-accordion-toggle>
```
