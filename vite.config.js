import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // ensures assets are served from root on Vercel
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  assetsInclude: ['**/*.glb'], // allow Vite to treat .glb files as assets
})