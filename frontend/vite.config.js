import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Panel/Takvim/Geçmiş/Profil kodları '@renderer/...' ile import
      // yapıyor (Sude'nin masaüstü prototipinde kullanılan takma ad,
      // aynı isimle korundu ki import satırları hiç değişmesin).
      '@renderer': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
