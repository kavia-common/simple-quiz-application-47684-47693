import Blits from '@lightningjs/blits'
import Intro from './pages/Intro.js'
import Quiz from './pages/Quiz.js'
import Results from './pages/Results.js'
import theme from './theme.js'

/* PUBLIC_INTERFACE
Root App component entrypoint.

This component sets up the global background and mounts the Router above it.

Parameters: none (Blits root app)
Returns: A Blits App component which renders a solid background and the Router with initial route '/'
*/
export default Blits.App({
  template: `
    <Element w="1280" h="720" color="{bg}" alpha="1" focusable="false">
      <Element y="{row0Y}" w="1280" h="{rowH}" color="{grad1}" alpha="1" />
      <Element y="{row1Y}" w="1280" h="{rowH}" color="{grad2}" alpha="1" />
      <Element y="{row2Y}" w="1280" h="{rowH}" color="{grad3}" alpha="1" />
      <Element y="{row3Y}" w="1280" h="{rowH}" color="{grad4}" alpha="1" />
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
      rowH: 180,
      row0Y: 0,
      row1Y: 180,
      row2Y: 360,
      row3Y: 540,
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
