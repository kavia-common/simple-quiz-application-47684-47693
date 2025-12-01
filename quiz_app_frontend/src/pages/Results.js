import Blits from '@lightningjs/blits'
import { OceanTheme as T } from '../theme.js'
import Card from '../components/Card.js'

export default Blits.Component('Results', {
  components: { Card },
  template: `
    <Element w="1920" h="1080">
      <Element w="1920" h="1080" color="${T.colors.background}" />
      <Element w="1920" h="120">
        <Text x="120" y="60" mount="y:1" size="48" color="${T.colors.primary}" content="Ocean Quiz" />
      </Element>

      <Card>
        <Element>
          <Text x="80" y="140" size="48" color="${T.colors.text}" content="Your Results" />
          <Text x="80" y="220" size="36" color="${T.colors.muted}" :content="$scoreText" />

          <Element x="80" y="340" w="320" h="84"
            :effects="[$shader('radius', {radius: 14})]"
            :color="$restartFocused ? '${T.colors.primary}' : '${T.colors.text}1A'">
            <Text x="24" y="42" mount="y:0.5" size="32"
              :color="$restartFocused ? '${T.colors.surface}' : '${T.colors.text}'"
              content="Restart Quiz" />
          </Element>

          <Text x="80" y="460" size="26" color="${T.colors.muted}"
            content="Press Enter to restart. Up/Down/Enter supported throughout the quiz." />
        </Element>
      </Card>
    </Element>
  `,
  state() {
    return {
      score: 0,
      total: 0,
      restartFocused: true,
    }
  },
  computed: {
    scoreText() {
      return 'Score: ' + this.score + ' / ' + this.total
    },
  },
  hooks: {
    ready() {
      // Parse query params from current route
      const query = (this.$router && this.$router.current && this.$router.current.query) ? this.$router.current.query : ''
      const params = new URLSearchParams(query)
      this.score = Number(params.get('score') || 0)
      this.total = Number(params.get('total') || 0)
      localStorage.setItem('quiz_score', '0')
    },
  },
  input: {
    up() {
      this.restartFocused = true
    },
    down() {
      this.restartFocused = true
    },
    enter() {
      this.$router.to('/quiz')
    },
    back() {
      this.$router.to('/')
    },
  },
})
