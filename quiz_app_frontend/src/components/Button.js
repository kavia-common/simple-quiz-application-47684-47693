import Blits from '@lightningjs/blits'
import theme from '../theme.js'

// PUBLIC_INTERFACE
/**
 * Button: focusable rectangle with a text label.
 * Props are copied into state during onInit to keep template bindings simple.
 */
export default Blits.Component({
  props: {
    label: '',
    width: 300,
    height: 56,
    onPress: null,
  },
  template: `
    <Element w="{w}" h="{h}" color="{bg}" alpha="1" radius="{radius}" focusable="true">
      <Text content="{text}" color="{fg}" fontSize="{fontSize}" x="{tx}" y="{ty}" />
    </Element>
  `,
  state() {
    return {
      text: '',
      w: 300,
      h: 56,
      radius: 12,
      tx: 24,
      ty: 16,
      fontSize: 24,
      bg: theme.primary,
      fg: theme.surface,
      cb: null,
    }
  },
  onInit() {
    if (this.props) {
      if (this.props.label) this.$state.text = this.props.label
      if (this.props.width !== undefined) this.$state.w = this.props.width
      if (this.props.height !== undefined) this.$state.h = this.props.height
      if (this.props.onPress) this.$state.cb = this.props.onPress
    }
  },
  onEnter() {
    const fn = this.$state.cb
    if (fn) fn()
  },
  onClick() {
    const fn = this.$state.cb
    if (fn) fn()
  },
})
