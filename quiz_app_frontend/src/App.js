import Blits from '@lightningjs/blits'
import Intro from './pages/Intro.js'
import Quiz from './pages/Quiz.js'
import Results from './pages/Results.js'
import theme from './theme.js'

// PUBLIC_INTERFACE
/**
 * Root App component:
 * - Renders a visible background
 * - Mounts the Router as a child component with Intro as the initial route
 * - Uses only state bindings in template (precompiler-safe)
 */
export default Blits.App({
  template: `
    <Element w="1280" h="720" color="{bg}" alpha="1">
      <Element y="0"   w="1280" h="180" color="{grad1}" alpha="1" />
      <Element y="180" w="1280" h="180" color="{grad2}" alpha="1" />
      <Element y="360" w="1280" h="180" color="{grad3}" alpha="1" />
      <Element y="540" w="1280" h="180" color="{grad4}" alpha="1" />
      <Router />
    </Element>
  `,
  state() {
    return {
      bg: theme.background,
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
