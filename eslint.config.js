// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import css from "@eslint/css";
import eslintConfigPrettierRecommended from "eslint-config-prettier";
import vitest from "@vitest/eslint-plugin";

export default [
  {
    ignores: [
      "storybook-static/**",
      "examples/**",

      // FIXME: configure ESLint for TypeScript too
      "**/*.ts",

      // FIXME: stop ignoring this file when the @eslint/css parser can handle it
      "src/components/ogds-accordion/ogds-accordion.css",
    ],
  },
  {
    ...js.configs.recommended,
    ...eslintConfigPrettierRecommended,
    files: ["src/**/*.js"],
    rules: {},
  },
  {
    files: ["src/**/*.spec.js"],
    plugins: { vitest },
    rules: { ...vitest.configs.recommended.rules },
  },
  {
    files: ["core/**/*.css", "src/**/*.css"],
    plugins: { css },
    language: "css/css",
    rules: {
      ...css.configs.recommended.rules,
      "css/use-baseline": ["warn", { available: "widely" }],
      "css/no-invalid-properties": ["error", { allowUnknownVariables: true }],
    },
  },
  ...storybook.configs["flat/recommended"],
];
