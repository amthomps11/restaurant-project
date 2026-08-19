import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    process: JSON.stringify({
      env: {
        NODE_ENV: "production",
      },
    }),
  },

  build: {
    lib: {
      entry: resolve(__dirname, "src/sdk.tsx"),
      name: "MenuSDK",
      formats: ["iife"],
      fileName: () => "menu-sdk.js",
    },
  },
});
