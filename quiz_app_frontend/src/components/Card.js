import Blits from '@lightningjs/blits'
import { OceanTheme as T } from '../theme.js'

export default Blits.Component('Card', {
  template: `
    <Element
      :w="$w"
      :h="$h"
      :x="$x"
      :y="$y"
      :effects="[$shader('radius', {radius: ${T.radius.lg}}), $shader('shadow', {x:0, y:6, blur:24, spread:0, color:'#00000026'})]"
      color="${T.colors.surface}"
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
    }
  },
})
