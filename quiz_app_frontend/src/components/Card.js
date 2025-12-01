import Blits from '@lightningjs/blits'

export default Blits.Component('Card', {
  template: `
    <Element
      :w="$w"
      :h="$h"
      :x="$x"
      :y="$y"
      :effects="$effects"
      color="#ffffff"
    >
      <Element :x="0" :y="0">
        <slot />
      </Element>
    </Element>
  `,
  state() {
    return {
      w: 1200,
      h: 680,
      x: (1920 - 1200) / 2,
      y: (1080 - 680) / 2,
      effects: [],
    }
  },
  hooks: {
    ready() {
      // Create effects in code, not inline in template, to avoid precompiler issues
      const r = this.$shader('radius', { radius: 16 })
      const s = this.$shader('shadow', { x: 0, y: 6, blur: 24, spread: 0, color: '#00000026' })
      this.effects = [r, s]
    },
  },
})
