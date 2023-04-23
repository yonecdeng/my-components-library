import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      vue: `${path.resolve(__dirname, 'node_modules/vue')}`,
      'vue-router': `${path.resolve(__dirname, 'node_modules/vue-router')}`,
      '@': `${path.resolve(__dirname, 'src')}`,
      '@components-library': `${path.resolve(
        __dirname,
        '../packages/components/src'
      )}`
    }
  },
  server: {
    port: 3000
  }
});
