
import { defineConfig } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    vue({
      refTransform: true,
    }),
    vueJsx(),
  ],
  resolve: {
    alias: {
      "@xinxin-ui": resolve(__dirname, "packages"),
    },
  },
});
