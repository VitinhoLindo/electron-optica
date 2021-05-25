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
      protected: {
        value: {
          day: 0,
          month: 0,
          year: 0
        }
      },
      controller: {
        picker: false,
      }
    }
  },
  methods: {
    calendarClick(event) {
      this.controller.picker = !this.controller.picker
    },

    currentDateString(date = new Date()) {
      return {
        day: date.getDate(),
        month: (date.getMonth() + 1),
        year: date.getFullYear()
      }
    },

    getFormat(format, args = {}) {
      let { 
        separator = '/', 
        rule
      } = args,
      {
        modify,
        day,
        month,
        year
      }  = rule || {}

      let array = [
        this.protected.value.day,
        this.protected.value.month,
        this.protected.value.year
      ]

      if (modify) {
        switch (modify) {
          case 'lower':
            if (day)   { array[0] = array[0] - (parseInt(day) || 0) }
            if (month) { array[1] = array[1] - (parseInt(month) || 0) }
            if (year)  { array[2] = array[2] - (parseInt(year) || 0) }
            break;
          case 'upper':
            if (day)   { array[0] = array[0] + (parseInt(day) || 0) }
            if (month) { array[1] = array[1] + (parseInt(month) || 0) }
            if (year)  { array[2] = array[2] + (parseInt(year) || 0) }
            break;
        }
      }

      for(let index in array)
        if (index == 2) {
          array[index] = `000${array[index]}`.slice(-4)
        } else {
          array[index] = `000${array[index]}`.slice(-2)
        }


      switch (format) {
        case 'pt-br':
          return array.join(separator)
        case 'en':
        default:
          return array.reverse().join(separator)
      }
    },

    pickDate(value) {
      if (typeof value !== 'string') {
        this.protected.value = this.currentDateString()
        return
      }

      let [year, month, day] = value.split(/\/|\-/g)

      this.protected.value = {
        year: parseInt(year),
        month: parseInt(month) + 1,
        day: parseInt(day)
      }
    },
    
    set() {
      if (this.value == null)
        this.protected.value = this.currentDateString()
      else 
        this.pickDate(this.value)
    },

    get() {
      return new Date(
        this.getFormat('en', { 
          separator: '-', 
          rule: {
            modify: 'lower',
            month: 1
          } 
        })
      )
    },

    pickerListen(args = { type: String, value: Date }) {
      this.protected.value = args.value
      this.calendarClick(null)
    }
  }
}