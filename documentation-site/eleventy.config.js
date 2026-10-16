export default function (eleventyConfig) {
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
}
