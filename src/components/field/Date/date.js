import FieldMixin from '../../mixins/js/field_mixin'

export default {
  name: 'text-field',
  mixins: [FieldMixin],
  props: {
    value: {
      type: String,
      default: ''
    },
    shared: {
      type: [Object, null],
      default: () => { return {} }
    }
  },
  data() {
    return { 
      input: {
        el: null,
        value: {
          day: 0,
          month: 0,
          year: 0
        },
        visible: false
      },
    }
  },
  methods: {

    set() {
      // this.input.value = this.value || ''
    },

    get() {
      // return this.input.value
    }
  },
  computed: {
    type() {
      return (this.input.rule.type.length > 1) ? this.input.rule.type[1] : this.input.rule.type[0]
    },
    password() {
      return this.input.rule.type[0] === 'password'
    }
  }
}