import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: resolve(import.meta.dirname),
  build: {
    lib: {
      entry: resolve(import.meta.dirname, "src/elements.js"),
      name: "OgdsElements",
      formats: ["es"],
      fileName: () => "elements.js",
    },
    outDir: "assets/js",
    emptyOutDir: false,
    rollupOptions: {
      output: {
        codeSplitting: false,
      },
    },
  },
  test: {
    include: ["tests/**/*.{test,spec}.{js,ts,mjs,cjs}"],
  },
});
