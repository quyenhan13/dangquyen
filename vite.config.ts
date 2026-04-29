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
        target: 'https://vteen.io.vn',
        changeOrigin: true,
      },
      '/player': {
        target: 'https://vteen.io.vn',
        changeOrigin: true,
      },
      '/embed.php': {
        target: 'https://vteen.io.vn',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'https://vteen.io.vn',
        changeOrigin: true,
      }
    }
  }
})
