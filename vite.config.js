import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/test-site/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        heroCards: resolve(import.meta.dirname, 'hero-cards/index.html'),
        heroCardsSaved: resolve(import.meta.dirname, 'hero-cards-saved/index.html'),
        enterpriseHero: resolve(import.meta.dirname, 'enterprise-hero/index.html'),
        enterpriseHeroFunnel: resolve(import.meta.dirname, 'enterprise-hero-funnel/index.html'),
        cursorGrid: resolve(import.meta.dirname, 'cursor-grid/index.html'),
        interactiveWeb: resolve(import.meta.dirname, 'interactive-web/index.html'),
        certification: resolve(import.meta.dirname, 'certification/index.html'),
        contacts: resolve(import.meta.dirname, 'contacts/index.html'),
      },
    },
  },
})
