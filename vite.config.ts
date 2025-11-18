import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,wav,wasm}']
      },
      manifest: {
        name: 'Chaturanga',
        short_name: 'Chaturanga',
        description: 'The Ancient Game of Chess',
        theme_color: '#1e293b',
        background_color: '#0f172a',
        icons: [
            {
                src: 'favicon.png',
                sizes: '64x64',
                type: 'image/png'
            },
            {
                src: 'favicon.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                src: 'favicon.png',
                sizes: '512x512',
                type: 'image/png'
            }
        ]
      }
    })
  ],
})
