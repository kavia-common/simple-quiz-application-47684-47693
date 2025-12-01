import Blits from '@lightningjs/blits'
import Button from '../components/Button.js'
import theme from '../theme.js'

/**
 * Intro Page: Centered title, subtitle, and two buttons (Start, Help).
 * - Precompiler-safe: only state bindings, no inline objects or ternaries.
 * - Explicit sizes and alpha=1 for all roots/containers.
 * - Start navigates to /quiz, Help shows a simple tooltip (or could route to /help).
 */
// PUBLIC_INTERFACE
export default Blits.Component({
  template: `
    <Element w="100%" h="100%" color="{bg}" alpha="1">
      <!-- Center container -->
      <Element x="{centerX}" y="{centerY}" w="{centerW}" h="{centerH}" alpha="1">
        <Text content="{title}" x="{titleX}" y="{titleY}" color="{titleColor}" fontSize="{titleSize}" />
        <Text content="{subtitle}" x="{subX}" y="{subY}" color="{subColor}" fontSize="{subSize}" />

        <!-- Buttons row -->
        <Element x="{rowX}" y="{rowY}" w="{rowW}" h="{rowH}" alpha="1">
          <Button x="{startX}" y="{btnY}" width="{btnW}" height="{btnH}" label="{startLabel}" />
          <Button x="{helpX}" y="{btnY}" width="{btnW}" height="{btnH}" label="{helpLabel}" />
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

      // center container (explicit dimension; roughly centered for 1280x720)
      centerW: 900,
      centerH: 420,
      centerX: 190,
      centerY: 150,

      // title/subtitle
      title: 'Simple Quiz',
      subtitle: 'A quick set of questions to test your knowledge.',
      titleX: 0,
      titleY: 0,
      titleSize: 56,
      titleColor: theme.text,
      subX: 0,
      subY: 80,
      subSize: 26,
      subColor: theme.text,

      // buttons row
      rowX: 0,
      rowY: 160,
      rowW: 900,
      rowH: 120,
      btnW: 260,
      btnH: 64,
      btnY: 16,
      startX: 180,
      helpX: 460,
      startLabel: 'Start Quiz',
      helpLabel: 'Help',

      // tooltip
      tipX: 0,
      tipY: 300,
      tipW: 880,
      tipH: 80,
      tipBg: theme.surface,
      tipFg: theme.text,
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
    // children: [center]
    const center = this.$childAt(0)
    if (!center) return

    // center children: [title, subtitle, row, tooltip]
    const row = center.childAt && center.childAt(2)
    const tooltip = center.childAt && center.childAt(3)

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
