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
    port: 3000,
    proxy: {
      // Đổi tất cả về localhost để bạn thấy phim trong máy mình
      '/api': {
        target: 'http://localhost',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => `/vteen/vteen-backup${path}`,
      },
      '/embed.php': {
        target: 'http://localhost',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => `/vteen/vteen-backup${path}`,
      },
      '/uploads': {
        target: 'http://localhost',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => `/vteen/vteen-backup${path}`,
      }
    }
  }
})
