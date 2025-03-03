import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#1DA57A', // Màu chủ đạo lung linh
        },
      },
    },
  },

  // đỏi post: 3000
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8090', // Địa chỉ backend của bạn
        changeOrigin: true, // Thay đổi origin để tránh lỗi CORS
        rewrite: (path) => path.replace(/^\/api/, ''), // Loại bỏ /api trong URL
      },
    },
  }
})
