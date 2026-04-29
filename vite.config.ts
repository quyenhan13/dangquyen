import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true,
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost',
        changeOrigin: true,
        rewrite: (path) => `/vteen/vteen-backup${path}`,
      },
      '/player': {
        target: 'http://localhost',
        changeOrigin: true,
        rewrite: (path) => `/vteen/vteen-backup${path}`,
      },
      '/embed.php': {
        target: 'http://localhost',
        changeOrigin: true,
        rewrite: (path) => `/vteen/vteen-backup${path}`,
      },
      '/uploads': {
        target: 'http://localhost',
        changeOrigin: true,
        rewrite: (path) => `/vteen/vteen-backup${path}`,
      }
    }
  }
})
