import { defineConfig } from 'vite'

// Vite configuration for Blits app, uses port 3000 by default.
// Disable HMR error overlay to avoid covering the canvas with a blank overlay.
export default defineConfig({
  server: {
    port: 3000,
    hmr: {
      overlay: false,
    },
  },
})
