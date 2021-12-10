import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // with options
      "/bd": {
        target: "https://www.bidianer.com/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/bd/, ""),
      },
    },
  },
});
