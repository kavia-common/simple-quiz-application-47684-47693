import Blits from '@lightningjs/blits'
import Button from '../components/Button.js'
import theme from '../theme.js'

// PUBLIC_INTERFACE
/**
 * Intro Page: centered title/subtitle with Start and Help buttons.
 * Buttons respond to click and Enter to navigate or show a tip.
 */
export default Blits.Component({
  template: `
    <Element w="1280" h="720" color="{bg}" alpha="1" focusable="false">
      <Element x="{panelX}" y="{panelY}" w="{panelW}" h="{panelH}" color="{panelBg}" radius="{panelRadius}" alpha="1" focusable="false">
        <Text content="{title}" x="{titleX}" y="{titleY}" color="{titleColor}" fontSize="{titleSize}" />
        <Text content="{subtitle}" x="{subX}" y="{subY}" color="{subColor}" fontSize="{subSize}" />
        <Button ref="start" x="{startX}" y="{btnY}" width="{btnW}" height="{btnH}" label="{startLabel}" />
        <Button ref="help"  x="{helpX}"  y="{btnY}" width="{btnW}" height="{btnH}" label="{helpLabel}" />
        <Element x="{tipX}" y="{tipY}" w="{tipW}" h="{tipH}" color="{tipBg}" alpha="{tipAlpha}" radius="{tipRadius}" focusable="false">
          <Text content="{tipText}" x="{tipTx}" y="{tipTy}" color="{tipFg}" fontSize="{tipSize}" />
        </Element>
      </Element>
    </Element>
  `,
  state() {
    // Centered panel values
    return {
      bg: theme.background,
      panelW: 900,
      panelH: 360,
      panelX: 190, // (1280-900)/2
      panelY: 180, // (720-360)/2
      panelBg: '#ffffff',
      panelRadius: 16,

      title: 'Simple Quiz',
      titleX: 40,
      titleY: 40,
      titleSize: 56,
      titleColor: theme.text,

      subtitle: 'A quick set of questions to test your knowledge.',
      subX: 40,
      subY: 110,
      subSize: 26,
      subColor: '#374151',

      btnW: 260,
      btnH: 64,
      btnY: 180,
      startX: 240,
      helpX: 520,
      startLabel: 'Start Quiz',
      helpLabel: 'Help',

      tipX: 40,
      tipY: 260,
      tipW: 820,
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
    const startBtn = this.$ref('start')
    const helpBtn = this.$ref('help')

    const goQuiz = () => {
      const r = Blits.Router && typeof Blits.Router.getRouter === 'function' ? Blits.Router.getRouter() : null
      if (r && typeof r.navigate === 'function') r.navigate('/quiz')
    }
    const showTip = () => {
      this.$state.tipAlpha = 1
      setTimeout(() => { this.$state.tipAlpha = 0 }, 1500)
    }

    if (startBtn) {
      startBtn.props.onPress = goQuiz
      startBtn.onClick = goQuiz
    }
    if (helpBtn) {
      helpBtn.props.onPress = showTip
      helpBtn.onClick = showTip
    }
  },
})
