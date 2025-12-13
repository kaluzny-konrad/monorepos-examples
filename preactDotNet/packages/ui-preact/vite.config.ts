import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
    lib: {
      entry: {
        server: "src/server/render.ts",
        client: "src/client/hydrate.tsx",
      },
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: ["preact", "preact-render-to-string"],
    },
  },
});
