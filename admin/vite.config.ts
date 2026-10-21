import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/uploads': { target: 'https://13-204-230-95.sslip.io', changeOrigin: true }
    }
  },
  preview: {
    allowedHosts: ['mahaprisons-admin-panel.onrender.com']
  }
})