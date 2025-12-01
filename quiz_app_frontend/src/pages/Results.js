import Blits from '@lightningjs/blits'
import { OceanTheme as T } from '../theme.js'

export default Blits.Component('Results', {
  template: `
    <Element w="1920" h="1080">
      <Element w="1920" h="1080" color="#f9fafb" />
      <Element w="1920" h="120">
        <Text x="120" y="60" mount="y:1" size="48" color="#2563EB" content="Ocean Quiz" />
      </Element>

      <!-- Center block -->
      <Element x="360" y="240" w="1200" h="680" color="#ffffff">
        <Text x="80" y="140" size="48" color="#111827" content="Your Results" />
        <Text x="80" y="220" size="36" color="#6B7280" :content="$scoreText" />

        <!-- Restart button -->
        <Element x="80" y="340" w="320" h="84" :color="$buttonBg">
          <Text x="24" y="42" mount="y:0.5" size="32" :color="$buttonFg" content="Restart Quiz" />
        </Element>

        <Text x="80" y="460" size="26" color="#6B7280"
          content="Press Enter to restart. Up/Down/Enter supported throughout the quiz." />
      </Element>
    </Element>
  `,
  state() {
    return {
      score: 0,
      total: 0,
    }
  },
  computed: {
    scoreText() {
      return 'Score: ' + this.score + ' / ' + this.total
    },
    buttonBg() {
      // Static colors to avoid inline template expressions
      return T && T.colors && T.colors.primary ? T.colors.primary : '#2563EB'
    },
    buttonFg() {
      return T && T.colors && T.colors.surface ? T.colors.surface : '#ffffff'
    },
  },
  hooks: {
    ready() {
      // Obtain params from router query, fallback to localStorage for score if needed
      const query = (this.$router && this.$router.current && this.$router.current.query) ? this.$router.current.query : ''
      const params = new URLSearchParams(query || '')
      const scoreParam = params.get('score')
      const totalParam = params.get('total')

      const storedScore = Number(localStorage.getItem('quiz_score') || 0)

      this.score = (scoreParam !== null ? Number(scoreParam) : storedScore) || 0
      this.total = (totalParam !== null ? Number(totalParam) : 0)

      // Reset stored score for next run
      localStorage.setItem('quiz_score', '0')
    },
  },
  input: {
    enter() {
      this.$router.to('/quiz')
    },
    back() {
      this.$router.to('/')
    },
  },
})
