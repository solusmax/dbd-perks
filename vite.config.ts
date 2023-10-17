import react from '@vitejs/plugin-react-swc';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import path from 'path';
import UnpluginInjectPreload from 'unplugin-inject-preload/vite';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    ViteImageOptimizer(),
    UnpluginInjectPreload({
      files: [
        {
          entryMatch: /\.(png|jpg|jpeg|webp|gif|svg)$/i,
        },
      ],
    }),
  ],
  build: {
    target: browserslistToEsbuild(),
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";
           @import "@/styles/mixins.scss";
        `,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
