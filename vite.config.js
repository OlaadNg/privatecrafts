import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  appType: 'spa',
  server: {
    port: 3000,
    open: false
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild'
  }
});
