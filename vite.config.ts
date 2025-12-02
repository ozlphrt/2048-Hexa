import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['192.png', '512.png'],
      manifest: {
        name: 'Hex 2048',
        short_name: 'Hex 2048',
        description: 'A hexagonal 2048 puzzle game',
        theme_color: '#9a8a76',
        background_color: '#9a8a76',
        display: 'standalone',
        icons: [
          {
            src: '/2048-Hexa/192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/2048-Hexa/512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
  base: '/2048-Hexa/',
})

