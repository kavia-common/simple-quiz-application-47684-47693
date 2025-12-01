import Blits from '@lightningjs/blits'

export default Blits.Component('Button', {
  template: `
      <Element>
          <Text :content="$label"></Text>
      </Element>
    `,
  state() {
    return {
      isFavorited: false,
      favoriteText: 'Press Enter',
      unfavoriteText: 'Press Enter Again',
    }
  },
  computed: {
    label() {
      return this.isFavorited ? this.unfavoriteText : this.favoriteText
    },
  },
  input: {
    enter() {
      this.isFavorited = !this.isFavorited
    },
  },
})
