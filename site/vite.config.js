
import { defineConfig } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      refTransform: true,
    }),
    vueJsx(),
  ],
  server: {
    host: "0.0.0.0"
  },
});
