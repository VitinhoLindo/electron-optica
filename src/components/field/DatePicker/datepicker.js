import BaseMixin from '../../mixins/js/base'
import CalendarMixin from '../../mixins/js/calendar_mixin'

export default {
  name: 'date-picker-field',
  mixins: [BaseMixin,CalendarMixin],
  data() {
    return {
      show: false,
      input: {
        year: 0,
        month: 0,
        day: 0
      }
    }
  },
  methods: {
    load() {
      let years = this.generateYearsArray(0, this.controller.years.range * 140)

      this.controller.years.value = this.splitArrayValues(years, this.controller.years.range).filter((value) => {
        return value.length == this.controller.years.range
      })
      this.on = true
    },

    set() {
      let value = this.dateStringToObject(this.value ? new Date(this.value) : new Date())
      this.input = value.date
      this.controller.years.index = this.searchValueInArray(this.controller.years.value, this.input.year, this.controller.years.range)
    },

    get() {
      return this.inputDate()
    },

    cancel(event = new MouseEvent()) {
      let id = event.target.id

      if (['date-picker-cancel', 'date-picker-body'].indexOf(id) >= 0 && this.on) {
        this.on = false
        return this.$emit('listen', { 
          type: 'cancel',
          value: new Date(this.get())
        })
      }
    },

    submit(event) {
      this.$emit('listen', { 
        type: 'submit',
        value: new Date(this.get())
      })
    }
  },
  computed: {
    on: {
      get() {
        return this.controller.show
      },
      set(value) {
        this.controller.show = value
      }
    }
  }
}