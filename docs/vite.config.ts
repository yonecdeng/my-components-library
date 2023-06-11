import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  Plugins: {
    vue: vue()
  },
  resolve: {
    alias: {
      '@components-library': `${path.resolve(
        __dirname,
        '../packages/components/src'
      )}`,
      '@hooks': `${path.resolve(__dirname, '../packages/hooks')}`
    }
  }
});
