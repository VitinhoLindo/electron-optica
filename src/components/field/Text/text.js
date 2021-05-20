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
      type: Object,
      default: {}
    }
  },
  data() {
    return { 
      _value_: '',
      _type_: 'text'
    }
  },
  methods: {
    // 
    load() {
      let types = ['text', 'tel', 'email', 'password']
      let { type } = this.shared

      this._type_ = (types.indexOf(type) < 0) ? 'text': type
    },
    get() {
      
    }
  }
}