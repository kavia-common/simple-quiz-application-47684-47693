import Blits from '@lightningjs/blits'
import Button from '../components/Button.js'
import theme from '../theme.js'

/**
 * Intro Page: Centered title, subtitle, and two buttons (Start, Help).
 * - Precompiler-safe: only state bindings.
 * - Explicit sizes and alpha=1 for all roots/containers.
 * - Start navigates to /quiz, Help shows tooltip.
 */
// PUBLIC_INTERFACE
export default Blits.Component({
  template: `
    <Element w="100%" h="100%" color="{bg}" alpha="1">
      <!-- Center container with subtle surface card for contrast -->
      <Element x="{centerX}" y="{centerY}" w="{centerW}" h="{centerH}" color="{cardBg}" radius="{cardRadius}" alpha="1">
        <Text content="{title}" x="{titleX}" y="{titleY}" color="{titleColor}" fontSize="{titleSize}" />
        <Text content="{subtitle}" x="{subX}" y="{subY}" color="{subColor}" fontSize="{subSize}" />

        <!-- Buttons row -->
        <Element x="{rowX}" y="{rowY}" w="{rowW}" h="{rowH}" alpha="1">
          <Button x="{startX}" y="{btnY}" width="{btnW}" height="{btnH}" label="{startLabel}" />
          <Button x="{helpX}"  y="{btnY}" width="{btnW}" height="{btnH}" label="{helpLabel}" />
        </Element>

        <!-- Help tooltip -->
        <Element x="{tipX}" y="{tipY}" w="{tipW}" h="{tipH}" color="{tipBg}" alpha="{tipAlpha}" radius="{tipRadius}">
          <Text content="{tipText}" x="{tipTx}" y="{tipTy}" color="{tipFg}" fontSize="{tipSize}" />
        </Element>
      </Element>
    </Element>
  `,

  state() {
    return {
      // screen background
      bg: theme.background,

      // center container (explicit dimension; centered for 1280x720)
      centerW: 900,
      centerH: 420,
      centerX: 190,
      centerY: 150,
      cardBg: '#ffffff',
      cardRadius: 16,

      // title/subtitle
      title: 'Simple Quiz',
      subtitle: 'A quick set of questions to test your knowledge.',
      titleX: 32,
      titleY: 28,
      titleSize: 56,
      titleColor: theme.text,
      subX: 32,
      subY: 100,
      subSize: 26,
      subColor: '#374151',

      // buttons row
      rowX: 32,
      rowY: 170,
      rowW: 836,
      rowH: 120,
      btnW: 260,
      btnH: 64,
      btnY: 16,
      startX: 140,
      helpX: 440,
      startLabel: 'Start Quiz',
      helpLabel: 'Help',

      // tooltip
      tipX: 32,
      tipY: 300,
      tipW: 836,
      tipH: 80,
      tipBg: '#eef2ff',
      tipFg: '#1f2937',
      tipAlpha: 0,
      tipRadius: 12,
      tipText: 'Press Start to begin. Use arrow keys and Enter to navigate/select.',
      tipTx: 20,
      tipTy: 22,
      tipSize: 22,
    }
  },

  components() {
    return { Button }
  },

  onReady() {
    // children: [card]
    const card = this.$childAt(0)
    if (!card) return

    // card children: [title, subtitle, row, tooltip]
    const row = card.childAt && card.childAt(2)
    const tooltip = card.childAt && card.childAt(3)

    // row children: [startBtn, helpBtn]
    const startBtn = row && row.childAt ? row.childAt(0) : null
    const helpBtn = row && row.childAt ? row.childAt(1) : null

    if (startBtn && startBtn.props) {
      startBtn.props.onPress = () => {
        const r = Blits.Router && Blits.Router.getRouter ? Blits.Router.getRouter() : null
        if (r && r.navigate) {
          r.navigate('/quiz')
        }
      }
    }

    if (helpBtn && helpBtn.props) {
      helpBtn.props.onPress = () => {
        // If there is a /help route, navigate, otherwise show tooltip
        const r = Blits.Router && Blits.Router.getRouter ? Blits.Router.getRouter() : null
        let didRoute = false
        if (r && r.navigate && r.has && r.has('/help')) {
          r.navigate('/help')
          didRoute = true
        }
        if (!didRoute && tooltip) {
          // show tooltip briefly
          this.$state.tipAlpha = 1
          setTimeout(() => {
            this.$state.tipAlpha = 0
          }, 2000)
        }
      }
    }
  },
})
