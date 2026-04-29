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
      // Phim lấy từ máy tính (Local)
      '/api/movies.php': {
        target: 'http://localhost',
        changeOrigin: true,
        rewrite: (path) => `/vteen/vteen-backup${path}`,
      },
      '/api/movie_detail.php': {
        target: 'http://localhost',
        changeOrigin: true,
        rewrite: (path) => `/vteen/vteen-backup${path}`,
      },
      // Hub và Upload lấy từ Server thật (vteen.io.vn) thông qua Proxy máy tính
      '/api/hub_data.php': {
        target: 'https://vteen.io.vn',
        changeOrigin: true,
      },
      '/api/upload.php': {
        target: 'https://vteen.io.vn',
        changeOrigin: true,
      },
      // Các thành phần khác trỏ về Local
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
