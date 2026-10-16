import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  let mdLib;

  eleventyConfig.amendLibrary("md", (lib) => {
    mdLib = lib;

    mdLib.set({ html: true, typographer: true });

    mdLib.renderer.rules.bullet_list_open = () => `<ul class="usa-list">`;
  });

  eleventyConfig.addFilter("asMarkdown", (content, renderInline = false) => {
    if (!mdLib) {
      throw new Error("mdLib is undefined");
    }
    return renderInline ? mdLib.renderInline(content) : mdLib.render(content);
  });

  // Copy the contents of the `assets` folder to the output folder
  // For example, `./public/css/` ends up in `_site/css/`
  eleventyConfig.addPassthroughCopy({
    "./node_modules/@uswds/uswds/dist/": "/assets/",
    "./node_modules/@ogds/tokens/build/css/": "/assets/css/",
    "./assets/": "/assets/",
  });
}
