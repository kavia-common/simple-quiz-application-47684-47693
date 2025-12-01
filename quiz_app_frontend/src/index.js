import Blits from '@lightningjs/blits'
import App from './App.js'

// PUBLIC_INTERFACE
/**
 * Bootstraps the Blits application once the DOM is ready.
 * Ensures the app starts exactly once and uses canvas id "app".
 * Adds a small "OK" text at (20,20) to verify render loop.
 */
function boot() {
  // Prevent double-start if DOMContentLoaded fires after immediate execution
  if (window.__blitsStarted) return
  window.__blitsStarted = true

  // Register a default font family if available; safe-guarded
  try {
    if (Blits && Blits.fonts && typeof Blits.fonts.register === 'function') {
      Blits.fonts.register('Default', {
        family:
          'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", Arial',
      })
      Blits.fonts.default = 'Default'
    }
  } catch (e) {
    console.warn('Font registration skipped:', e)
  }

  // Start app with the specific canvas id and fixed dimensions
  const app = Blits.start(App, {
    canvasId: 'app',
    w: 1280,
    h: 720,
    devicePixelRatio: 1,
  })

  // One-frame debug draw to confirm the render loop
  if (app && typeof app.add === 'function') {
    app.add({
      type: 'Text',
      x: 20,
      y: 20,
      text: 'OK',
      fontSize: 20,
      color: 0xff111827, // dark text
      alpha: 1,
    })
  }
}

// Ensure startup after DOM is ready exactly once
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true })
} else {
  boot()
}
