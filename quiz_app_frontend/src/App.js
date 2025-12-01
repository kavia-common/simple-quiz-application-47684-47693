import Blits from '@lightningjs/blits'
import Intro from './pages/Intro.js'
import Quiz from './pages/Quiz.js'
import Results from './pages/Results.js'
import theme from './theme.js'

/* PUBLIC_INTERFACE
Root App component entrypoint.

This component sets up the global background and can temporarily bypass the Router
to render a minimal verification screen to ensure rendering works.

Parameters: none (Blits root app)
Returns: A Blits App component.
*/
export default Blits.App({
  template: `
    <Element w="1280" h="720" color="{bg}" alpha="1" focusable="false">
      <!-- Background -->
      <Element y="{row0Y}" w="1280" h="{rowH}" color="{grad1}" alpha="1" />
      <Element y="{row1Y}" w="1280" h="{rowH}" color="{grad2}" alpha="1" />
      <Element y="{row2Y}" w="1280" h="{rowH}" color="{grad3}" alpha="1" />
      <Element y="{row3Y}" w="1280" h="{rowH}" color="{grad4}" alpha="1" />

      <!-- Toggle minimal screen vs Router -->
      <Element alpha="{showMinimalAlpha}">
        <Text content="Intro" x="440" y="220" color="{titleColor}" fontSize="72" />
        <Text content="Welcome to the Simple Quiz" x="440" y="300" color="{subColor}" fontSize="28" />
        <Element x="440" y="360" w="400" h="120">
          <Element ref="btn1" x="0"   y="0"   w="180" h="64" color="{btn1Bg}" radius="12" focusable="true">
            <Text content="Start" x="24" y="18" fontSize="24" color="{btnText}" />
          </Element>
          <Element ref="btn2" x="200" y="0"   w="180" h="64" color="{btn2Bg}" radius="12" focusable="true">
            <Text content="Help"  x="24" y="18" fontSize="24" color="{btnText}" />
          </Element>
        </Element>
      </Element>

      <!-- Router sits above background when enabled -->
      <Router alpha="{showRouterAlpha}" />
    </Element>
  `,
  state() {
    const verifyMinimal = true // set to false to re-enable router by default
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
      btn1Bg: theme.primary,
      btn2Bg: '#6b7280',
      btnText: theme.surface,
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
  onReady() {
    // Wire up minimal screen buttons
    const b1 = this.$ref('btn1')
    const b2 = this.$ref('btn2')
    if (b1) b1.onEnter = () => {
      // switch to router and navigate to quiz
      this.$state.showMinimalAlpha = 0
      this.$state.showRouterAlpha = 1
      const r = Blits.Router && typeof Blits.Router.getRouter === 'function' ? Blits.Router.getRouter() : null
      if (r && typeof r.navigate === 'function') r.navigate('/quiz')
    }
    if (b2) b2.onEnter = () => {
      // simple tooltip effect by toggling colors briefly
      this.$state.btn2Bg = '#374151'
      setTimeout(() => { this.$state.btn2Bg = '#6b7280' }, 800)
    }
  },
})
