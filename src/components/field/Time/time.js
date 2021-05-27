import FieldMixin from '../../mixins/js/field_mixin'
import CalendarMixin from '../../mixins/js/calendar_mixin'

export default {
  name: 'time-field',
  mixins: [FieldMixin, CalendarMixin],
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
      controller: {
        picker: false,
        component: 'time-picker-field'
      },
      protected: {
        value: {}
      }
    }
  },
  methods: {

    calendarClick(event) {
      this.controller.picker = !this.controller.picker
    },

    set() {
      let value = this.dateStringToObject(this.value ? new Date(this.value): new Date())
      this.protected.value = value.time
    },

    get() {
      return this.getFormat({
        lang: this.$app.$lang(),
        format: 'utc',
      }, this.protected.value)
    },

    pickerListen(args = { type: String, value: {} }) {
      let {
        type = 'cancel',
        value = null
      } = args

      if (type === 'cancel') {}
      else if (type === 'submit') {
        this.protected.value = value
      }
      return this.calendarClick(null)
    }
  },
  computed: {
    timeView: {
      get() {
        return this.getFormat({
          lang: this.$app.$lang(),
          format: 'time',
          rule: {  }
        }, this.protected.value)

      }
    }
  }
}