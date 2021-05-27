import BaseMixin from '../../mixins/js/base'
import CalendarMixin from '../../mixins/js/calendar_mixin'

export default {
  mixins: [BaseMixin,CalendarMixin],
  data() {
    return {
      field: {
        show: false,
        labels: {
          hour: 'Hora',
          minute: 'Minuto',
          second: 'Segundo'
        },
        values: {
          hours: {
            index: 0,
            number: 0,
            value: ['', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, '']
          },
          minutes: {
            index: 0,
            number: 0,
            value: ['', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, '']
          },
          seconds: {
            index: 0,
            number: 0,
            value: ['', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, '']
          }
        }
      }
    }
  },
  methods: {

    getIndex(array = [], value) {
      return array.indexOf(value)
    },

    build() {
      let values = document.getElementsByClassName('value selected')
      let { hours, minutes, seconds } = this.field.values,
          scrollHeigth = 30,
          offSetScroll = {
            hourIndex : hours.index * scrollHeigth,
            minuteIndex: minutes.index * scrollHeigth,
            secondIndex: seconds.index * scrollHeigth
          },
          elements = []

      for(let value of values) elements.push(value)
      for(let index in elements) {
        let element  = elements[index]

        switch (parseInt(index)) {
          // hour
          case 0:
            element.parentElement.scrollTo(0, offSetScroll.hourIndex == 0 ? offSetScroll.hourIndex: offSetScroll.hourIndex - 15)
            break;
          // minute
          case 1:
            element.parentElement.scrollTo(0, offSetScroll.minuteIndex == 0 ? offSetScroll.minuteIndex: offSetScroll.minuteIndex - 15)
            break;
          // second
          case 2:
            element.parentElement.scrollTo(0, offSetScroll.secondIndex == 0 ? offSetScroll.secondIndex: offSetScroll.secondIndex - 15)
            break;
        }
      }
    },

    getScroll(element = new HTMLElement()) {
      let scroll = null
      for(let node of element.childNodes)
        if (node.className === 'scroll') scroll = node
      return scroll
    },

    scrollTo(event, direction, attr) {
      let parent = (['arrow-down b5', 'arrow-up b5'].indexOf(event.target.className) >= 0) ? event.target.parentElement.parentElement: event.target.parentElement,
          scroll = this.getScroll(parent),
          position = scroll.scrollTop,
          toPosition = 0;

          switch (direction) {
        case 'down':
          toPosition = position + 30
          if (attr == 'hour' && toPosition > 705) return
          if (['minute', 'second'].indexOf(attr) >= 0 && toPosition > 1785) return
          return scroll.scrollTo(position, toPosition)
        default:
          toPosition = position - 30
          if (toPosition < 15) return
          return scroll.scrollTo(position, toPosition)
      }
    },

    setAttr(attr, data) {
      if (typeof data !== 'number') return
      this[attr] = this.getIndex(this.getArray(attr), data)
    },

    set() {
      let value = new Date(this.value ? new Date(this.value): new Date())
      let { hour, minute, second } = {
        hour: this.getIndex(this.field.values.hours.value, value.getUTCHours()),
        minute: this.getIndex(this.field.values.minutes.value, value.getUTCMinutes()),
        second: this.getIndex(this.field.values.seconds.value, value.getUTCSeconds())
      }

      if (hour >= 0)
        this.hour = hour
      if (minute >= 0)
        this.minute = minute
      if (second >= 0)
        this.second = second

      this.on = true
    },

    get() {
      return this.getFormat({
        lang: this.$app.$lang(),
        format: 'utc',
        rule: {  }
      }, { hour: this.hour, minute: this.minute, second: this.second })
    },

    cancel(event) {
      let id = event.target.id

      if (['time-picker-cancel', 'time-picker-body'].indexOf(id) >= 0 && this.on) {
        this.on = false

        return this.$emit('listen', { 
          type: 'cancel',
          value: this.value ? new Date(this.value): null
        })
      }
    },

    submit(event) {
      this.$emit('listen', {
        type: 'submit',
        value: { hour: this.hour, minute: this.minute, second: this.second }
      });
    },

    getClass(attr, data) {
      let _class = ['value']

      if (typeof data !== 'number') return _class
      _class.push('number')
      if (this[attr] === data)
        _class.push('selected')

      return _class
    },

    getArray(type) {
      switch (type) {
        case 'hour':
          return this.field.values.hours.value
        case 'minute':
          return this.field.values.minutes.value
        case 'second':
          return this.field.values.seconds.value
      }
    }
  },
  computed: {
    on: {
      get() {
        return this.field.show
      },
      set(value) {
        this.field.show = value
      }
    },
    hour: {
      get() {
        return this.field.values.hours.number
      },
      set(index) {
        this.field.values.hours.index = index
        this.field.values.hours.number = this.field.values.hours.value[index]
      }
    },
    minute: {
      get() {
        return this.field.values.minutes.number
      },
      set(index) {
        this.field.values.minutes.index = index
        this.field.values.minutes.number = this.field.values.minutes.value[index]
      }
    },
    second: {
      get() {
        return this.field.values.seconds.number
      },
      set(index) {
        this.field.values.seconds.index = index
        this.field.values.seconds.number = this.field.values.seconds.value[index]
      }
    },
    timeView() {
      return this.getFormat({
        lang: this.$app.$lang(),
        format: 'time',
        rule: {  }
      }, { hour: this.hour, minute: this.minute, second: this.second })
    }
  }
}