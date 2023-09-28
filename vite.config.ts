import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    ViteImageOptimizer(),
  ],
  build: {
    target: browserslistToEsbuild(),
  },
})
