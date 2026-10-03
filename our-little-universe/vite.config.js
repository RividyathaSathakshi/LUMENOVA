import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' keeps every asset path relative, so the built site works
// from any folder or static host (GitHub Pages, Netlify, a USB stick...).
export default defineConfig({
  base: './',
  plugins: [react()],
})
