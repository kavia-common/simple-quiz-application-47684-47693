import Blits from '@lightningjs/blits'
import Button from '../components/Button.js'
import theme from '../theme.js'

// PUBLIC_INTERFACE
/**
 * Intro Page: shows title, subtitle, and Start/Help buttons.
 * Template is precompiler-safe (only $state refs).
 */
export default Blits.Component({
  template: `
    <Element w="1280" h="720" color="{bg}" alpha="1" focusable="false">
      <Element x="{centerX}" y="{centerY}" w="{centerW}" h="{centerH}" color="{cardBg}" radius="{cardRadius}" alpha="1" focusable="false">
        <Text content="{title}" x="{titleX}" y="{titleY}" color="{titleColor}" fontSize="{titleSize}" />
        <Text content="{subtitle}" x="{subX}" y="{subY}" color="{subColor}" fontSize="{subSize}" />
        <Element x="{rowX}" y="{rowY}" w="{rowW}" h="{rowH}" alpha="1" focusable="false">
          <Button ref="start" x="{startX}" y="{btnY}" width="{btnW}" height="{btnH}" label="{startLabel}" />
          <Button ref="help"  x="{helpX}"  y="{btnY}" width="{btnW}" height="{btnH}" label="{helpLabel}" />
        </Element>
        <Element x="{tipX}" y="{tipY}" w="{tipW}" h="{tipH}" color="{tipBg}" alpha="{tipAlpha}" radius="{tipRadius}" focusable="false">
          <Text content="{tipText}" x="{tipTx}" y="{tipTy}" color="{tipFg}" fontSize="{tipSize}" />
        </Element>
      </Element>
    </Element>
  `,
  state() {
    const centerW = 900
    const centerH = 420
    const centerX = Math.round((1280 - centerW) / 2)
    const centerY = Math.round((720 - centerH) / 2)
    return {
      bg: theme.background,
      centerW,
      centerH,
      centerX,
      centerY,
      cardBg: '#ffffff',
      cardRadius: 16,
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
    const startBtn = this.$ref('start')
    const helpBtn = this.$ref('help')
    if (startBtn) {
      startBtn.props.onPress = () => {
        const r = Blits.Router?.getRouter?.()
        if (r?.navigate) r.navigate('/quiz')
      }
    }
    if (helpBtn) {
      helpBtn.props.onPress = () => {
        this.$state.tipAlpha = 1
        setTimeout(() => (this.$state.tipAlpha = 0), 2000)
      }
    }
  },
})
