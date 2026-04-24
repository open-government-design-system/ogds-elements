import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        experimentalDecorators: true,
        useDefineForClassFields: false,
      },
    },
  },
  test: {
    environment: "jsdom",
    include: [
      "src/**/*.spec.{js,ts}",
      "src/**/*.test.{js,ts}",
      "internals/**/*.spec.{js,ts}",
      "internals/**/*.test.{js,ts}",
    ],
  },
});
