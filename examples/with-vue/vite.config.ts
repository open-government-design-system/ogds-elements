// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Treat all tags starting with 'ogds-' as custom elements
          isCustomElement: (tag) => tag.startsWith("ogds-"),
        },
      },
    }),
  ],
});
