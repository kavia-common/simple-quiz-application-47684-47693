import Blits from '@lightningjs/blits'
import Card from '../components/Card.js'
import Loader from '../components/Loader.js'
import { getQuestions } from '../quizData.js'

export default Blits.Component('Quiz', {
  components: { Card, Loader },
  template: `
    <Element w="1920" h="1080">
      <Element w="1920" h="1080" color="#f9fafb" />
      <Element w="1920" h="120">
        <Text x="120" y="60" mount="y:1" size="48" color="#2563EB" content="Ocean Quiz" />
      </Element>

      <Card>
        <Element>
          <!-- Loading -->
          <Element x="80" y="120" :alpha="$loadingAlpha">
            <Text size="40" color="#111827" content="Loading questions..." />
            <Loader x="0" y="80" />
          </Element>

          <!-- Quiz content -->
          <Element :alpha="$contentAlpha">
            <Text x="80" y="80" size="28" color="#6B7280" :content="$progressText" />

            <Text x="80" y="140" size="42" color="#111827" maxwidth="1040" :content="$questionText" />

            <!-- Options (explicit rows to avoid complex v-for patterns) -->
            <Element x="80" y="240">
              <Element w="1040" h="64" :y="$y1" :effects="$optionEffects" :color="$bg1">
                <Text x="24" y="32" mount="y:0.5" size="30" :color="$fg1" :content="$label1" />
              </Element>
              <Element w="1040" h="64" :y="$y2" :effects="$optionEffects" :color="$bg2">
                <Text x="24" y="32" mount="y:0.5" size="30" :color="$fg2" :content="$label2" />
              </Element>
              <Element w="1040" h="64" :y="$y3" :effects="$optionEffects" :color="$bg3">
                <Text x="24" y="32" mount="y:0.5" size="30" :color="$fg3" :content="$label3" />
              </Element>
              <Element w="1040" h="64" :y="$y4" :effects="$optionEffects" :color="$bg4">
                <Text x="24" y="32" mount="y:0.5" size="30" :color="$fg4" :content="$label4" />
              </Element>
              <Element w="1040" h="64" :y="$y5" :effects="$optionEffects" :color="$bg5">
                <Text x="24" y="32" mount="y:0.5" size="30" :color="$fg5" :content="$label5" />
              </Element>
              <Element w="1040" h="64" :y="$y6" :effects="$optionEffects" :color="$bg6">
                <Text x="24" y="32" mount="y:0.5" size="30" :color="$fg6" :content="$label6" />
              </Element>
              <Element w="1040" h="64" :y="$y7" :effects="$optionEffects" :color="$bg7">
                <Text x="24" y="32" mount="y:0.5" size="30" :color="$fg7" :content="$label7" />
              </Element>
              <Element w="1040" h="64" :y="$y8" :effects="$optionEffects" :color="$bg8">
                <Text x="24" y="32" mount="y:0.5" size="30" :color="$fg8" :content="$label8" />
              </Element>
              <Element w="1040" h="64" :y="$y9" :effects="$optionEffects" :color="$bg9">
                <Text x="24" y="32" mount="y:0.5" size="30" :color="$fg9" :content="$label9" />
              </Element>
              <Element w="1040" h="64" :y="$y10" :effects="$optionEffects" :color="$bg10">
                <Text x="24" y="32" mount="y:0.5" size="30" :color="$fg10" :content="$label10" />
              </Element>
            </Element>

            <!-- Next / Submit -->
            <Element x="80" y="520" w="260" h="80"
              :effects="$ctaEffects"
              :alpha="$ctaAlpha"
              :color="$ctaBg">
              <Text x="24" y="40" mount="y:0.5" size="32"
                :color="$ctaFg"
                :content="$nextText" />
            </Element>

            <!-- Feedback -->
            <Text x="360" y="560" :alpha="$feedbackAlpha" size="28"
              :color="$feedbackColor"
              :content="$feedbackText" />
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

      // pre-defined effect holders to avoid inline arrays/objects
      optionEffects: [],
      ctaEffects: [],
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

    // Alpha / CTA / feedback
    loadingAlpha() {
      return this.loading ? 1 : 0
    },
    contentAlpha() {
      return this.loading ? 0 : 1
    },
    ctaAlpha() {
      return this.selectedIndex === null ? 0.5 : 1
    },
    ctaBg() {
      return this.selectedIndex === null ? '#1118271A' : '#2563EB'
    },
    ctaFg() {
      return this.selectedIndex === null ? '#111827' : '#ffffff'
    },
    feedbackAlpha() {
      return this.showFeedback ? 1 : 0
    },
    feedbackColor() {
      return this.isCorrect ? '#F59E0B' : '#EF4444'
    },
    feedbackText() {
      return this.isCorrect ? 'Correct!' : 'Not quite. Keep going!'
    },

    // Option rows (up to 10)
    y1() { return 0 },
    y2() { return this.options.length > 1 ? 80 : -9999 },
    y3() { return this.options.length > 2 ? 160 : -9999 },
    y4() { return this.options.length > 3 ? 240 : -9999 },
    y5() { return this.options.length > 4 ? 320 : -9999 },
    y6() { return this.options.length > 5 ? 400 : -9999 },
    y7() { return this.options.length > 6 ? 480 : -9999 },
    y8() { return this.options.length > 7 ? 560 : -9999 },
    y9() { return this.options.length > 8 ? 640 : -9999 },
    y10() { return this.options.length > 9 ? 720 : -9999 },

    label1() { return this._labelFor(0) },
    label2() { return this._labelFor(1) },
    label3() { return this._labelFor(2) },
    label4() { return this._labelFor(3) },
    label5() { return this._labelFor(4) },
    label6() { return this._labelFor(5) },
    label7() { return this._labelFor(6) },
    label8() { return this._labelFor(7) },
    label9() { return this._labelFor(8) },
    label10() { return this._labelFor(9) },

    bg1() { return this._bgFor(0) },
    bg2() { return this._bgFor(1) },
    bg3() { return this._bgFor(2) },
    bg4() { return this._bgFor(3) },
    bg5() { return this._bgFor(4) },
    bg6() { return this._bgFor(5) },
    bg7() { return this._bgFor(6) },
    bg8() { return this._bgFor(7) },
    bg9() { return this._bgFor(8) },
    bg10() { return this._bgFor(9) },

    fg1() { return this._fgFor(0) },
    fg2() { return this._fgFor(1) },
    fg3() { return this._fgFor(2) },
    fg4() { return this._fgFor(3) },
    fg5() { return this._fgFor(4) },
    fg6() { return this._fgFor(5) },
    fg7() { return this._fgFor(6) },
    fg8() { return this._fgFor(7) },
    fg9() { return this._fgFor(8) },
    fg10() { return this._fgFor(9) },
  },
  hooks: {
    async ready() {
      const list = await getQuestions()
      this.questions = list.slice(0, 10) // cap at 10
      this.loading = false
      this.selectedIndex = null
      this.showFeedback = false

      // initialize effects once in code, not in template
      this.optionEffects = [this.$shader('radius', { radius: 12 })]
      this.ctaEffects = [this.$shader('radius', { radius: 14 })]
    },
    focus() {
      if (this.selectedIndex === null) this.selectedIndex = 0
    },
  },
  methods: {
    _labelFor(i) {
      const opt = this.options[i]
      if (typeof opt === 'undefined') return ''
      return String.fromCharCode(65 + i) + '. ' + String(opt)
    },
    _bgFor(i) {
      if (i >= this.options.length) return 'transparent'
      const sel = this.selectedIndex
      const show = this.showFeedback
      if (sel === i && show) {
        return this.isCorrect ? '#F59E0B' : '#EF4444'
      } else if (sel === i) {
        return '#2563EB33'
      }
      return '#1118270D'
    },
    _fgFor(i) {
      if (i >= this.options.length) return 'transparent'
      const sel = this.selectedIndex
      const show = this.showFeedback
      if (sel === i && show) {
        return '#ffffff'
      }
      return '#111827'
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
