import TextField from './Text/text.vue'
import NumericField from './Numeric/numeric.vue'
import DateField from './Date/date.vue'
import DatePicker from './DatePicker/datepicker.vue'
import FileField from './File/file.vue'
import TimeField from './Time/time.vue'
import TimePicker from './TimePicker/timepicker.vue'

export default [
  { name: 'text-field', el: TextField },
  { name: 'numeric-field', el: NumericField },
  { name: 'file-field', el: FileField },
  { name: 'date-field', el: DateField },
  { name: 'date-picker-field', el: DatePicker },
  { name: 'time-field', el: TimeField },
  { name: 'time-picker-field', el: TimePicker }
]