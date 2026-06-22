import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
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
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-three": ["three", "@react-three/fiber", "@react-three/drei"],
          "vendor-gsap": ["gsap", "@gsap/react"],
        },
      },
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false,
  },
  preview: {
    port: 5173,
  },
  optimizeDeps: {
    exclude: ["node_modules"],
  },
});
