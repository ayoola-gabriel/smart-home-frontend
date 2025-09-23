import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { Socket } from 'socket.io'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port:3000,
    host:true,
  },
  plugin: [
  ],
  // build:{
  //   rollupOptions: {
  //     output:{
  //       manualChunks:{
  //         react:['react', 'react-dom'],
  //         socketio:['socket.io-client'],
  //         charts:['recharts'],
  //       },
  //     },
  //   },
  // },
});
