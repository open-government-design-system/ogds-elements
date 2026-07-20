/** @type { import('@storybook/web-components-vite').StorybookConfig } */
import remarkGfm from "remark-gfm";

const config = {
  stories: [
    "../storybook/**/*.mdx",
    "../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    "@storybook/addon-a11y",
    "storybook-addon-tag-badges",
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  core: {
    builder: {
      name: "@storybook/builder-vite",
      options: {
        viteConfigPath: "./config/vite.config.ts",
      },
    },
  },
  viteFinal: async (config) => {
    /**
     * Unload the `vite-plugin-bundlesize` plugin.
     * This plugin is only used in the CI pipeline for output size of the
     * individual components.
     */
    config.plugins = config.plugins.filter(
      (plugin) => plugin.name !== "vite-plugin-bundlesize",
    );

    return config;
  },
};
export default config;
