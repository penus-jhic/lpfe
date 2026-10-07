import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // process.env tidak otomatis berisi isi file .env, jadi tujuan proxy dibaca lewat loadEnv
  const env = loadEnv(mode, process.cwd(), '')
  const backend = env.VITE_BACKEND_URL || 'http://127.0.0.1:8000'
  const userService = env.VITE_USER_API_URL || 'http://127.0.0.1:3002'

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      proxy: {
        // Login & verifikasi token admin ditangani microservice user, harus di atas '/api'
        '/api/user': { target: userService, changeOrigin: true },
        '/api': { target: backend, changeOrigin: true },
        // Foto unggahan (URL relatif /storage/... dari backend)
        '/storage': { target: backend, changeOrigin: true },
      },
    },
  }
})
