/**
  localeMatcher?: "best fit" | "lookup";
  weekday?: "long" | "short" | "narrow";
  era?: "long" | "short" | "narrow";
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  timeZoneName?: "long" | "short";
  formatMatcher?: "best fit" | "basic";
  hour12?: boolean;
  timeZone?: string;
*/

export default {
  props: {
    label: {
      type: String,
      default: 'Select Date'
    },
    value: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      labels: {
        button: {
          cancel: 'Cancel',
          confirm: 'Ok'
        }
      },
      controller: {
        type: 'day',
        years: {
          range: 24,
          index: 0,
          value: []
        }
      }
    }
  },
  methods: {
    setSumAndSub(modify = 'lower', date = new Date(), setAndGet = [], value = 0) {
      let [ set, get ] = setAndGet

      if (!set || !get || !date[set] || !date[get]) return date
      switch (modify) {
        case 'lower': date[set](date[get]() - value); break;
        case 'upper': date[set](date[get]() + value); break;
        default:
          break;
      }

      return date
    },

    createDateUsingUTC(...args) {
      let date = new Date()
      let [
        year = date.getUTCFullYear(), 
        month = date.getUTCMonth() + 1, 
        day = date.getUTCDate(), 
        hour = date.getHours(), 
        minute = date.getMinutes(), 
        second = date.getSeconds()
      ] = args

      return new Date(Date.UTC(year, month - 1, day, hour, minute, second))
    },

    getFormat(rules, dateTimeObject) {
      let {
        // pt-br, en-us
        lang = 'pt-br',
        // date, time, date-time, utc
        format = 'date',
        rule = {}
      } = rules || {},
      {
        modify = 'lower',
        year = 0,
        month = 0,
        day = 0
      } = rule

      if (
        !dateTimeObject.year && 
        !dateTimeObject.month && 
        !dateTimeObject.day && 
        !dateTimeObject.hour && 
        !dateTimeObject.minute &&
        !dateTimeObject.second
      ) dateTimeObject = this.currentDateObject()
      let date = this.createDateUsingUTC(
        dateTimeObject.year, 
        dateTimeObject.month, 
        dateTimeObject.day, 
        dateTimeObject.hour,
        dateTimeObject.minute,
        dateTimeObject.second
      )

      date = this.setSumAndSub(modify, date, ['setFullYear', 'getFullYear'], year)
      date = this.setSumAndSub(modify, date, ['setMonth', 'getMonth'], month)
      date = this.setSumAndSub(modify, date, ['setDate', 'getDate'], day)

      lang = (
        typeof lang == 'string' && 
        ['en-us', 'pt-br'].indexOf(lang.toLowerCase()) >= 0
      ) ? lang.toLowerCase() : 'pt-br'
    
      switch (format) {
        case 'time': return date.toLocaleTimeString(lang, { timeZone: 'UTC' })
        case 'date': return date.toLocaleDateString(lang, { timeZone: 'UTC' })
        case 'utc':
        default:     return date.toJSON()
      }
    },

    dateStringToObject(date = new Date()) {
      switch (typeof date) {
        case 'object':
          if (!(date instanceof Date)) date = new Date()
          break;
        case 'string':
          if (/[0-9]{4}\-[0-9]{2}\-[0-9]{2}[T][0-9]{2}\:[0-9]{2}\:[0-9]{2}/g.test(date)) {
            date = new Date(date); break;
          }
        default:
          date = new Date(); break;
      }

      let [ day, month, year, hour, minute, second ] = date.toLocaleString('pt-br').split(' ').map(function (value) {
        return value.split(/\/|\-|\:/g).map(function (_value_) { return parseInt(_value_); })
      }).flat(Infinity)

      return {
        date: { year, month, day },
        time: { hour,  minute, second }
      }
    },

    /**
     * @end
     */

    generateYearsArray(initial, final) {
      let years = []
      for(let x = initial; x <= final; x++) years.push(x)
      return years
    },

    generateMonthArray(date = new Date(), lang = 'pt-br') {
      let months = [
        { value: 1,  view: 'Jan' },
        { value: 2,  view: 'Feb' },
        { value: 3,  view: 'Mar' },
        { value: 4,  view: 'Apr' },
        { value: 5,  view: 'May' },
        { value: 6,  view: 'Jun' },
        { value: 7,  view: 'Jul' },
        { value: 8,  view: 'Aug' },
        { value: 9,  view: 'Sep' },
        { value: 10,  view: 'Oct' },
        { value: 11, view: 'Nov' },
        { value: 12, view: 'Dec' }
      ]

      for(let index in months) {
        let { value, view } = months[index]

        months[index] = {
          value, 
          view: this.getGMTLang(view, lang)
        }
      }

      return months
    },

    generateDaysArray(opt = { year: Number, month: Number, day: Number }) {
      var date = new Date(opt.year, opt.month - 1, 1);
      var days = [];
  
      while (date.getMonth() == opt.month - 1) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
  
      return days;
    },

    getDayOfGmtDay(object) {
      let keys = Object.keys(object)

      for(let index in keys) {
        let key = keys[index]

      }
    },

    getCalendar(days = [new Thursday()]) {
      let calendar = {
        // sunday domingo
        Sun: {
          view: 'S',
          values: []
        },
        // monday segunda
        Mon: {
          view: 'M',
          values: []
        },
        // tuesday terça
        Tue: {
          view: 'T',
          values: []
        },
        // wednesday quarta
        Wed: {
          view: 'W',
          values: []
        },
        // Thursday quinta
        Thu: {
          view: 'T',
          values: []
        },
        // Friday sexta
        Fri: {
          view: 'F',
          values: []
        },
        // Saturday domingo
        Sat: {
          view: 'S',
          values: []
        }
      }

      for(let day of days) {
        let { M } = this.getGMTObject(day)
        
        calendar[M].values.push(day.getDate())
      }
      calendar = this.getDiference(calendar, days)

      return calendar
    },

    getDiference(calendar, days) {
      let [initial, final] = this.getStartAndFinal(days),
          { M } = this.getGMTObject(initial),
          keys = []

      if (M == 'Mon') keys.push('Sun')
      if (M == 'Tue') keys.push('Mon', 'Sun')
      if (M == 'Wed') keys.push('Tue', 'Mon', 'Sun')
      if (M == 'Thu') keys.push('Wed', 'Tue', 'Mon', 'Sun')
      if (M == 'Fri') keys.push('Thu', 'Wed', 'Tue', 'Mon', 'Sun')
      if (M == 'Sat') keys.push('Fri', 'Thu', 'Wed', 'Tue', 'Mon', 'Sun')
      if (M == 'Sun') keys.push('Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon', 'Sun')

      for(let key of keys) {
        calendar[key].values.unshift('')
      }

      return calendar
    },

    getGMTLang(view, lang) {
      switch (view) {
        case 'Jan': return (lang == 'pt-br') ? 'Jan': view;
        case 'Feb': return (lang == 'pt-br') ? 'Fev': view;
        case 'Mar': return (lang == 'pt-br') ? 'Mar': view;
        case 'Apr': return (lang == 'pt-br') ? 'Abr': view;
        case 'May': return (lang == 'pt-br') ? 'Mai': view;
        case 'Jun': return (lang == 'pt-br') ? 'Jun': view;
        case 'Jul': return (lang == 'pt-br') ? 'Jul': view;
        case 'Aug': return (lang == 'pt-br') ? 'Ago': view;
        case 'Sep': return (lang == 'pt-br') ? 'Set': view;
        case 'Oct': return (lang == 'pt-br') ? 'Out': view
        case 'Nov': return (lang == 'pt-br') ? 'Nov': view;
        case 'Dec': return (lang == 'pt-br') ? 'Dez': view;
        default:    return ''
      }
    },

    splitArrayValues(array = [], length) {
      let count = 0,
          subArray = []

      while(count < array.length) {
        if ((count + length) < array.length)
          subArray.push(array.slice(count, count + length))
        else
          subArray.push(array.slice(count))

        count += length
      }

      return subArray      
    },

    searchValueInArray(array = [], _value_, length) {
      let arg = { index: -1 },
          _array_ = array.flat(Infinity)
      
      for(let index in _array_) {
        if (_value_ === _array_[index]) {
          arg.index = index
          break
        }
      }

      if (length === undefined) return arg.index
      else if (arg.index < length) return 0
      else return Math.floor(parseInt(arg.index) / length)
    },

    getStartAndFinal(array = []) {
      let start  = array[0],
          length = array.length,
          final  = array[length - 1]
      
      return [start, final]
    },

    currentDateObject(date = new Date()) {
      return {
        year: date.getFullYear(),
        month: ((date.getMonth()) + 1),
        day: date.getDate()
      }
    },

    currentTimeObject(date = new Date()) {
      return {
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
      }
    },

    arrayTimeFormat(...args) {
      return args.map(function (value) { return `000${value}`.slice(-2) } )
    },

    inputDate() {
      return this.getFormat({
        lang: this.$app.$lang(),
        format: 'utc',
        rule: {  }
      }, { year: this.input.year, month: this.input.month, day: this.input.day })
    },

    inputTime() {
      return this.getFormat({
        lang: this.$app.$lang(),
        format: 'utc',
        rule: {  }
      }, { year: this.input.year, month: this.input.month, day: this.input.day, hour: this.input.hour, minute: this.input.minute, second: this.input.second })
    },

    getGMTObject(date = new Date()) {
      let [M, D, MM, YY, H, GMT] = date.toUTCString().replace(',', '').split(' ')

      return {
        M, D, MM, YY, H
      }
    },

    yearClass(value) {
      let _class = []
      if (value == this.year) _class.push('current')
      return _class
    },

    monthClass(value) {
      let _class = []
      if (value == this.month) _class.push('current')
      return _class
    },

    dayClass(day) {
      let _class = ['value']

      if (day) {
        _class.push('exists')
      } else {
        return _class
      }

      if (day == this.day) {
        _class.push('current')
      } 

      return _class
    },

    changeYear(mode) {
      let array  = this.yearArray,
          length = array.length
      
      switch (mode) {
        case 'next':
          let argNext = this.getStartAndFinal(array[length - 1])
          let yN = this.year + 1

          if (yN > argNext[1]) return
          this.year = yN
          break;
        case 'previous':
          let argPrev = this.getStartAndFinal(array[0])
          let yP = this.year - 1

          if (argPrev[0] > yP) return
          this.year = yP
          break;
      }
    },

    changeIndex(event, mode) {
      if (this.controllerType == 'year') {
        switch (mode) {
          case 'next':     this.yearIndex = this.yearIndex + 1; break;
          case 'previous': this.yearIndex = this.yearIndex - 1; break;
        }
        return
      } else if (this.controllerType == 'month') {
        this.changeYear(mode)
        return
      } else if (this.controllerType == 'day') {
        let month = 0

        switch (mode) {
          case 'next':     month = this.month + 1; break;
          case 'previous': month = this.month - 1; break;
          default:         return;
        }

        if (month === 0) {
          this.changeYear(mode)
          this.month = 12
        } else if (month === 13) {
          this.changeYear(mode)
          this.month = 1
        } else {
          this.month = month
        }
        return
      }
    },

    changeType(event) {
      switch (this.controllerType) {
        case 'day':   this.controllerType = 'year' ; break;
        case 'year':  this.controllerType = 'month'; break;
        case 'month': this.controllerType = 'day'  ; break;
        default:      this.controllerType = 'year' ; break;
      }
    },

    setYear(event, value) {
      this.year = value
      this.changeType(event)
    },

    setMonth(event, object = { value: Number, view: String }) {
      this.month = object.value
      this.changeType(event)
    },

    setDay(event, value) {
      if (typeof value !== 'number') {
        return;
      }
      
      this.day = value
      if (typeof this.submit === 'function')
        this.submit(event)
    }
  },
  computed: {
    controllerType: {
      get() {
        return this.controller.type
      },
      set(type) {
        this.controller.type = type
      }
    },

    year: {
      get() {
        return this.input.year
      },
      set(value) {
        this.input.year = value
      }
    },

    month: {
      get() {
        return this.input.month
      },
      set(value) {
        this.input.month = value
      }
    },

    day: {
      get() {
        return this.input.day
      },
      set(value) {
        this.input.day = value
      }
    },

    yearIndex: {
      get() {
        return this.controller.years.index
      },
      set(index) {
        if ((this.yearIndex == 0 && index < 0) && (index >= this.yearArray.length)) return;
        this.controller.years.index = index
      }
    },

    yearArray() {
      return this.controller.years.value
    },

    currentYearArray() {
      return this.yearArray[this.yearIndex]
    },

    currentMonthArray() {
      return this.generateMonthArray(
        this.get()
      )
    },

    getDaysGMT() {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },

    currentDayArray() {
      return this.getCalendar(
        this.generateDaysArray(
          this.input
        )
      )
    },

    yearFirstAndLast() {
      let args = this.getStartAndFinal(
        this.yearArray[this.yearIndex]
      )
      
      return args.join(' - ')
    },

    controllerInputType() {
      switch (this.controllerType) {
        case 'year':
          return this.yearFirstAndLast
        case 'month':
          return this.year
        case 'day':
          let { MM, YY } = this.getGMTObject(
            new Date(this.get())
          )
          return `${this.getGMTLang(MM, 'pt-br')} ${YY}`
      }
    },

    getGMTFormatString() {
      let values = this.get()
      let {M, MM, YY} = this.getGMTObject(new Date(values))

      return `${M}, ${MM} ${YY}`
    }
  }
}
