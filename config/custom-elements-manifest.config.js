import { customElementReactWrapperPlugin } from "custom-element-react-wrappers";

export default {
  plugins: [
    customElementReactWrapperPlugin({
      outdir: './dist/components/frameworks/react',
      modulePath: (_, tagName) =>
        `../../${tagName}.js`,
    }),
  ],
  globs: ["./src/components/**/*.{js,ts}"],
  exclude: [
    "./src/components/**/*.spec.{js,ts}",
    "./src/components/**/*.stories.{js,ts}",
  ],
  litelement: true,
};
