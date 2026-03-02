import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/party-menu/', // для GitHub Pages: твой сайт будет на username.github.io/party-menu
  plugins: [vue()],
  server: {
    host: true, // доступ по локальной сети (телефон, планшет в той же Wi-Fi)
    port: 5173,
  },
})
