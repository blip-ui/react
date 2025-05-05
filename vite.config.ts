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
        assetFileNames: (assetInfo) => {
          // if (assetInfo?.name === 'style.css') {
          //   return 'index.css';
          // }
          if (assetInfo?.names?.find((x) => x.endsWith('.ttf'))) {
            console.log('wow');
            return 'assets/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
});