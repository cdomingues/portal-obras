import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Permite acesso externo
    port: 5173   // Define a porta para 5173
  },
  preview: {
    host: true,  // Permite acesso externo no modo preview
    port: 5173   // Define a porta para 5173 no preview
  }
})
