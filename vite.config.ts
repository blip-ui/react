import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import fs from 'fs';

const distLibExists = fs.existsSync(path.resolve(__dirname, './dist/lib'));

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: [ 'src/lib' ],
      insertTypesEntry: true,
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      name: 'blip-lib',
      formats: [ 'es', 'umd' ],
      fileName: (format) => `index.${ format }.js`,
    },
    rollupOptions: {
      external: [ 'react', 'react-dom' ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    outDir: 'dist/lib'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@dist': path.resolve(__dirname, './dist/lib')
    }
  }
});