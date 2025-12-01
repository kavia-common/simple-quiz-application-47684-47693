import Blits from '@lightningjs/blits'
import Intro from './pages/Intro.js'
import Quiz from './pages/Quiz.js'
import Results from './pages/Results.js'

export default Blits.Application({
  template: `
    <Element>
      <RouterView />
    </Element>
  `,
  routes: [
    { path: '/', component: Intro },
    { path: '/quiz', component: Quiz },
    { path: '/results', component: Results },
  ],
})
