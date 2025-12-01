import Blits from '@lightningjs/blits'
import { OceanTheme as T } from '../theme.js'
import Card from '../components/Card.js'

export default Blits.Component('Results', {
  components: { Card },
  template: `
    <Element w="1920" h="1080">
      <!-- Static background and header use plain template values, not dynamic object/array expressions -->
      <Element w="1920" h="1080" color="${T.colors.background}" />
      <Element w="1920" h="120">
        <Text x="120" y="60" mount="y:1" size="48" color="${T.colors.primary}" content="Ocean Quiz" />
      </Element>

      <Card>
        <Element>
          <Text x="80" y="140" size="48" color="${T.colors.text}" content="Your Results" />
          <Text x="80" y="220" size="36" color="${T.colors.muted}" :content="$scoreText" />

          <!-- Use method bindings for colors/effects to avoid inline literals in template attributes -->
          <Element x="80" y="340" w="320" h="84"
            :effects="getButtonEffects()"
            :color="getButtonColor()">
            <Text x="24" y="42" mount="y:0.5" size="32"
              :color="getButtonTextColor()"
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
  methods: {
    // Avoid inline object literals and arrays in template attributes
    getButtonEffects() {
      // Precompiler-safe: call shader through method instead of inline array/object
      return [this.$shader('radius', { radius: 14 })]
    },
    getButtonColor() {
      return this.restartFocused ? T.colors.primary : T.colors.text + '1A'
    },
    getButtonTextColor() {
      return this.restartFocused ? T.colors.surface : T.colors.text
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
