import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Имя репозитория на GitHub: MakeAsplashKira/practika
// base обязателен для корректной работы на GitHub Pages.
export default defineConfig({
  plugins: [vue()],
  base: '/practika/',
})
