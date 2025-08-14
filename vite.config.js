import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,                // Opens browser after build
      gzipSize: true,            // Shows GZIP size
      brotliSize: true,          // Shows Brotli size
      filename: 'bundle-report.html' // File created in project root
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],       // Separate React core
          antd: ['antd'],                      // Separate Ant Design (if used)
          vendor: ['axios', 'lodash']          // Separate common vendor libraries
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Optional: increase warning threshold (in kB)
  },

 

});
