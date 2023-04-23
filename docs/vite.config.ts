import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@components-library': `${path.resolve(
        __dirname,
        '../packages/components/src'
      )}`
    }
  }
});
