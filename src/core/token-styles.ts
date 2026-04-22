import colorTokens from "@ogds/tokens/styles/css/colors.css";
import spacingTokens from "@ogds/tokens/styles/css/spacing.css";
import typographyTokens from "@ogds/tokens/styles/css/typography.css";
import themeColorTokens from "@ogds/tokens/styles/css/theme-color.css";
import themeSpacingTokens from "@ogds/tokens/styles/css/theme-spacing.css";
import themeTypographyTokens from "@ogds/tokens/styles/css/theme-typography.css";

const sheet = new CSSStyleSheet();
sheet.replaceSync(
  [
    colorTokens,
    spacingTokens,
    typographyTokens,
    themeColorTokens,
    themeSpacingTokens,
    themeTypographyTokens,
  ]
    .map((s) => s.cssText)
    .join("\n"),
);

export function adoptTokenStyles() {
  if (!document.adoptedStyleSheets.includes(sheet)) {
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
  }
}
