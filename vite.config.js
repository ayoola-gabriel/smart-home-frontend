import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { Socket } from 'socket.io'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType:'autoUpdate',
      includeAssets:['favicon.ico','robots.txt','apple-touch-icon.png'],
      manifest:{
        name:'SmartHome DB',
        short_name:'SmartHome',
        description:'Control your devices',
        theme_color:'#0d6efd',
        background_color:'#ffffff',
        display:'standalone',
        scope: '/',
        start_url:'/',
        icons:[
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ]
      }
    })
  ],
  server: {
    port:3000,
    host:true,
  },
  build:{
    rollupOptions: {
      output:{
        manualChunks:{
          react:['react', 'react-dom'],
          socketio:['socket.io-client'],
          charts:['recharts'],
        },
      },
    },
  },
});
