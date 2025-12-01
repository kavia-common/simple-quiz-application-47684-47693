import Blits from '@lightningjs/blits'
import App from './App.js'

// PUBLIC_INTERFACE
/**
 * Bootstraps the Blits application once the DOM is ready.
 * Ensures the app starts exactly once and uses canvas id "app".
 * Adds a visible "BUILD ACTIVE" overlay to verify render loop.
 */
function boot() {
  // Prevent double-start if DOMContentLoaded fires after immediate execution
  if (window.__blitsStarted) return
  window.__blitsStarted = true

  console.log('[BLITS] boot() starting...')
  const canvas = document.getElementById('app')
  if (!canvas) {
    console.error('[BLITS] Canvas #app not found!')
  } else {
    console.log('[BLITS] Found canvas #app', canvas.width, canvas.height)
  }

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

  // Persistent overlay to confirm render loop
  if (app && typeof app.add === 'function') {
    app.add({
      type: 'Text',
      x: 40,
      y: 40,
      text: 'BUILD ACTIVE',
      fontSize: 28,
      color: 0xff2563eb, // primary blue
      alpha: 1,
    })
  }
  console.log('[BLITS] boot() completed.')
}

// Ensure startup after DOM is ready exactly once
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true })
} else {
  boot()
}
