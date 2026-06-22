import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "react",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@utils": path.resolve(__dirname, "./src/components/utils"),
      "@styles": path.resolve(__dirname, "./src/components/styles"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@data": path.resolve(__dirname, "./src/data"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "esbuild",
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("three") && !id.includes("@react-three")) {
              return "three-core";
            }
            if (id.includes("@react-three/fiber") || id.includes("@react-three/drei")) {
              return "r3f";
            }
            if (id.includes("@react-three/rapier")) {
              return "rapier-physics";
            }
            if (id.includes("@react-three/postprocessing")) {
              return "postprocessing";
            }
            if (id.includes("gsap") || id.includes("@gsap")) {
              return "gsap";
            }
            if (id.includes("react") && !id.includes("react-dom")) {
              return "react-vendor";
            }
            if (id.includes("react-dom")) {
              return "react-dom";
            }
            if (id.includes("react-icons")) {
              return "react-icons";
            }
            if (id.includes("react-fast-marquee")) {
              return "marquee";
            }
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false,
  },
  preview: {
    port: 5173,
  },
});
