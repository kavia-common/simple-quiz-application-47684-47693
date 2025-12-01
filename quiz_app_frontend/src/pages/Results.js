import Blits from '@lightningjs/blits'

export default Blits.Component('Results', {
  template: `
    <Element w="1920" h="1080">
      <Element w="1920" h="1080" color="#f9fafb" />
      <Element w="1920" h="120">
        <Text x="120" y="60" mount="y:1" size="48" color="#2563EB" content="Ocean Quiz" />
      </Element>

      <Element x="360" y="240" w="1200" h="680" color="#ffffff">
        <Text x="80" y="140" size="48" color="#111827" content="Results" />
        <Text x="80" y="220" size="36" color="#6B7280" :content="$scoreText" />
        <Text x="80" y="280" size="28" color="#111827" :content="$messageText" />

        <Element x="80" y="360" w="320" h="84" color="#2563EB">
          <Text x="24" y="42" mount="y:0.5" size="32" color="#ffffff" content="Restart" />
        </Element>

        <Text x="80" y="470" size="24" color="#6B7280" content="Press Enter to restart or Back for Intro." />
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
    messageText() {
      const s = Number(this.score)
      const t = Number(this.total)
      if (t <= 0) return 'Thanks for playing!'
      const ratio = t ? s / t : 0
      if (ratio >= 0.8) return 'Great job!'
      if (ratio >= 0.5) return 'Nice effort!'
      return 'Keep practicing!'
    },
  },
  hooks: {
    ready() {
      // Read score & total from router query or localStorage fallback
      const query = (this.$router && this.$router.current && this.$router.current.query) ? this.$router.current.query : ''
      const params = new URLSearchParams(query || '')
      const scoreParam = params.get('score')
      const totalParam = params.get('total')
      const storedScore = Number(localStorage.getItem('quiz_score') || 0)

      this.score = (scoreParam !== null ? Number(scoreParam) : storedScore) || 0
      this.total = (totalParam !== null ? Number(totalParam) : 0)

      // Reset stored score for the next run
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
