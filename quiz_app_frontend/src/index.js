import Blits from '@lightningjs/blits'
import App from './App.js'

/**
 * Start the Blits application with fixed canvas size.
 * Using default import and Blits.start to match package exports.
 */
// PUBLIC_INTERFACE
function boot() {
  Blits.start(App, {
    w: 1280,
    h: 720,
    canvas: { width: 1280, height: 720 },
    canvasId: 'app',
  })
}

boot()
