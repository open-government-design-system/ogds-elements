/**
 * Custom elements for component docs generation.
 */
import { setCustomElementsManifest } from "@storybook/web-components-vite";
import { setStorybookHelpersConfig } from "@wc-toolkit/storybook-helpers";
import customElements from "../custom-elements.json";
import OgdsTheme from "./OgdsTheme";
import "../storybook/index.css";
import "../src/core/index.css";

setCustomElementsManifest(customElements);
setStorybookHelpersConfig({
  hideArgRef: true,
});

/** @type { import('@storybook/web-components-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    docs: {
      toc: true, // Autogenerate table of contents.
      theme: OgdsTheme,
      codePanel: true,
      canvas: {
        sourceState: "shown",
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  tags: ["autodocs"],
};

export default preview;
