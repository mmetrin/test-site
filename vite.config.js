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
        dcp: resolve(import.meta.dirname, 'dcp/index.html'),
        aiAssistant: resolve(import.meta.dirname, 'ai-assistant/index.html'),
        premiumVideo: resolve(import.meta.dirname, 'premium-video/index.html'),
        tintLab: resolve(import.meta.dirname, 'effect-test/index.html'),
        beamLab: resolve(import.meta.dirname, 'beam-lab/index.html'),
      },
    },
  },
})
