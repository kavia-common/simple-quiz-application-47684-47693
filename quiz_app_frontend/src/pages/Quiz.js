import Blits from '@lightningjs/blits'
import { OceanTheme as T } from '../theme.js'
import Card from '../components/Card.js'
import Loader from '../components/Loader.js'
import { getQuestions } from '../quizData.js'

export default Blits.Component('Quiz', {
  components: { Card, Loader },
  template: `
    <Element w="1920" h="1080">
      <Element w="1920" h="1080" color="${T.colors.background}" />
      <Element w="1920" h="120">
        <Text x="120" y="60" mount="y:1" size="48" color="${T.colors.primary}" content="Ocean Quiz" />
      </Element>

      <Card>
        <Element>
          <!-- Loading -->
          <Element x="80" y="120" :alpha="$loading ? 1 : 0">
            <Text size="40" color="${T.colors.text}" content="Loading questions..." />
            <Loader x="0" y="80" />
          </Element>

          <!-- Quiz content -->
          <Element :alpha="$loading ? 0 : 1">
            <Text x="80" y="80" size="28" color="${T.colors.muted}" :content="$progressText" />

            <Text x="80" y="140" size="42" color="${T.colors.text}" maxwidth="1040" :content="$questionText" />

            <!-- Options -->
            <Element x="80" y="240">
              <Element v-for="(opt, idx) in $options" :y="idx * 80"
                w="1040" h="64"
                :effects="[$shader('radius', {radius: 12})]"
                :color="getOptionColor(idx)">
                <Text x="24" y="32" mount="y:0.5" size="30"
                  :color="getOptionTextColor(idx)"
                  :content="String.fromCharCode(65 + idx) + '. ' + opt" />
              </Element>
            </Element>

            <!-- Next / Submit -->
            <Element x="80" y="520" w="260" h="80"
              :effects="[$shader('radius', {radius: 14})]"
              :alpha="$selectedIndex === null ? 0.5 : 1"
              :color="$selectedIndex === null ? '${T.colors.text}1A' : '${T.colors.primary}'">
              <Text x="24" y="40" mount="y:0.5" size="32"
                :color="$selectedIndex === null ? '${T.colors.text}' : '${T.colors.surface}'"
                :content="$nextText" />
            </Element>

            <!-- Feedback -->
            <Text x="360" y="560" :alpha="$showFeedback ? 1 : 0" size="28"
              :color="$isCorrect ? '${T.colors.success}' : '${T.colors.error}'"
              :content="$isCorrect ? 'Correct!' : 'Not quite. Keep going!'" />
          </Element>
        </Element>
      </Card>
    </Element>
  `,
  state() {
    return {
      loading: true,
      questions: [],
      currentIndex: 0,
      selectedIndex: null,
      showFeedback: false,
      isCorrect: false,
    }
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex] || null
    },
    options() {
      const q = this.currentQuestion
      return q && Array.isArray(q.options) ? q.options : []
    },
    total() {
      return this.questions.length
    },
    isLast() {
      return this.currentIndex >= this.total - 1
    },
    progressText() {
      return 'Question ' + (this.currentIndex + 1) + ' / ' + this.total
    },
    questionText() {
      const q = this.currentQuestion
      return (q && q.question) ? q.question : ''
    },
    nextText() {
      return this.isLast ? 'Submit' : 'Next'
    },
  },
  hooks: {
    async ready() {
      const list = await getQuestions()
      this.questions = list.slice(0, 10) // cap at 10
      this.loading = false
      this.selectedIndex = null
      this.showFeedback = false
    },
    focus() {
      if (this.selectedIndex === null) this.selectedIndex = 0
    },
  },
  methods: {
    getOptionColor(idx) {
      const sel = this.selectedIndex
      if (sel === idx && this.showFeedback) {
        return this.isCorrect ? T.colors.success : T.colors.error
      }
      return sel === idx ? T.colors.primary + '33' : T.colors.text + '0D'
    },
    getOptionTextColor(idx) {
      const sel = this.selectedIndex
      if (sel === idx && this.showFeedback) {
        return T.colors.surface
      }
      return T.colors.text
    },
    evaluateSelection() {
      if (this.selectedIndex === null || !this.currentQuestion) return
      const correctIdx = this.currentQuestion.answerIndex
      this.isCorrect = Number(this.selectedIndex) === Number(correctIdx)
      this.showFeedback = true
    },
    persistScore(increment) {
      const key = 'quiz_score'
      const prev = Number(localStorage.getItem(key) || 0)
      localStorage.setItem(key, String(prev + (increment ? 1 : 0)))
    },
    resetScore() {
      localStorage.setItem('quiz_score', '0')
    },
    navigateNext() {
      if (this.selectedIndex === null) return
      this.evaluateSelection()
      this.persistScore(this.isCorrect)

      this.$setTimeout(() => {
        if (this.isLast) {
          const total = this.total
          const score = Number(localStorage.getItem('quiz_score') || 0)
          this.$router.to('/results?score=' + score + '&total=' + total)
          return
        }
        this.currentIndex += 1
        this.selectedIndex = 0
        this.showFeedback = false
      }, 350)
    },
  },
  input: {
    up() {
      if (!this.currentQuestion) return
      if (this.selectedIndex === null) this.selectedIndex = 0
      else this.selectedIndex = (this.selectedIndex - 1 + this.options.length) % this.options.length
    },
    down() {
      if (!this.currentQuestion) return
      if (this.selectedIndex === null) this.selectedIndex = 0
      else this.selectedIndex = (this.selectedIndex + 1) % this.options.length
    },
    enter() {
      this.navigateNext()
    },
    back() {
      this.$router.to('/')
    },
  },
})
