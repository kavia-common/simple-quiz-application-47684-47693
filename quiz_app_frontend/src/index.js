import { start } from '@lightningjs/blits'
import App from './App.js'

/**
 * Start the Blits application with fixed canvas size.
 */
start(App, {
  w: 1280,
  h: 720,
  canvas: { width: 1280, height: 720 },
})
