import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { VitePWA } from 'vite-plugin-pwa'
dotenv.config()
import path from 'path'

export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_SERVER_PORT) || 3002,
    host: true,
  },
  define: {
    __SERVER_PORT__: process.env.CLIENT_SERVER_PORT,
  },
  build: {
    outDir: path.join(__dirname, 'dist/client'),
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  ssr: {
    format: 'cjs',
  },
  plugins: [
    react(),
    VitePWA({
      srcDir: 'src',
      filename: 'sw.ts',
      strategies: 'injectManifest',
      injectRegister: 'auto',
      manifest: false,
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,ttf}'],
      },
      injectManifest: {
        injectionPoint: null,
      },
    }),
  ],
})
