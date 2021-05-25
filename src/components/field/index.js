import TextField from './Text/text.vue'
import NumericField from './Numeric/numeric.vue'
import DateField from './Date/date.vue'
import DatePicker from './DatePicker/datepicker.vue'
import FileField from './File/file.vue'

export default [
  { name: 'text-field', el: TextField },
  { name: 'numeric-field', el: NumericField },
  { name: 'date-field', el: DateField },
  { name: 'file-field', el: FileField },
  { name: 'date-picker-field', el: DatePicker }
]