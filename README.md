# OGDS Elements

The Open Government Design System (OGDS) is a complement to and reimagining of the [United States Web Design System](https://designsystem.digital.gov) (USWDS). OGDS aims to ship components and styles that will feel at home in any site using USWDS. This project leverages the modern web platform to deliver the same level of reliability and accessibility as USWDS with less code.

You can (and should!) use both OGDS components and traditional USWDS components in your project. Some of our OGDS components are **enhanced** versions of USWDS components, such as the accordion and banner components. Some of our components are entirely **new**, such as the Task List component.

The components developed in OGDS Elements use [the same design tokens as USWDS](https://designsystem.digital.gov/design-tokens/), such as colors and spacing values. These are imported from the [OGDS Tokens project](https://github.com/open-government-design-system/ogds-tokens), which makes the USWDS design tokens available in multiple formats. In this project, we use [CSS Custom Properties (CSS Variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties), which means we can benefit from this feature of modern browsers. CSS Custom Properties have been [widely available in all major browsers since 2017](https://caniuse.com/css-variables)). This approach helps us to avoid a css compiler (like SASS), it helps us to manage themes and overrides, and it helps us style components in a simpler way.

## Component Documentation on Storybook

Where can I see exapmles of the OGDS Elements components? How do I set this up?

For more detailed documentation, see the [OGDS Elements Storybook](https://ogds-elements.jbhutch01.workers.dev/).

## Using OGDS Elements

### Installation using node and npm

1. Install `node/npm`. In the link below you can find the install method that coincides with your operating system:
    - Node (see [.nvmrc](https://github.com/open-government-design-system/ogds-elements/blob/develop/.nvmrc) for version number), [Installation guides](https://nodejs.org/en/download)

    **Note for Windows users:** If you are using Windows and are unfamiliar with Node or npm, we recommend following [Team Treehouse's tutorial](http://blog.teamtreehouse.com/install-node-js-npm-windows) for more information or [installing and running your project from Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl#install-nvm-nodejs-and-npm).

2. Make sure you have installed it correctly:

    ```shell
    npm -v
    10.9.4 # This line may vary depending on what version of Node you've installed.
    ```

3. Create a `package.json` file. You can do this manually, but an easier method is to use the `npm init` command. This command will prompt you with a few questions to create your `package.json` file.

4. Add `@ogds/elements` to your project’s `package.json`:

    ```shell
    npm install -S @ogds/elements
    ```

The `@ogds/elements` module is now installed as a dependency.

**Note:** We do _not_ recommend directly editing the design system files in `node_modules`. One of the benefits of using a package manager is its ease of upgrade and installation. If you make customizations to the files in the package, any upgrade or re-installation will wipe them out.

### Using OGDS Elements in your project

How you add a OGDS Elements component to a page might vary depending on your tools. If you use Vite, you can add components by importing them into a script that's imported elsewhere into a page:

```js
// Importing into a javascript file, like index.js
import { OgdsAccordion } from "@ogds/elements";
```

```html
<!-- importing directly into an HTML page -->
<script type="module">
    import { OgdsAccordion } from "@ogds/elements";
</script>
<ogds-accordion>
    <!--Refer to the accordion documentation for the code that actually goes in here -->
</ogds-accordion>
```

### Style theming and tokens

Each OGDS Element provides support for theming by exposing CSS custom properties (CSS variables) that can be used to control the appearance of the component.

Interactive form controls in our Storybook instance can demonstrate how to use the theming variables, provide custom text, and otherwise customize the components.

For example, the `ogds-banner` component can be customized by setting the `--ogds-banner-background-color` CSS variable to a color of your choosing:

```html
<style>
    ogds-banner {
        --ogds-banner-background-color: #d9e8f6; /** equivalent to `primary-lighter` from USWDS - https://designsystem.digital.gov/design-tokens/color/theme-tokens/#theme-color-tokens-table-2 */
        --ogds-banner-button-close-background-color: #d6f3ff;
    }
</style>
<ogds-banner></ogds-banner>
```

**Note:** Please be mindful of the accessibility implications of customizing component appearance. It's **your** responsibility to ensure that your customizations meet the [accessibility requirements](https://designsystem.digital.gov/accessibility/) of the design system and pass any [WCAG 2.2](https://www.w3.org/TR/WCAG22/) or [Section 508](https://www.section508.gov/) accessibility tests.

## Contributing to OGDS Elements

OGDS is run by contributors, including folks from many government agencies, departments, states, and more. If you have ideas for what to contribute, we would love your support!

### Code of Conduct

Everyone who participates in this project is expected to follow the OGDS Code of Conduct (TK CoC Link)

### Join the Mailing List and Slack

If you'd like to [join the People's Design System mailing list and Slack](https://docs.google.com/document/d/10XN6ZsRt9aAOH1PUmtfcCCEBZQUSgs1cCI5krYBOoi4/edit?tab=t.0), that is where we discuss these topics.

### Filing a bug report

If you discovered a bug that no one else has reported in our [issues backlog](https://github.com/open-government-design-system/ogds-elements/issues), let us know by [submitting an issue](https://github.com/open-government-design-system/ogds-elements/issues/new).

### Starting a discussion

To share ideas, questions, or concerns with the OGDS core team and community, you can join any of our [open discussions](https://github.com/open-government-design-system/ogds-elements/discussions) or [start a new one](https://github.com/open-government-design-system/ogds-elements/discussions/new/choose).

### Contributing Code

See Contributing.md
