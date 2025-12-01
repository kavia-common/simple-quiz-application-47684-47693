import Blits from '@lightningjs/blits'
import Card from '../components/Card.js'
import Button from '../components/Button.js'
import theme from '../theme.js'

/**
 * Intro Page: Shows title, a welcome card, and a Start button to navigate to /quiz.
 */
export default Blits.Component({
  template: `
    <Element w="100%" h="100%" color="{bg}">
      <Element w="100%" h="{headerH}" y="{headerY}">
        <Text content="{appTitle}" x="{headerX}" y="{headerTextY}" color="{titleColor}" fontSize="{titleSize}" />
      </Element>

      <Card x="{cardX}" y="{cardY}" width="{cardW}" height="{cardH}" title="{cardTitle}" body="{cardBody}" />

      <Button x="{btnX}" y="{btnY}" width="{btnW}" height="{btnH}" label="{btnLabel}" />
    </Element>
  `,

  state() {
    return {
      // layout
      headerH: 80,
      headerY: 24,
      headerX: 64,
      headerTextY: 16,
      cardX: 160,
      cardY: 180,
      cardW: 1000,
      cardH: 360,
      btnX: 160,
      btnY: 580,
      btnW: 260,
      btnH: 64,
      titleSize: 40,

      // colors
      bg: theme.background,
      titleColor: theme.text,

      // text
      appTitle: 'Ocean Professional Quiz',
      cardTitle: 'Welcome',
      cardBody: 'Test your knowledge. Press Start to begin.',
      btnLabel: 'Start Quiz',
    }
  },

  components() {
    return { Card, Button }
  },

  onReady() {
    const btn = this.$child('Button')
    if (btn) {
      btn.props.onPress = () => {
        const r = Blits.Router && Blits.Router.getRouter ? Blits.Router.getRouter() : null
        if (r && r.navigate) {
          r.navigate('/quiz')
        }
      }
    }
  },
})
