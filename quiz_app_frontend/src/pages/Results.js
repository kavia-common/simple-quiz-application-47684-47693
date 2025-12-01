import Blits from '@lightningjs/blits'
import theme from '../theme.js'
import Button from '../components/Button.js'

/**
 * Results Page: shows the score and a button to restart the quiz.
 */
export default Blits.Component({
  template: `
    <Element w="100%" h="100%" color="{bg}">
      <Text content="{title}" x="{titleX}" y="{titleY}" color="{titleColor}" fontSize="{titleSize}" />
      <Text content="{scoreText}" x="{scoreX}" y="{scoreY}" color="{titleColor}" fontSize="{scoreSize}" />
      <Button x="{btnX}" y="{btnY}" width="{btnW}" height="{btnH}" label="{btnLabel}" />
    </Element>
  `,

  state() {
    return {
      // layout
      titleX: 160, titleY: 140, titleSize: 40,
      scoreX: 160, scoreY: 220, scoreSize: 28,
      btnX: 160, btnY: 320, btnW: 220, btnH: 64,

      // theme
      bg: theme.background,
      titleColor: theme.text,

      // text
      title: 'Results',
      scoreText: '',
      btnLabel: 'Restart',
    }
  },

  components() {
    return { Button }
  },

  onInit() {
    let s = { score: 0, total: 0 }
    const r = Blits.Router && Blits.Router.getRouter ? Blits.Router.getRouter() : null
    if (r && r.getState) {
      const st = r.getState()
      if (st && st.state) {
        s = st.state
      }
    }
    this.$state.scoreText = 'You scored ' + s.score + ' / ' + s.total
  },

  onReady() {
    const btn = this.$child('Button')
    if (btn) {
      btn.props.onPress = () => {
        const r = Blits.Router && Blits.Router.getRouter ? Blits.Router.getRouter() : null
        if (r && r.navigate) {
          r.navigate('/')
        }
      }
    }
  },
})
