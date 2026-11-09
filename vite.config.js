import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    // three.js (~130 kB gzip) is a lazy chunk loaded after first paint.
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Keep Three.js in its own chunk: it is only loaded when the hero
        // effect actually runs (WebGL available, motion allowed).
        manualChunks(id) {
          if (id.includes('node_modules/three')) return 'three';
        },
      },
    },
  },
});
