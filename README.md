> [!CAUTION]
> Work on USWDS Elements, the Web Component version of the Design System, is happening in this repository. This code may not all be suitable for production use. Please refer to the documentation for each component.

# USWDS Elements

The [United States Web Design System](https://designsystem.digital.gov) includes a library of open source UI components and a visual style guide for U.S. federal government websites.

This repository is for the code for the Web Component-based version of the design system, currently in pre-release, with a goal release of May 2025. We maintain another repository for the [current version of the design system](https://github.com/uswds/uswds) as well as [its documentation and website](https://github.com/uswds/uswds-site). To see the design system and its documentation on the web, visit [https://designsystem.digital.gov](https://designsystem.digital.gov).

Over the course of the next several months (and beyond), we will incrementally build new [Web Component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)-based implementations of design system elements. We intend that, as we ship new Web Components, you will be able to use them existing USWDS components.

- [More on our decision to use Web Components](https://github.com/uswds/uswds-proposals/blob/main/decisions/0001-use-web-components.md)

## Upgrading to Web Components

We are releasing these Web Components incrementally with the intent that they can also be added incrementally to existing sites that are currently using USWDS. If you are not currently using USWDS or you are using a version older than USWDS 3, we recommend adopting version 3 in the near term rather than waiting until the full suite of Web Components is production-ready.

## Installation

For now, the best way to install USWDS Elements is via npm:

```
npm install -S @uswds/elements
```

How you add the component to a page may vary depending on the tools you use in your project. If you use Vite, you can add components by importing them into a script that is imported elsewhere into a page:

```js
// Importing into a javascript file, like index.js
import { UsaBanner } from "@uswds/elements";
```

```html
<!-- importing directy into an HTML page -->
<script type="module">
  import { UsaBanner } from "@uswds/elements";
</script>
<usa-banner></usa-banner>
```

> [!IMPORTANT]
> If you are bundling your application using Vite, you may encounter a JavaScript error when using the `usa-banner` component with Vite's dev server (this also applies to other Vite-based tools such as Astro). To work around this, you may need to run the dev server in production mode by prefixing the command to start the server with `NODE_ENV=production`. For instance, if you run the command `npm run dev` to start your dev server, you should start it with `NODE_ENV=production npm run dev`.

## Documentation

For more detailed documention, refer to the project's Storybook. You can visit the most up-to-date Storybook documentation on [Cloud.gov Pages](https://federalist-ab6c0bdb-eccd-4b26-bb5f-b0154661e999.sites.pages.cloud.gov/site/uswds/web-components/?path=/docs/readme--docs).

## Component Versions

| Component    | Status    |
| ------------ | --------- |
| `usa-banner` | Beta      |
| `usa-link`   | Pre-alpha |
