import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { sitemapPlugin } from './scripts/vite-plugin-sitemap.mjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemapPlugin(),
  ],
})