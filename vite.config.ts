import path from 'path';
import { defineConfig } from 'vite';

// Vite gestionará automáticamente las variables de entorno VITE_*
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});