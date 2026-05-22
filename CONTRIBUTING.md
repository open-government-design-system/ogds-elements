# How to Contribute to OGDS Elements

## Project setup for contributors

It is helpful to have [nvm installed](https://github.com/nvm-sh/nvm) and use the correct version of Node.js. From the project root, run the following command:

```bash
npm install
```

### Installing Playwright (for E2E testing)

If you plan to run or write end-to-end tests, please see the [Playwright documentation](https://playwright.dev/docs/intro) for installation instructions and the [README.md file in the `e2e` directory](https://github.com/open-government-design-system/ogds-elements/tree/develop/e2e).

### Pre-commit Hooks

This project uses [Husky](https://typicode.github.io/husky/) for Git hooks. Hooks are automatically set up when you run `npm install` via the `prepare` script.

## Development Workflow

The development workflow uses [Storybook](https://storybook.js.org/) and [custom elements manifest](https://github.com/webcomponents/custom-elements-manifest) to generate a custom elements manifest and watch for changes to the custom elements manifest. Storybook handles documentation of component usage, styling, and properties.

### Running StorybookJS

Start the development server with Storybook and custom elements manifest watch process:

```bash
npm run start
```

This runs Storybook on port 8008 at `http://localhost:8008`.

---

### Creating stories

Stories should document the following component features:

- Variants (e.g. default, primary, secondary, etc.)
- Properties
- CSS Custom Properties

### Story File Structure

Stories and functional tests should be created alongside components:

```
src/components/usa-example/
  ├── docs.mdx
  ├── index.ts
  ├── usa-example.css
  ├── usa-example.spec.ts
  └── usa-example.stories.ts
```

## Project Structure

- **`src/components/`** - Web Component implementations
- **`src/core/`** - Core utilities and base classes
- **`src/shared/`** - Static asset files like fonts and icons
- **`e2e/`** - Playwright end-to-end tests
- **`storybook/`** - Storybook documentation files
- **`.storybook/`** - Storybook configuration
- **`tokens/`** - Design token definitions (Style Dictionary)
- **`internals/`** - Internal build scripts and utilities
- **`config/`** - Config files for project tooling and testing

## Component Development Checklist

When creating a new component:

- Create component files in `src/components/[component-name]/`
- Add JSDoc comments to component files documenting the component's API
- Write component implementation (TypeScript + Lit)
- Create component styles in an external CSS file and import it into the component
- Export component from `index.ts`
- Add component to for package exports `src/components/index.js`
- Create Storybook stories documenting all variants and props
- Write unit tests with Vitest
- Write E2E tests with Playwright (including visual regression tests)
- Build the custom elements manifest to keep it synced with JSDoc comments
- Test accessibility with Storybook's a11y addon

---

## Publishing and Releases

The package is published as `@ogds/elements` on npm. The current version can be found in `package.json`

Component maturity levels:

- **Experimental**: Experimental, API may change significantly
- **Alpha**: Core functionality stable, refinements expected
- **Beta**: Feature complete, undergoing final testing
- **Stable**: Production ready

Check the README for current component status.

## Additional Resources

- [USWDS Design System](https://designsystem.digital.gov)
- [Web Components MDN Guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
- [Lit Documentation](https://lit.dev)
- [Storybook Documentation](https://storybook.js.org)
- [Playwright Documentation](https://playwright.dev)
- [E2E Testing Guide](https://github.com/open-government-design-system/ogds-elements/tree/develop/e2e) (detailed testing documentation)

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
