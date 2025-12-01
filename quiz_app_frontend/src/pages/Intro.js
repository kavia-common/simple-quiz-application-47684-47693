import Blits from '@lightningjs/blits'
import { OceanTheme as T } from '../theme.js'

export default Blits.Component('Intro', {
  template: `
    <Element w="1920" h="1080" color="#f9fafb">
      <Element w="1920" h="120">
        <Text x="120" y="60" size="48" color="#2563EB" content="Ocean Quiz" />
      </Element>

      <Element x="360" y="240" w="1200" h="680" color="#ffffff">
        <Text x="80" y="120" size="56" color="#111827" content="Welcome to the Ocean Quiz" />
        <Text x="80" y="200" size="30" color="#6B7280" maxwidth="1040"
          content="Test your knowledge with a quick multiple-choice quiz. Use Up/Down to navigate, Enter to select." />

        <Element x="80" y="360" w="440" h="96" color="#2563EB">
          <Text x="32" y="52" size="36" color="#ffffff" content="Start Quiz" />
        </Element>

        <Text x="80" y="500" size="26" color="#6B7280"
          content="Tip: Configure VITE_API_BASE or VITE_BACKEND_URL to load questions from /api/quiz."/>
      </Element>
    </Element>
  `,
  input: {
    enter() {
      this.$router.to('/quiz')
    },
  },
})
