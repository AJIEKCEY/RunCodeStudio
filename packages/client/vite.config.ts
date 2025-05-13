import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { VitePWA } from 'vite-plugin-pwa'
dotenv.config()
import path from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'

// Переменные окружения для API
const API_HOST = process.env.VITE_API_HOST || 'localhost'
const API_SERVER_PORT = process.env.VITE_API_SERVER_PORT || process.env.SERVER_PORT || 3005
const API_VERSION = process.env.VITE_API_VERSION || 'v1'
const API_PATH = process.env.VITE_API_PATH || 'api'
const API_URL = process.env.VITE_API_URL || `http://${API_HOST}:${API_SERVER_PORT}`

export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_SERVER_PORT) || 3002,
    host: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@config': path.resolve(__dirname, './src/config'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@services': path.resolve(__dirname, './src/services'),
      '@types': path.resolve(__dirname, './src/types'),
      '@context': path.resolve(__dirname, './src/context'),
    }
  },
  define: {
    __SERVER_PORT__: process.env.CLIENT_SERVER_PORT,
    'import.meta.env.VITE_API_HOST': JSON.stringify(API_HOST),
    'import.meta.env.VITE_API_SERVER_PORT': JSON.stringify(API_SERVER_PORT),
    'import.meta.env.VITE_API_VERSION': JSON.stringify(API_VERSION),
    'import.meta.env.VITE_API_PATH': JSON.stringify(API_PATH),
    'import.meta.env.VITE_API_URL': JSON.stringify(API_URL),
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
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          API_URL,
          API_VERSION,
          API_HOST,
          API_PORT: API_SERVER_PORT,
          API_PATH,
        },
      },
    }),
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
