import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
  resolve: {
  
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router",
      "@trpc/client",
      "zustand",
      "react-toastify",
      "lodash",
      "react-markdown",
    ],
  },
  build: {
    outDir: "build",
    rollupOptions: {
      input: "index.html",
    },
  },
});
