import Blits from '@lightningjs/blits'
import theme from '../theme.js'
import quiz from '../quizData.js'
import Button from '../components/Button.js'

/**
 * Quiz Page: Displays one question with 4 options. Selection highlights the row.
 * Next advances questions, then navigates to Results with score in route state.
 */
export default Blits.Component({
  template: `
    <Element w="100%" h="100%" color="{bg}" alpha="1">
      <Text content="{questionText}" x="{qX}" y="{qY}" color="{titleColor}" fontSize="{qSize}" />

      <Element x="{listX}" y="{listY}" w="{listW}" h="{listH}">
        <Element y="{row0Y}" w="{listW}" h="{rowH}" color="{opt1Bg}" focusable="true">
          <Text content="{opt1}" x="{txtX}" y="{txtY}" color="{optColor}" fontSize="{optSize}" />
        </Element>
        <Element y="{row1Y}" w="{listW}" h="{rowH}" color="{opt2Bg}" focusable="true">
          <Text content="{opt2}" x="{txtX}" y="{txtY}" color="{optColor}" fontSize="{optSize}" />
        </Element>
        <Element y="{row2Y}" w="{listW}" h="{rowH}" color="{opt3Bg}" focusable="true">
          <Text content="{opt3}" x="{txtX}" y="{txtY}" color="{optColor}" fontSize="{optSize}" />
        </Element>
        <Element y="{row3Y}" w="{listW}" h="{rowH}" color="{opt4Bg}" focusable="true">
          <Text content="{opt4}" x="{txtX}" y="{txtY}" color="{optColor}" fontSize="{optSize}" />
        </Element>
      </Element>

      <Button x="{btnX}" y="{btnY}" width="{btnW}" height="{btnH}" label="{nextLabel}" />
    </Element>
  `,

  state() {
    return {
      // layout
      qX: 160, qY: 120, qSize: 36,
      listX: 160, listY: 220, listW: 1000, listH: 320,
      rowH: 64,
      row0Y: 0, row1Y: 80, row2Y: 160, row3Y: 240,
      txtX: 24, txtY: 18, optSize: 24,
      btnX: 160, btnY: 580, btnW: 200, btnH: 64,

      // theme
      bg: theme.background,
      titleColor: theme.text,
      optColor: theme.text,
      primary: theme.primary,
      surface: theme.surface,

      // quiz state
      idx: 0,
      selected: -1,
      score: 0,

      // text
      questionText: '',
      opt1: '',
      opt2: '',
      opt3: '',
      opt4: '',
      nextLabel: 'Next',

      // option backgrounds
      opt1Bg: theme.surface,
      opt2Bg: theme.surface,
      opt3Bg: theme.surface,
      opt4Bg: theme.surface,
    }
  },

  components() {
    return { Button }
  },

  methods: {
    // PUBLIC_INTERFACE
    load() {
      const q = quiz[this.$state.idx]
      this.$state.questionText = q.question
      this.$state.opt1 = q.options[0]
      this.$state.opt2 = q.options[1]
      this.$state.opt3 = q.options[2]
      this.$state.opt4 = q.options[3]
      this.$state.opt1Bg = this.$state.surface
      this.$state.opt2Bg = this.$state.surface
      this.$state.opt3Bg = this.$state.surface
      this.$state.opt4Bg = this.$state.surface
      this.$state.selected = -1
    },

    // PUBLIC_INTERFACE
    select(i) {
      this.$state.selected = i
      const p = this.$state.primary
      const s = this.$state.surface
      this.$state.opt1Bg = i === 0 ? p : s
      this.$state.opt2Bg = i === 1 ? p : s
      this.$state.opt3Bg = i === 2 ? p : s
      this.$state.opt4Bg = i === 3 ? p : s
    },

    // PUBLIC_INTERFACE
    next() {
      const current = quiz[this.$state.idx]
      if (this.$state.selected === current.answerIndex) {
        this.$state.score = this.$state.score + 1
      }
      const nextIdx = this.$state.idx + 1
      if (nextIdx >= quiz.length) {
        const r = Blits.Router && Blits.Router.getRouter ? Blits.Router.getRouter() : null
        if (r && r.navigate) {
          r.navigate('/results', { state: { score: this.$state.score, total: quiz.length } })
        }
      } else {
        this.$state.idx = nextIdx
        this.methods.load()
      }
    },
  },

  onInit() {
    this.methods.load()
  },

  onReady() {
    const btn = this.$child('Button')
    if (btn) {
      btn.props.onPress = this.methods.next
    }
    const list = this.$childAt(1)
    if (list) {
      const r0 = list.childAt(0)
      const r1 = list.childAt(1)
      const r2 = list.childAt(2)
      const r3 = list.childAt(3)
      if (r0) r0.onEnter = () => this.methods.select(0)
      if (r1) r1.onEnter = () => this.methods.select(1)
      if (r2) r2.onEnter = () => this.methods.select(2)
      if (r3) r3.onEnter = () => this.methods.select(3)
    }
  },
})
