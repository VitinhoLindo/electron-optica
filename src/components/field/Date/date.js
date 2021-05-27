import FieldMixin from '../../mixins/js/field_mixin'
import CalendarMixin from '../../mixins/js/calendar_mixin'

export default {
  name: 'text-field',
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
      protected: {
        value: {
          day: 0,
          month: 0,
          year: 0
        }
      },
      controller: {
        picker: false,
        component: 'date-picker-field'
      }
    }
  },
  methods: {

    calendarClick(event) {
      this.controller.picker = !this.controller.picker
    },
    
    set() {
      let value = this.dateStringToObject(this.value)
      this.protected.value = value.date
    },

    get() {
      return this.getFormat({
        lang: this.$app.$lang(),
        format: 'utc'
      }, this.protected.value)
    },
    
    pickerListen(args = { type: String, value: Date }) {
      let {
        type,
        value
      } = args

      if (type === 'cancel') { } 
      else if (type === 'submit') {
        this.protected.value = value
      }
      this.calendarClick(null)
    }
  },
  computed: {
    dateView: {
      get() {
        return this.getFormat({
          lang: this.$app.$lang(),
          format: 'date'
        }, this.protected.value)
      }
    }
  }
}