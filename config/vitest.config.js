import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import buildConfig from "./vite.config.ts";

export default defineConfig({
  esbuild: buildConfig.esbuild,
  test: {
    // Root project has no tests
    //
    // Actual tests live in projects defined below
    include: [],
    projects: [
      // Unit test suite: component and utility specs run in jsdom.
      {
        extends: true,
        test: {
          name: "unit",
          environment: "jsdom",
          include: [
            "src/**/*.spec.{js,ts}",
            "src/**/*.test.{js,ts}",
            "internals/**/*.spec.{js,ts}",
            "internals/**/*.test.{js,ts}",
          ],
        },
      },

      // Storybook test suite: every story runs as a test in a real browser,
      // with interaction tests and a11y checks folded in.
      {
        extends: true,
        plugins: [
          ...buildConfig.plugins,
          storybookTest({
            configDir: ".storybook",
            storybookScript: "npm run storybook -- --no-open",
            storybookUrl: "http://localhost:8008",
          }),
        ],
        resolve: buildConfig.resolve,
        css: buildConfig.css,
        test: {
          name: "storybook",
          // use playwright to drive the browser
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
