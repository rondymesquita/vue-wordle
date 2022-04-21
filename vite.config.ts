import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import Terminal from "vite-plugin-terminal";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vanillaExtractPlugin(),
    vue(),
    Components({
      /* options */
    }),
    Terminal({
      // console: "terminal",
      output: ["terminal", "console"],
    }),
  ],
});
