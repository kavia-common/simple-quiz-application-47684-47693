import Blits from '@lightningjs/blits'
import Intro from './pages/Intro.js'
import Quiz from './pages/Quiz.js'
import Results from './pages/Results.js'
import theme from './theme.js'

/* PUBLIC_INTERFACE
Root App component entrypoint.

Ensures explicit width/height and opaque alpha, renders a background layer,
and uses Router as the active view by default (verifyMinimal=false).
*/
export default Blits.App({
  template: `
    <Element w="1280" h="720" color="{bg}" alpha="1" focusable="false">
      <!-- Background stripes for subtle texture -->
      <Element y="{row0Y}" w="1280" h="{rowH}" color="{grad1}" alpha="1" />
      <Element y="{row1Y}" w="1280" h="{rowH}" color="{grad2}" alpha="1" />
      <Element y="{row2Y}" w="1280" h="{rowH}" color="{grad3}" alpha="1" />
      <Element y="{row3Y}" w="1280" h="{rowH}" color="{grad4}" alpha="1" />

      <!-- Minimal verification (kept but disabled by default) -->
      <Element alpha="{showMinimalAlpha}">
        <Text content="Intro" x="440" y="220" color="{titleColor}" fontSize="72" />
        <Text content="Welcome to the Simple Quiz" x="440" y="300" color="{subColor}" fontSize="28" />
      </Element>

      <!-- Router sits above background when enabled -->
      <Router alpha="{showRouterAlpha}" />
    </Element>
  `,
  state() {
    const verifyMinimal = false // Router active
    return {
      bg: theme.background,
      grad1: '#f3f6fb',
      grad2: '#f7fafc',
      grad3: '#f3f6fb',
      grad4: '#ffffff',
      rowH: 180,
      row0Y: 0,
      row1Y: 180,
      row2Y: 360,
      row3Y: 540,
      showMinimalAlpha: verifyMinimal ? 1 : 0,
      showRouterAlpha: verifyMinimal ? 0 : 1,
      titleColor: theme.text,
      subColor: '#374151',
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
