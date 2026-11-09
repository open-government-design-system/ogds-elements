---
layout: layouts/element-page.njk
title: Accordion Overview
permalink: /elements/accordion/
eleventyNavigation:
    key: Accordion Overview
    parent: Accordion
    order: 2
description: Accordions show and hide sections of related content on a page.
---

## Differences between the OGDS Accordion and USWDS Accordion

- The OGDS implementation uses [the browser-native `<details>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details), which works even when JavaScript is not available (see [Fallbacks Without JavaScript](#fallbacks-without-javascript)).
- The OGDS implementation allows for the icon to be on the left or the right.
- The OGDS implementation allows for the icon itself to be customized.

## Example

<div class="element-example">
    <ogds-accordion>
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
<ogds-accordion>
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

### When to use the accordion component

**To organize related content.** Accordions can help reduce page length when there are multiple sections of content that users may not need to read in full.

**To let users get to relevant content faster.** Accordions keep a page focused by allowing users to choose what they read rather than having to scroll past large amounts of content.

### When to consider something else

**If users need most or all of the content.** If users are likely to need most of the content on a page, showing it all at once may be more helpful than hiding it behind an accordion.

**For critical information.** Avoid using accordions to hide important content that all users should see, as users may miss it.

### Usability guidance

**Use clear, descriptive labels.** The summary text should clearly describe the content within. Users should be able to decide whether to expand a section based on the label alone.

**Use icons to reinforce state.** Add the `with-icon` class to provide a visual indicator of open and closed state. Use `with-icon right` to align the icon to the trailing edge of the summary, or `with-icon plus` to use plus/minus icons instead of chevrons.

**Use `bordered` for visual separation.** Add the `bordered` class when the accordion needs stronger visual separation from surrounding content.
