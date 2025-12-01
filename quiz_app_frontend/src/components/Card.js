import Blits from '@lightningjs/blits'
import theme from '../theme.js'

// PUBLIC_INTERFACE
/**
 * Card: simple surface with title and body text.
 */
export default Blits.Component({
  props: {
    title: '',
    body: '',
    width: 800,
    height: 360,
  },
  template: `
    <Element w="{w}" h="{h}" color="{bg}" alpha="1" radius="{radius}">
      <Text content="{titleText}" color="{titleColor}" fontSize="{titleSize}" x="{pad}" y="{pad}" />
      <Text content="{bodyText}" color="{bodyColor}" fontSize="{bodySize}" x="{pad}" y="{bodyY}" />
    </Element>
  `,
  state() {
    return {
      w: 800,
      h: 360,
      radius: 16,
      pad: 24,
      bg: theme.surface,
      titleText: '',
      titleColor: theme.text,
      titleSize: 36,
      bodyText: '',
      bodyColor: theme.text,
      bodySize: 22,
      bodyY: 92,
    }
  },
  onInit() {
    if (this.props) {
      if (this.props.width !== undefined) this.$state.w = this.props.width
      if (this.props.height !== undefined) this.$state.h = this.props.height
      if (this.props.title) this.$state.titleText = this.props.title
      if (this.props.body) this.$state.bodyText = this.props.body
    }
  },
})
