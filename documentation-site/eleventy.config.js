import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { HtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(HtmlBasePlugin);

  let mdLib;

  eleventyConfig.amendLibrary("md", (lib) => {
    mdLib = lib;

    mdLib.set({ html: true, typographer: true });

    mdLib.renderer.rules.bullet_list_open = () => `<ul class="usa-list">`;

    mdLib.renderer.rules.link_open = (tokens, idx, options, env, self) => {
      const token = tokens[idx];
      const href = token.attrGet("href");

      // in Eleventy we use relative links for local site links
      // and we use http links for external sites
      // but if this changes, we'll need another way to determine which links are external
      if (href.includes("http")) {
        token.attrSet("target", "_blank");
        token.attrSet("rel", "noreferrer");
        token.attrSet("class", "usa-link modern-external-link");
      } else {
        token.attrSet("class", "usa-link");
      }
      return self.renderToken(tokens, idx, options);
    };
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

  eleventyConfig.addCollection("alphabeticalSort", function (collectionsApi) {
    return collectionsApi.getAll().sort(function (a, b) {
      return a.data.title.localeCompare(b.data.title);
    });
  });
}
