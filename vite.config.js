import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/bar-catch-of-the-day/', // для GitHub Pages: username.github.io/bar-catch-of-the-day/
  plugins: [vue()],
  server: {
    host: true, // доступ по локальной сети (телефон, планшет в той же Wi-Fi)
    port: 5173,
  },
})
