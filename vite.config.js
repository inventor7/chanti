import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
//i'm delpoying to cpanel at the doamin chanti-dz.com

export default defineConfig({
  // include all the assets
  build: {
    assetsInclude: ["assets/**/*"],
  },
  base: "/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  publicDir: "public",
});
