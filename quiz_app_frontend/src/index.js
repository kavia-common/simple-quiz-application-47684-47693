import Blits from '@lightningjs/blits'
import App from './App.js'

/**
 * Start the Blits application with fixed canvas size and explicit renderer config.
 * Using default import and Blits.start to match package exports.
 */
// PUBLIC_INTERFACE
function boot() {
  // Register a default font family (system sans) to ensure Text nodes render reliably.
  // If custom fonts are needed, they can be added via Blits.fonts.register.
  if (Blits && Blits.fonts && typeof Blits.fonts.register === 'function') {
    try {
      Blits.fonts.register('Default', { family: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial' })
      Blits.fonts.default = 'Default'
    } catch (e) {
      // non-fatal
      console.warn('Font registration skipped:', e)
    }
  }

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
