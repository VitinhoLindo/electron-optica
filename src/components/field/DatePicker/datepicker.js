import BaseMixin from '../../mixins/js/base'
import CalendarMixin from '../../mixins/js/calendar_mixin'

export default {
  name: 'date-picker-field',
  mixins: [BaseMixin,CalendarMixin],
  data() {
    return {
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
    }
  },
}