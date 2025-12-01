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
      <Router />
    </Element>
  `,

  state() {
    return {
      bg: theme.background,
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
      }),
    }
  },
})
