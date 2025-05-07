import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';
import { defineConfig } from 'vite';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { glob } from 'glob';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      include: [ 'lib' ],
      insertTypesEntry: true,
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.ts'),
      formats: [ 'es' ],
    },
    rollupOptions: {
      external: [ 'react', 'react/jsx-runtime' ],
      input: Object.fromEntries(
        // https://rollupjs.org/configuration-options/#input
        glob.sync('lib/**/*.{ts,tsx}', {
          ignore: [ 'lib/**/*.d.ts' ],
        }).map(file => [
          // 1. The name of the entry point
          // lib/nested/foo.js becomes nested/foo
          path.relative(
            'lib',
            file.slice(0, file.length - path.extname(file).length)
          ),
          // 2. The absolute path to the entry file
          // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
          fileURLToPath(new URL(file, import.meta.url))
        ])
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, './lib'),
      '@src': path.resolve(__dirname, './src'),
      '@dist': path.resolve(__dirname, './dist')
    }
  },
});