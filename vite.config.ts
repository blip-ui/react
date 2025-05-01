import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

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
      name: 'Blip',
      formats: [ 'es', 'umd' ],
      fileName: (format) => `blip.${ format }.js`,
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
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'ajv': path.resolve(__dirname, 'node_modules/ajv/dist/ajv.js')
    }
  }
});