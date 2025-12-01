import Blits from '@lightningjs/blits'
import Intro from './pages/Intro.js'
import Quiz from './pages/Quiz.js'
import Results from './pages/Results.js'
import theme from './theme.js'

/**
 * Root App: wraps Router inside a full-screen Element.
 * Template bindings are limited to $state references and literals to be precompiler-safe.
 */
export default Blits.App({
  template: `
    <Element w="100%" h="100%" color="{bg}">
      <!-- Temporary debug overlay -->
      <Element x="0" y="0" w="300" h="40" color="#000000">
        <Text content="{hello}" x="8" y="8" color="#ffffff" fontSize="22" />
      </Element>
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
