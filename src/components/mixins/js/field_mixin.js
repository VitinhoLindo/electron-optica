import Base from './base'

export default Object.assign({
  mixins: [],
  props: {
    mode: {
      type: String,
      default: 'view'
    },
    label: {
      type: String,
      required: true,
    },
    getter: {
      type: Function,
      required: true
    }
  }
}, Base)