# OGDS Elements

The Open Government Design System (OGDS) is a complement to and reimagining of the [United States Web Design System](https://designsystem.digital.gov) (USWDS). OGDS aims to ship components and styles that will feel at home in any site using USWDS while leveraging the modern web platform to deliver the same level of reliability and accessibility as USWDS with less code.

## Installation using node and npm

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

## Using OGDS Elements in your project

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

## Style theming and tokens

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

## Documentation

For more detailed documentation, refer to the Storybook for OGDS Elements. The Storybook isn't currently available online, but you can see it either by cloning this repo and running `npm run start` or by installing the package and running the same command at the package root inside of your `node_modules` folder.

## Publishing

This repository is automatically published to NPM when a new release is created.

We use Changesets to manage changelogs, version bumps, pre-releases (alpha/beta), and automated publishing via GitHub Actions. The repository includes a pre-configured Changesets setup so you can create pre-releases (for example, `alpha`) and standard releases.

### Pre-release flow

If you're working on a pre-release version, enter pre-release mode:

```bash
   npx @changesets/cli pre enter <tag> # for example, npx @changesets/cli pre enter alpha
```

This will write a `.changeset/pre.json` that configures the pre-release tag and initial version. This file should be committed to the repository.

**Note:** Once you're in pre-release mode, you don't have to enter it every time. When you're ready to exit pre-release mode, run:

```bash
npx @changesets/cli pre exit
```

### Version bumps, and publishing (Changesets)

1. Create a changeset describing your change(s)
    - Run the interactive prompt and follow the questions:

        ```bash
        npx @changesets/cli
        ```

    - The command creates a file under the `.changeset/` directory that describes the packages and the release type (patch/minor/major). You can edit this file to add more details, such as a link to the issue or pull request that the change addresses. The file will automatically get a nonsensical name like `fire-penguin-annex.md`, and that's normal. These files are only in the repository for a short time, to generate changelogs and version bumps. They aren't published to NPM and are cleaned up after the release is published.

2. Bump versions locally (optional)
    - To update package.json versions and changelogs locally before publishing:

        ```bash
        npx @changesets/cli version
        ```

    - Commit the resulting changes (package.json updates and generated changelog files):

        ```bash
        git add .
        git commit -m "chore(release): version packages and changelogs"
        ```

3. Publish
    - Option A — Let the repository automation handle publishing (recommended):
        - Push your branch to GitHub and open a PR. The CI / release automation will run and, depending on the configuration and merged changesets, will publish releases when merged to `main`.
    - Option B — Publish locally (requires NPM credentials and appropriate tokens):

        ```bash
        npm run release
        ```

        This script typically runs your tokenized publish flow (it may run builds and then `changeset publish`).

#### How the automation works (GitHub Actions)

- There's a CI workflow configured to automate release and publish:
    - The workflow runs on pushes to `main` and uses the Changesets GitHub Action.
    - The action can either create a release PR or publish directly to NPM depending on repository and action settings.
    - The workflow uses repository secrets:
        - `GITHUB_TOKEN` — standard workflow permission for the action to create PRs/commits.
    - The action is configured to run the project’s release script (for example `npm run release`) and is run in a controlled environment; it will also disable Husky hooks during automated runs (HUSKY=0) to avoid local commit hooks blocking automation.

#### Notes, tips, and troubleshooting

- Ensure your changeset accurately reflects the semantic change (patch/minor/major). Changesets drives the version bump and changelog generation.
- Pre-release flows:
    - The repository includes a `.changeset/pre.json` configuration that sets a default pre-release tag (e.g., `alpha`) and initial versions for pre-release packages. Use `npx @changesets/cli pre enter  <tag>` to begin a pre-release cycle.
    - When in pre mode, version bumps will produce pre-release identifiers (for example, `1.0.0-alpha.1`).
- CI vs local publish:
    - For most contributors, pushing a properly authored changeset and opening a PR is the recommended route—automation will create the release or open the release PR for maintainers to review.
    - If you must publish locally, make sure `NPM_TOKEN` is configured in your environment or use a CI/protected account to run the publish steps.
- If releases aren't being published as expected:
    - Verify `NPM_TOKEN` exists in repository secrets and has publish scope.
    - Ensure the commit/push to `main` contains a changeset (or the automation has been triggered by the Changesets action).
    - Review the release workflow logs in GitHub Actions for details (it'll show the changesets step and any publishing errors).
- If you want to change the default pre-release tag (for example, from `alpha` to `beta`), update the `.changeset/pre.json` file and follow the pre-mode steps above.

Example quick flow (pre-release -> publish via automation)

1. On a feature branch, implement changes.
2. Enter pre mode if you want pre-release tagging:
    - `npx @changesets/cli pre enter --tag alpha`
3. Run `npx @changesets/cli` and follow the prompts (choose the appropriate release type).
4. Commit the changeset file(s), push the branch, and open a PR.
5. Once the PR is merged to `main`, the repository release workflow will pick up the changeset and publish the pre-release to NPM (provided `NPM_TOKEN` and workflow permissions are set).

If you have questions about changing the pre-release tag or the release automation behavior, or if you want a walkthrough of creating a test release in a fork, please open an issue or ask in the PR review comments.

## Component Versions

| Component        | Status |
| ---------------- | ------ |
| `ogds-banner`    | Beta   |
| `ogds-accordion` | Alpha  |
