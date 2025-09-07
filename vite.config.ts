import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    // Carga las variables de entorno desde la raíz del proyecto (donde está .env.local)
    const env = loadEnv(mode, process.cwd(), '');

    return {
      define: {
        // Esta es la corrección clave:
        // Reemplazamos 'import.meta.env.VITE_GEMINI_API_KEY' en todo el código
        // con el valor real de la variable que cargamos del archivo .env.local.
        'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});