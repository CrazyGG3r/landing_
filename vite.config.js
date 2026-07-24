import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vercelDev } from './dev/vercelDev'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // ensures assets are served from root on Vercel
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    // Dev only (apply: 'serve'). Runs api/* and middleware.js locally so
    // `npm run dev` matches production instead of 404ing on the auth calls.
    vercelDev(),
  ],
  assetsInclude: ['**/*.glb', '**/*.otf', '**/*.ttf'], // Combine into single array
})