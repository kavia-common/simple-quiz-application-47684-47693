import Blits from '@lightningjs/blits'
import App from './App.js'

/**
 * Start the Blits application with fixed canvas size and explicit renderer config.
 * Using default import and Blits.start to match package exports.
 */
// PUBLIC_INTERFACE
function boot() {
  Blits.start(App, {
    w: 1280,
    h: 720,
    // Ensure the correct canvas is used and sized
    canvasId: 'app',
    canvas: { width: 1280, height: 720 },
    // Renderer hints: keep pixel ratio at 1 to avoid scaling blur in CI/preview
    rendererOptions: { devicePixelRatio: 1 },
  })
}

boot()
