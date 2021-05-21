export default {
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
  },
  created() {
    if (typeof this.get === 'function')  this.getter(this.get)
    if (typeof this.load === 'function') this.load()
    if (typeof this.set === 'function')  this.set()
  },
  mounted() {
    if (typeof this.build === 'function') this.build()
  }
}