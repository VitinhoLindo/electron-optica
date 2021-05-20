import FieldMixin from '../../mixins/js/field_mixin'

export default {
  name: 'numeric-field',
  mixins: [FieldMixin],
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return { }
  },
  methods: {
    load() { }
  }
}