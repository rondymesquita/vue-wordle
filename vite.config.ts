import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import Terminal from 'vite-plugin-terminal';

let base;

if (process.env.NODE_ENV === 'production') {
  base = '/';
} else {
  base = '/';
}

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [
    vanillaExtractPlugin(),
    vue(),
    Components({
      /* options */
    }),
    Terminal({
      // console: "terminal",
      output: ['terminal', 'console'],
    }),
  ],
});
