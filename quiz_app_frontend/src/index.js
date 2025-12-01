import Blits from '@lightningjs/blits'
import App from './App.js'

// PUBLIC_INTERFACE
/**
 * Bootstraps the Blits application once the DOM is ready.
 * - Matches Blits v1 API: Blits.start(App, { canvasId, w, h, devicePixelRatio })
 * - Ensures canvas with id="app" is used
 * - Adds a tiny debug label to verify the render loop (can be removed later)
 */
function boot() {
  try {
    // Optional: register a default font family; safe no-op if unavailable
    if (Blits?.fonts?.register) {
      Blits.fonts.register('Default', {
        family:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial',
      })
      Blits.fonts.default = 'Default'
    }
  } catch (e) {
    console.warn('Font registration skipped:', e)
  }

  // Start the app
  const app = Blits.start(App, {
    canvasId: 'app',
    w: 1280,
    h: 720,
    devicePixelRatio: 1,
  })

  // Temporary debug label to confirm first render
  if (app && typeof app.add === 'function') {
    app.add({
      type: 'Text',
      x: 20,
      y: 20,
      text: 'OK',
      fontSize: 20,
      color: 0xff111827,
      alpha: 1,
    })
    // Remove the debug label after a short delay
    setTimeout(() => {
      try {
        const c = app.children?.[app.children.length - 1]
        if (c && c.remove) c.remove()
      } catch (_) {
        /* ignore */
      }
    }, 1500)
  }
}

// Ensure startup after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot)
} else {
  boot()
}
