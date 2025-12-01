import Blits from '@lightningjs/blits'
import Intro from './pages/Intro.js'
import Quiz from './pages/Quiz.js'
import Results from './pages/Results.js'
import theme from './theme.js'

/**
 * Root App: applies Ocean background and mounts Router above it.
 * Template bindings use only state refs/literals for safety.
 */
// PUBLIC_INTERFACE
export default Blits.App({
  template: `
    <Element w="100%" h="100%" color="{bg}" alpha="1">
      <!-- Subtle gradient stripes to avoid flat look while staying light -->
      <Element y="0"   w="100%" h="25%" color="{grad1}" alpha="1" />
      <Element y="25%" w="100%" h="25%" color="{grad2}" alpha="1" />
      <Element y="50%" w="100%" h="25%" color="{grad3}" alpha="1" />
      <Element y="75%" w="100%" h="25%" color="{grad4}" alpha="1" />

      <!-- Router above background -->
      <Element w="100%" h="100%" alpha="1">
        <Router />
      </Element>
    </Element>
  `,

  state() {
    return {
      bg: theme.background,
      // very light blues/greys to match Ocean Professional
      grad1: '#f3f6fb',
      grad2: '#f7fafc',
      grad3: '#f3f6fb',
      grad4: '#ffffff',
    }
  },

  components() {
    return {
      Router: Blits.Router({
        routes: [
          { path: '/', component: Intro },
          { path: '/quiz', component: Quiz },
          { path: '/results', component: Results },
        ],
        initial: '/',
      }),
    }
  },
})
