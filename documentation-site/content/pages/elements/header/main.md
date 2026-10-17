---
layout: layouts/element-page.njk
title: Header
permalink: /elements/header/
eleventyNavigation:
    key: Header
    parent: Elements
description: A header helps users identify where they are and provides a quick, organized way to reach the main sections of a website.
storybook_url: TKTKTK
accessibility_tests_url: TKTKTK
---

Based on the [USWDS Header component](https://designsystem.digital.gov/components/header/), supporting both the basic and extended variants (but not megamenu at the moment).

## Example

<div class="element-example">

  <style>
    .example-search {
      display: flex;
    }

    .example-search input[type="search"] {
      border: 1px solid var(--ogds-theme-color-base-dark);
      border-radius: 0;
      border-right: none;
      font-family: var(--ogds-theme-button-font-family);
      height: 2.5rem;
      padding-inline: var(--ogds-spacing-1);
    }

    .example-search button {
      background-color: var(--ogds-theme-button-fill-color);
      border: none;
      border-radius: 0 var(--ogds-theme-button-border-radius)
        var(--ogds-theme-button-border-radius) 0;
      color: var(--ogds-theme-button-text-color);
      cursor: pointer;
      font-family: var(--ogds-theme-button-font-family);
      font-weight: 700;
      height: 2.5rem;
      padding-inline: var(--ogds-spacing-105);
    }

    .example-search button:hover {
      background-color: var(--ogds-theme-color-primary-dark);
    }
  </style>

  <style>
    .example-secondary-links {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .example-secondary-links li + li {
      border-inline-start: 1px solid var(--ogds-theme-color-base-lighter);
      margin-inline-start: var(--ogds-spacing-1);
      padding-inline-start: var(--ogds-spacing-1);
    }

    .example-secondary-links a {
      color: var(--ogds-theme-color-base);
      font-family: var(--ogds-theme-button-font-family);
      font-size: var(--ogds-theme-type-scale-2xs);
      text-decoration: none;
    }

    .example-secondary-links a:hover {
      color: var(--ogds-theme-color-primary);
      text-decoration: underline;
    }
  </style>

<ogds-header>
  <div slot="logo"><a href="/">Project name</a></div>
  <span slot="nav-primary">
  </span>  <ogds-primary-nav slot="nav-primary">
    <ul>
      <li><a href="#" aria-current="page">Current section</a></li>
      <li>
        <details>
          <summary>Benefits</summary>
          <ul>
            <li><a href="#">Navigation link</a></li>
            <li><a href="#">Navigation link</a></li>
            <li><a href="#">Navigation link</a></li>
            <li><a href="#">Navigation link</a></li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>Resources</summary>
          <ul>
            <li><a href="#">Navigation link</a></li>
            <li><a href="#">Navigation link</a></li>
            <li><a href="#">Navigation link</a></li>
          </ul>
        </details>
      </li>
      <li><a href="#">Simple link</a></li>
    </ul>
  </ogds-primary-nav>  <span slot="nav-primary">
</span>
  <div slot="notifications">Notifications</div>
  <span slot="nav-secondary">
  </span>  <ul class="example-secondary-links" slot="nav-secondary">
    <li><a href="#">Secondary link</a></li>
    <li><a href="#">Another secondary link</a></li>
  </ul>  <span slot="nav-secondary">

</span> <form class="example-search" role="search" slot="nav-secondary">
<input type="search" aria-label="Search" name="q">
<button type="submit">Search</button>
  </form>  <span slot="nav-secondary">
</span>
</ogds-header>

</div>

### Example Code

```html
<style>
    .example-search {
        display: flex;
    }

    .example-search input[type="search"] {
        border: 1px solid var(--ogds-theme-color-base-dark);
        border-radius: 0;
        border-right: none;
        font-family: var(--ogds-theme-button-font-family);
        height: 2.5rem;
        padding-inline: var(--ogds-spacing-1);
    }

    .example-search button {
        background-color: var(--ogds-theme-button-fill-color);
        border: none;
        border-radius: 0 var(--ogds-theme-button-border-radius)
            var(--ogds-theme-button-border-radius) 0;
        color: var(--ogds-theme-button-text-color);
        cursor: pointer;
        font-family: var(--ogds-theme-button-font-family);
        font-weight: 700;
        height: 2.5rem;
        padding-inline: var(--ogds-spacing-105);
    }

    .example-search button:hover {
        background-color: var(--ogds-theme-color-primary-dark);
    }
</style>

<style>
    .example-secondary-links {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .example-secondary-links li + li {
        border-inline-start: 1px solid var(--ogds-theme-color-base-lighter);
        margin-inline-start: var(--ogds-spacing-1);
        padding-inline-start: var(--ogds-spacing-1);
    }

    .example-secondary-links a {
        color: var(--ogds-theme-color-base);
        font-family: var(--ogds-theme-button-font-family);
        font-size: var(--ogds-theme-type-scale-2xs);
        text-decoration: none;
    }

    .example-secondary-links a:hover {
        color: var(--ogds-theme-color-primary);
        text-decoration: underline;
    }
</style>

<ogds-header>
    <div slot="logo"><a href="/">Project name</a></div>
    <span slot="nav-primary"> </span>
    <ogds-primary-nav slot="nav-primary">
        <ul>
            <li><a href="#" aria-current="page">Current section</a></li>
            <li>
                <details>
                    <summary>Benefits</summary>
                    <ul>
                        <li><a href="#">Navigation link</a></li>
                        <li><a href="#">Navigation link</a></li>
                        <li><a href="#">Navigation link</a></li>
                        <li><a href="#">Navigation link</a></li>
                    </ul>
                </details>
            </li>
            <li>
                <details>
                    <summary>Resources</summary>
                    <ul>
                        <li><a href="#">Navigation link</a></li>
                        <li><a href="#">Navigation link</a></li>
                        <li><a href="#">Navigation link</a></li>
                    </ul>
                </details>
            </li>
            <li><a href="#">Simple link</a></li>
        </ul>
    </ogds-primary-nav>
    <span slot="nav-primary"> </span>
    <div slot="notifications">Notifications</div>
    <span slot="nav-secondary"> </span>
    <ul class="example-secondary-links" slot="nav-secondary">
        <li><a href="#">Secondary link</a></li>
        <li><a href="#">Another secondary link</a></li>
    </ul>
    <span slot="nav-secondary"> </span>
    <form class="example-search" role="search" slot="nav-secondary">
        <input type="search" aria-label="Search" name="q" />
        <button type="submit">Search</button>
    </form>
    <span slot="nav-secondary"> </span>
</ogds-header>
```

For more code examples, see Storybook (link at the top of this page).

## Author markup

`<ogds-header>` is a slot-based shell. The consuming app provides the content, and the component provides layout and the responsive layout/drawer behavior.
The slot architecture is meant to reflect the known existing use cases from USWDS and specific variants for state agency (Maryland) use cases. Because the
secondary nav area (on the right side of the header at desktop widths) will vary drastically both in terms of design and implementation (for functionality
like search, account info, etc.), it is mostly an empty logic-less slot that can accommodate arbitrary content, but does not have opinions about that content.
All of the examples here use the `ogds-primary-nav` component in the primary nav slot, but if that component does not work for your use case (i.e. you need
megamenu support or there is existing logic in your nav implementation that would be tricky to port to the component) then it should work with your exisiting nav.

```html
<ogds-header variant="extended">
    <div slot="logo"><a href="/">Project name</a></div>
    <div slot="notifications">Notifications</div>
    <div slot="info">Alert or banner content</div>

    <ul slot="nav-secondary">
        <li><a href="#">One</a></li>
    </ul>
    <form slot="nav-secondary"><input type="search" /></form>

    <ogds-primary-nav slot="nav-primary">
        <ul>
            <li><a href="#" aria-current="page">Current section</a></li>
        </ul>
    </ogds-primary-nav>
</ogds-header>
```

- **`logo`** (required) — Typically a link to the homepage.
- **`nav-primary`** (required) — Expects an `<ogds-primary-nav>`.
- **`nav-secondary`** (optional) — Links and/or a search form. At desktop widths, this section aligns with the logo. At widths below the desktop breakpoint (e.g. mobile, tablet), this content folds into the drawer along with the primary nav. The component consumer is responsible for the contents here and for implementing responsive behavior.
- **`notifications`** (optional) — Shown in the same row as the primary nav. It's called "notifications" but doesn't need to be that.
- **`info`** (optional) — A banner/alert row between the navbar and the nav drawer.

Optional slots that receive no content aren't rendered. Omit them rather than passing an empty element.

## `variant` attribute

- `extended` (default) — secondary nav appears in its own area, aligned with the logo, at desktop widths.
- `basic` — secondary nav sits inline alongside the primary nav instead.

## `icon` attribute

Add the boolean `icon` attribute to show a hamburger icon on the menu button, in addition to its "Menu" label. Sized with `--ogds-header-icon-menu-size`.

## Responsive behavior

Below the desktop breakpoint (64rem), the primary and secondary nav collapse into a `<dialog>` drawer that slides in from the right when the menu button is pressed.
This includes a backdrop, a focus trap, and Escape-to-close, all native to `<dialog>`.

## Full-bleed rows

At desktop widths, `--ogds-header-navbar-background-color`, `--ogds-header-info-background-color`, and `--ogds-header-nav-primary-row-background-color` all paint edge-to-edge automatically. A background color fills the full viewport width while the row's own content stays inside the `--ogds-header-max-width` column, no extra markup or opt-in required.

`--ogds-header-nav-secondary-background-color` bleeds on the side facing away from whatever it shares that row with (the navbar in `extended`, the primary nav in `basic`). When it's unset, it defaults to that other row's color, so setting only `--ogds-header-navbar-background-color` (or, in `basic`, only `--ogds-header-nav-primary-row-background-color`) already gives you one seamless band with no further configuration. Set `--ogds-header-nav-secondary-background-color` explicitly if you want an intentional two-tone split instead. If you need finer-grained control than the built-in custom properties offer, every structural piece is also exposed via a shadow part (targeted with `::part()` in the CSS): `part="navbar"`, `part="info"`, `part="nav-primary-row"`, `part="nav-secondary"`, `part="menu-btn"`, `part="nav-close"`, `part="logo"`, `part="notifications"`.

## Sizing model

`--ogds-header-max-width` matches the [`content-box`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing) convention of a USWDS `.grid-container`: the content column itself is `max-width` wide, and `--ogds-header-padding-inline` is added _outside_ that (so the rendered width caps at `max-width + 2 * padding-inline`). Reuse the same `max-width` value you use for your page's `.grid-container` to line the two up exactly, with no extra math. Refer to the [USWDS documentation](https://designsystem.digital.gov/utilities/layout-grid/) for `grid-container` widths.
