// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.js";
import path from "path";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig({
  plugins: [
    react({
      jsxImportSource: "react"
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "@components": path.resolve(__vite_injected_original_dirname, "./src/components"),
      "@utils": path.resolve(__vite_injected_original_dirname, "./src/components/utils"),
      "@styles": path.resolve(__vite_injected_original_dirname, "./src/components/styles"),
      "@context": path.resolve(__vite_injected_original_dirname, "./src/context"),
      "@types": path.resolve(__vite_injected_original_dirname, "./src/types"),
      "@data": path.resolve(__vite_injected_original_dirname, "./src/data")
    }
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
        }
      }
    },
    chunkSizeWarningLimit: 600
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false
  },
  preview: {
    port: 5173
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KHtcbiAgICAgIGpzeEltcG9ydFNvdXJjZTogXCJyZWFjdFwiLFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgICAgXCJAY29tcG9uZW50c1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL2NvbXBvbmVudHNcIiksXG4gICAgICBcIkB1dGlsc1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL2NvbXBvbmVudHMvdXRpbHNcIiksXG4gICAgICBcIkBzdHlsZXNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9jb21wb25lbnRzL3N0eWxlc1wiKSxcbiAgICAgIFwiQGNvbnRleHRcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9jb250ZXh0XCIpLFxuICAgICAgXCJAdHlwZXNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy90eXBlc1wiKSxcbiAgICAgIFwiQGRhdGFcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9kYXRhXCIpLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiBcImRpc3RcIixcbiAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICAgIG1pbmlmeTogXCJlc2J1aWxkXCIsXG4gICAgdGFyZ2V0OiBcImVzMjAyMFwiLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IChpZCkgPT4ge1xuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIm5vZGVfbW9kdWxlc1wiKSkge1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwidGhyZWVcIikgJiYgIWlkLmluY2x1ZGVzKFwiQHJlYWN0LXRocmVlXCIpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBcInRocmVlLWNvcmVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIkByZWFjdC10aHJlZS9maWJlclwiKSB8fCBpZC5pbmNsdWRlcyhcIkByZWFjdC10aHJlZS9kcmVpXCIpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBcInIzZlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiQHJlYWN0LXRocmVlL3JhcGllclwiKSkge1xuICAgICAgICAgICAgICByZXR1cm4gXCJyYXBpZXItcGh5c2ljc1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiQHJlYWN0LXRocmVlL3Bvc3Rwcm9jZXNzaW5nXCIpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBcInBvc3Rwcm9jZXNzaW5nXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJnc2FwXCIpIHx8IGlkLmluY2x1ZGVzKFwiQGdzYXBcIikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFwiZ3NhcFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwicmVhY3RcIikgJiYgIWlkLmluY2x1ZGVzKFwicmVhY3QtZG9tXCIpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBcInJlYWN0LXZlbmRvclwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwicmVhY3QtZG9tXCIpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBcInJlYWN0LWRvbVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwicmVhY3QtaWNvbnNcIikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFwicmVhY3QtaWNvbnNcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcInJlYWN0LWZhc3QtbWFycXVlZVwiKSkge1xuICAgICAgICAgICAgICByZXR1cm4gXCJtYXJxdWVlXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogNjAwLFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiB0cnVlLFxuICAgIHBvcnQ6IDUxNzMsXG4gICAgc3RyaWN0UG9ydDogZmFsc2UsXG4gIH0sXG4gIHByZXZpZXc6IHtcbiAgICBwb3J0OiA1MTczLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFGakIsSUFBTSxtQ0FBbUM7QUFJekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLE1BQ0osaUJBQWlCO0FBQUEsSUFDbkIsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUNwQyxlQUFlLEtBQUssUUFBUSxrQ0FBVyxrQkFBa0I7QUFBQSxNQUN6RCxVQUFVLEtBQUssUUFBUSxrQ0FBVyx3QkFBd0I7QUFBQSxNQUMxRCxXQUFXLEtBQUssUUFBUSxrQ0FBVyx5QkFBeUI7QUFBQSxNQUM1RCxZQUFZLEtBQUssUUFBUSxrQ0FBVyxlQUFlO0FBQUEsTUFDbkQsVUFBVSxLQUFLLFFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQy9DLFNBQVMsS0FBSyxRQUFRLGtDQUFXLFlBQVk7QUFBQSxJQUMvQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWMsQ0FBQyxPQUFPO0FBQ3BCLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixnQkFBSSxHQUFHLFNBQVMsT0FBTyxLQUFLLENBQUMsR0FBRyxTQUFTLGNBQWMsR0FBRztBQUN4RCxxQkFBTztBQUFBLFlBQ1Q7QUFDQSxnQkFBSSxHQUFHLFNBQVMsb0JBQW9CLEtBQUssR0FBRyxTQUFTLG1CQUFtQixHQUFHO0FBQ3pFLHFCQUFPO0FBQUEsWUFDVDtBQUNBLGdCQUFJLEdBQUcsU0FBUyxxQkFBcUIsR0FBRztBQUN0QyxxQkFBTztBQUFBLFlBQ1Q7QUFDQSxnQkFBSSxHQUFHLFNBQVMsNkJBQTZCLEdBQUc7QUFDOUMscUJBQU87QUFBQSxZQUNUO0FBQ0EsZ0JBQUksR0FBRyxTQUFTLE1BQU0sS0FBSyxHQUFHLFNBQVMsT0FBTyxHQUFHO0FBQy9DLHFCQUFPO0FBQUEsWUFDVDtBQUNBLGdCQUFJLEdBQUcsU0FBUyxPQUFPLEtBQUssQ0FBQyxHQUFHLFNBQVMsV0FBVyxHQUFHO0FBQ3JELHFCQUFPO0FBQUEsWUFDVDtBQUNBLGdCQUFJLEdBQUcsU0FBUyxXQUFXLEdBQUc7QUFDNUIscUJBQU87QUFBQSxZQUNUO0FBQ0EsZ0JBQUksR0FBRyxTQUFTLGFBQWEsR0FBRztBQUM5QixxQkFBTztBQUFBLFlBQ1Q7QUFDQSxnQkFBSSxHQUFHLFNBQVMsb0JBQW9CLEdBQUc7QUFDckMscUJBQU87QUFBQSxZQUNUO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsdUJBQXVCO0FBQUEsRUFDekI7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxFQUNkO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
