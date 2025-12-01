import Blits from '@lightningjs/blits'
import Intro from './pages/Intro.js'
import Quiz from './pages/Quiz.js'
import Results from './pages/Results.js'
import theme from './theme.js'

/**
 * Root App: wraps Router inside a full-screen Element.
 * Template bindings are limited to $state references and literals to be precompiler-safe.
 */
// PUBLIC_INTERFACE
export default Blits.App({
  template: `
    <Element w="100%" h="100%" color="{bg}" alpha="1">
      <!-- Temporary debug overlay to confirm draw -->
      <Text content="{hello}" x="20" y="20" color="#ffffff" fontSize="22" />
      <Router />
    </Element>
  `,

  state() {
    return {
      bg: theme.background,
      hello: 'Hello',
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
        // Ensure navigation starts at Intro
        initial: '/',
      }),
    }
  },
})
